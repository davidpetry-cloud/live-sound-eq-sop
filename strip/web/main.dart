// WZ3 strip simulator for public/strip.html. Compiled to ../public/strip.js
// (see strip/build.sh).
//
// The controls are native range inputs, a select and a switch button already
// in the page, so keyboard and screen readers work without extra code; this
// file reads the channel data, keeps the setting, and draws the curve.
// Settings live only in memory: nothing is stored or sent.
import 'dart:js_interop';
import 'dart:math' as math;

import 'package:strip/channel.dart';
import 'package:strip/eq.dart';
import 'package:strip/sweep.dart';

// ---- Browser bindings: only what the simulator uses ----------------------

@JS()
external Document get document;

@JS()
external Window get window;

@JS('fetch')
external JSPromise<FetchResponse> _fetch(String url);

@JS()
external int requestAnimationFrame(JSFunction f);

extension type Document._(JSObject _) implements JSObject {
  external Element? getElementById(String id);
  external Element get documentElement;
}

extension type Window._(JSObject _) implements JSObject {
  external Location get location;
  external History get history;
  external Storage get localStorage;
  external MediaQueryList matchMedia(String query);
  external void addEventListener(String type, JSFunction listener);
}

extension type Location._(JSObject _) implements JSObject {
  external String get hash;
  external String get pathname;
  external String get search;
}

extension type History._(JSObject _) implements JSObject {
  external void replaceState(JSAny? data, String unused, String url);
}

extension type Storage._(JSObject _) implements JSObject {
  external String? getItem(String key);
  external void setItem(String key, String value);
}

extension type MediaQueryList._(JSObject _) implements JSObject {
  external bool get matches;
  external void addEventListener(String type, JSFunction listener);
}

extension type FetchResponse._(JSObject _) implements JSObject {
  external bool get ok;
  external JSPromise<JSAny?> json();
}

extension type Element._(JSObject _) implements JSObject {
  external set hidden(bool value);
  external set textContent(String value);
  external String get textContent;
  external set innerHTML(String value);
  external int get clientWidth;
  external void setAttribute(String name, String value);
  external String? getAttribute(String name);
  external void addEventListener(String type, JSFunction listener);
  external void focus();
}

/// Inputs and selects: the value is always text.
extension type Field._(JSObject _) implements Element {
  external String get value;
  external set value(String value);
}

Element _el(String id) => document.getElementById(id)!;
Field _field(String id) => document.getElementById(id)! as Field;

String esc(String s) => s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

// ---- Start ---------------------------------------------------------------

void main() {
  Theme().wire();
  if (document.getElementById('sim-body') == null) return;
  final loader = Loader();
  loader.load();
}

/// Fetches the channel data; on failure says so in words, with a way to retry.
class Loader {
  final Element box = _el('sim-loading');
  final Element text = _el('sim-loading-text');
  final Element retry = _el('sim-retry');

  Loader() {
    retry.addEventListener('click', (() {
      retry.hidden = true;
      text.textContent = 'Loading the channels…';
      load();
    }).toJS);
  }

  Future<void> load() async {
    try {
      final res = await _fetch('api/channels.json').toDart;
      if (!res.ok) throw StateError('status');
      final data = (await res.json().toDart).dartify() as Map;
      final channels = [
        for (final c in data['channels'] as List) Channel.fromJson((c as Map).cast<String, Object?>())
      ];
      if (channels.isEmpty) throw StateError('empty');
      box.hidden = true;
      // Shown first, so the curve can measure the room it has.
      _el('sim-body').hidden = false;
      Simulator(channels, '${data['generated'] ?? ''}').wire();
    } catch (_) {
      text.textContent = 'The channel data didn’t load. Check your connection, then try again.';
      retry.hidden = false;
    }
  }
}

// ---- The simulator --------------------------------------------------------

/// Status marks, in the same shapes the channel list uses.
const _icons = {
  Status.attested:
      '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3.2L13 5"/></svg>',
  Status.proposed:
      '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.6" y="3.6" width="8.8" height="8.8" rx="1.4" transform="rotate(45 8 8)"/></svg>',
  Status.expired:
      '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="8" r="5.6"/><path d="M8 4.8V8.4M8 11h.01"/></svg>',
  Status.rejected:
      '<svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4.4 4.4l7.2 7.2M11.6 4.4l-7.2 7.2"/></svg>',
};
const _edge = {
  Status.attested: 'var(--att)',
  Status.proposed: 'var(--prop)',
  Status.expired: 'var(--exp)',
  Status.rejected: 'var(--rej)',
};

class Simulator {
  final List<Channel> channels;
  final String generated;
  final Sweep lmSweep, hmSweep;

  /// Your setting for each channel you have touched, kept while the tab is open.
  final Map<String, Strip> edits = {};
  late Channel channel;
  late Strip strip;

  final Field select = _field('sim-channel');
  final Element trust = _el('sim-trust');
  final Element plot = _el('sim-plot');
  final Element svg = _el('sim-curve');
  final Element legendStart = _el('sim-legend-start');
  final Element summary = _el('sim-summary');
  final Element changed = _el('sim-changed');
  final Element reset = _el('sim-reset');
  final Element hpf = _el('hpf');
  final Element hpfState = _el('hpf-state');
  final Field hf = _field('hf-gain'), lf = _field('lf-gain');
  final Field hmF = _field('hm-freq'), hmG = _field('hm-gain');
  final Field lmF = _field('lm-freq'), lmG = _field('lm-gain');

  Simulator(this.channels, this.generated)
      : lmSweep = Sweep(lmMinHz, lmMaxHz, extra: [for (final c in channels) c.start.lmHz]),
        hmSweep = Sweep(hmMinHz, hmMaxHz, extra: [for (final c in channels) c.start.hmHz]);

  void wire() {
    _fillSelect();
    _ticks(_el('lm-freq-ticks'), lmSweep, const [35, 45, 70, 180, 250, 400, 1000], {35, 250, 1000});
    _ticks(_el('hm-freq-ticks'), hmSweep, const [500, 700, 1000, 3000, 4000, 6000, 15000], {500, 1000, 4000, 15000});
    lmF.setAttribute('max', '${lmSweep.last}');
    hmF.setAttribute('max', '${hmSweep.last}');

    select.addEventListener('change', (() => _choose(_bySlug(select.value)!, announce: true)).toJS);
    hpf.addEventListener('click', (() => _set(strip.copyWith(hpfIn: !strip.hpfIn))).toJS);
    void onInput(Field f, Strip Function(Strip s, int v) apply) {
      f.addEventListener('input', (() => _set(apply(strip, int.tryParse(f.value) ?? 0))).toJS);
    }

    onInput(hf, (s, v) => s.copyWith(hf: v));
    onInput(hmF, (s, v) => s.copyWith(hmHz: hmSweep.at(v)));
    onInput(hmG, (s, v) => s.copyWith(hm: v));
    onInput(lmF, (s, v) => s.copyWith(lmHz: lmSweep.at(v)));
    onInput(lmG, (s, v) => s.copyWith(lm: v));
    onInput(lf, (s, v) => s.copyWith(lf: v));
    reset.addEventListener('click', (() {
      final was = strip == channel.start;
      _set(channel.start);
      changed.textContent = was ? 'Already at the starting point.' : 'Back at the starting point for ${channel.id}.';
    }).toJS);

    var pending = false;
    window.addEventListener('resize', (() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(((JSNumber _) {
        pending = false;
        _draw();
      }).toJS);
    }).toJS);

    final hash = window.location.hash.replaceFirst('#', '');
    _choose(_bySlug(hash) ?? channels.first, announce: false);
  }

  Channel? _bySlug(String slug) {
    for (final c in channels) {
      if (c.slug == slug) return c;
    }
    return null;
  }

  void _fillSelect() {
    final html = StringBuffer();
    String? group;
    for (final c in channels) {
      if (c.group != group) {
        if (group != null) html.write('</optgroup>');
        group = c.group;
        html.write('<optgroup label="${esc(group)}">');
      }
      final note = c.status.trusted ? '' : ' — ${c.status.label}';
      html.write('<option value="${esc(c.slug)}">${esc(c.id)}${esc(note)}</option>');
    }
    if (group != null) html.write('</optgroup>');
    select.innerHTML = html.toString();
  }

  /// Tick marks at the frequencies printed on the panel. The [wide] ones keep
  /// their numbers on narrow screens; the rest show only a tick there.
  void _ticks(Element row, Sweep sweep, List<double> marks, Set<double> wide) {
    row.innerHTML = [
      for (final f in marks)
        '<span class="${wide.contains(f) ? '' : 'minor'}" style="--p:${sweep.position(f).toStringAsFixed(4)}">'
            '${esc(f < 1000 ? '${f.round()}' : '${(f / 1000).round()}k')}</span>'
    ].join();
  }

  void _choose(Channel c, {required bool announce}) {
    channel = c;
    select.value = c.slug;
    final kept = edits[c.slug];
    window.history.replaceState(null, '', '${window.location.pathname}${window.location.search}#${c.slug}');
    _trustNote();
    legendStart.textContent = 'Starting point · ${c.status.label}';
    _set(kept ?? c.start, quiet: true);
    changed.textContent = !announce
        ? _countText()
        : kept != null && kept != c.start
            ? '${c.id}: your earlier changes are back. ${_countText()}'
            : '${c.id}: at the starting point.';
  }

  void _set(Strip s, {bool quiet = false}) {
    strip = s;
    edits[channel.slug] = s;
    _controls();
    _draw();
    if (!quiet) {
      final text = _countText();
      if (changed.textContent != text) changed.textContent = text;
    }
  }

  // ---- The words beside the controls ----

  void _trustNote() {
    final c = channel, a = c.attestation;
    final who = [a.by, a.role].whereType<String>().join(', ');
    final asOf = generated.length >= 10 ? ' Status as of ${generated.substring(0, 10)}.' : '';
    final String body;
    switch (c.status) {
      case Status.attested:
        body = 'Signed by ${esc(who.isEmpty ? 'a practitioner' : who)}, checked ${esc(a.verified ?? '')}. '
            'A starting point to work from; the room still decides.';
      case Status.expired:
        body = 'Signed by ${esc(who.isEmpty ? 'a practitioner' : who)} on ${esc(a.verified ?? 'an earlier date')}, '
            'but its shelf life has run out. Re-check it in a room before you work from it.';
      case Status.proposed:
        body = '${a.fromModel ? 'A model${a.model == null ? '' : ' (${esc(a.model!)})'} proposed these values.' : 'These values are proposed.'} '
            'No practitioner has checked them at a console. Treat the starting point as a guess to test at soundcheck.';
      case Status.rejected:
        final by = a.rejectedBy == null ? 'A practitioner' : esc(a.rejectedBy!);
        final when = a.reviewed == null ? '' : ' on ${esc(a.reviewed!)}';
        final why = a.rejectionReason == null ? '' : ': ${esc(a.rejectionReason!)}';
        body = '$by turned these values down$when$why '
            'They are loaded so you can see what was tried. Don’t work from them.';
    }
    final reason = c.status == Status.proposed && a.rationale != null
        ? '<details class="sim-why"><summary>Why it was proposed</summary><p>${esc(a.rationale!)}</p></details>'
        : '';
    final ranges = c.ranges.isEmpty
        ? ''
        : '<p class="sim-range">This record gives a range for '
            '${c.ranges.entries.map((e) => '${e.key} (${esc(e.value)})').join(' and ')}. '
            'The starting point uses the low end, as the channel list draws it.</p>';
    trust.setAttribute('style', '--edge:${_edge[c.status]}');
    trust.setAttribute('data-status', c.status.name);
    trust.innerHTML = '<span class="mark">${_icons[c.status]}${c.status.label}</span>'
        '<p>$body${esc(asOf)}</p>$reason$ranges';
  }

  String _countText() {
    final n = _changedBands().length;
    if (n == 0) return 'At the starting point.';
    return '$n of 5 bands changed from the starting point.';
  }

  List<String> _changedBands() {
    final s = strip, o = channel.start;
    return [
      if (s.hpfIn != o.hpfIn) 'HPF',
      if (s.hf != o.hf) 'HF',
      if (s.hm != o.hm || (s.hm != 0 && s.hmHz != o.hmHz)) 'HM',
      if (s.lm != o.lm || (s.lm != 0 && s.lmHz != o.lmHz)) 'LM',
      if (s.lf != o.lf) 'LF',
    ];
  }

  void _controls() {
    final s = strip, o = channel.start;
    hpf.setAttribute('aria-checked', '${s.hpfIn}');
    hpfState.textContent = s.hpfIn ? 'IN' : 'OUT';
    _was('hpf-was', 'Start ${o.hpfIn ? 'IN' : 'OUT'}', s.hpfIn == o.hpfIn ? null : 'switched ${s.hpfIn ? 'in' : 'out'}');

    _gain(hf, 'hf-gain-out', s.hf);
    _gain(lf, 'lf-gain-out', s.lf);
    _gain(hmG, 'hm-gain-out', s.hm);
    _gain(lmG, 'lm-gain-out', s.lm);
    _freq(hmF, 'hm-freq-out', hmSweep, s.hmHz);
    _freq(lmF, 'lm-freq-out', lmSweep, s.lmHz);

    _was('hf-was', 'Start ${formatDb(o.hf)}', _gainDelta(o.hf, s.hf));
    _was('lf-was', 'Start ${formatDb(o.lf)}', _gainDelta(o.lf, s.lf));
    _sweptWas('hm-was', o.hmHz, o.hm, s.hmHz, s.hm);
    _sweptWas('lm-was', o.lmHz, o.lm, s.lmHz, s.lm);
  }

  void _gain(Field f, String outId, int db) {
    if (f.value != '$db') f.value = '$db';
    f.setAttribute('aria-valuetext', formatDb(db));
    // Fill from the centre detent to the knob.
    final p = (db + gainLimitDb) / (2 * gainLimitDb) * 100;
    f.setAttribute('style', '--a:${math.min(50, p)}%;--b:${math.max(50, p)}%');
    _el(outId).innerHTML = '${signed(db)}<span class="u"> dB</span>';
  }

  void _freq(Field f, String outId, Sweep sweep, double hz) {
    final i = '${sweep.indexOf(hz)}';
    if (f.value != i) f.value = i;
    f.setAttribute('aria-valuetext', formatHz(hz));
    f.setAttribute('style', '--a:0%;--b:${(sweep.indexOf(hz) / sweep.last * 100).toStringAsFixed(2)}%');
    final (n, u) = splitHz(hz);
    _el(outId).innerHTML = '$n<span class="u"> $u</span>';
  }

  String? _gainDelta(int from, int now) => from == now ? null : '${formatDb(now - from)}';

  void _sweptWas(String id, double fromHz, int from, double hz, int now) {
    final start = from == 0 ? 'Start flat, 0 dB' : 'Start ${formatHz(fromHz)}, ${formatDb(from)}';
    final parts = [
      if (now != from) formatDb(now - from),
      if (from != 0 && now != 0 && hz != fromHz) octaveChange(fromHz, hz),
    ];
    _was(id, start, parts.isEmpty ? null : parts.join(', '));
  }

  void _was(String id, String start, String? delta) {
    final tail = delta == null
        ? '<span class="same">same as start</span>'
        : '<span class="delta"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M5 1 9 5 5 9 1 5z"/></svg>Changed: ${esc(delta)}</span>';
    _el(id).innerHTML = '<span class="start">${esc(start)}</span> $tail';
  }

  // ---- The curve ----

  static const _fLo = 20.0, _fHi = 20000.0, _span = 18.0;

  void _draw() {
    final w = math.max(220, plot.clientWidth).toDouble();
    final h = (w * 0.48).clamp(200.0, 320.0);
    const l = 40.0, r = 10.0, t = 10.0, b = 28.0;
    final pw = w - l - r, ph = h - t - b;
    double x(double f) => l + math.log(f / _fLo) / math.log(_fHi / _fLo) * pw;
    double y(double db) => t + (1 - (db.clamp(-_span - 4, _span + 4) + _span) / (2 * _span)) * ph;
    String fmt(double v) => v.toStringAsFixed(1);

    String pathOf(Strip s) {
      final pts = <String>[];
      const n = 180;
      for (var i = 0; i <= n; i++) {
        final f = _fLo * math.pow(_fHi / _fLo, i / n);
        pts.add('${fmt(x(f))},${fmt(y(s.responseDb(f)))}');
      }
      return 'M${pts.join('L')}';
    }

    final out = StringBuffer()
      ..write('<defs><clipPath id="sim-clip"><rect x="$l" y="$t" width="${fmt(pw)}" height="${fmt(ph)}"/></clipPath></defs>');
    // Grid: every 1-2-5 step, with numbers only where they fit.
    final narrow = pw < 420;
    for (final f in const [30.0, 40.0, 50.0, 60.0, 70.0, 80.0, 90.0, 100.0, 200.0, 300.0, 400.0, 500.0, 600.0, 700.0, 800.0, 900.0, 1000.0,
      2000.0, 3000.0, 4000.0, 5000.0, 6000.0, 7000.0, 8000.0, 9000.0, 10000.0]) {
      final major = f == 100 || f == 1000 || f == 10000;
      out.write('<line class="${major ? 'g-major' : 'g-minor'}" x1="${fmt(x(f))}" x2="${fmt(x(f))}" y1="$t" y2="${fmt(t + ph)}"/>');
    }
    final hzLabels = narrow ? const [100.0, 1000.0, 10000.0] : const [50.0, 100.0, 200.0, 500.0, 1000.0, 2000.0, 5000.0, 10000.0];
    for (final f in hzLabels) {
      final text = f < 1000 ? '${f.round()}' : '${(f / 1000).round()}k';
      out.write('<text class="ax" x="${fmt(x(f))}" y="${fmt(h - 8)}" text-anchor="middle">$text</text>');
    }
    out.write('<text class="ax" x="${fmt(l - 6)}" y="${fmt(h - 8)}" text-anchor="end">Hz</text>');
    for (final d in const [-15.0, -10.0, -5.0, 0.0, 5.0, 10.0, 15.0]) {
      out.write('<line class="${d == 0 ? 'g-zero' : 'g-minor'}" x1="$l" x2="${fmt(l + pw)}" y1="${fmt(y(d))}" y2="${fmt(y(d))}"/>');
      if (ph >= 180 || d % 10 == 0) {
        out.write('<text class="ax" x="${fmt(l - 6)}" y="${fmt(y(d) + 5)}" text-anchor="end">${signed(d.round())}</text>');
      }
    }
    final live = pathOf(strip), start = pathOf(channel.start);
    out
      ..write('<g clip-path="url(#sim-clip)">')
      ..write('<path class="c-area" d="${live}L${fmt(l + pw)},${fmt(y(0))}L$l,${fmt(y(0))}Z"/>')
      ..write('<path class="c-start" d="$start"/>')
      ..write('<path class="c-live" d="$live"/>');
    void dot(String cls, double f) =>
        out.write('<circle class="c-dot $cls" cx="${fmt(x(f))}" cy="${fmt(y(strip.responseDb(f)))}" r="5"/>');
    if (strip.hpfIn) dot('hpf', hpfHz);
    if (strip.lf != 0) dot('lf', 50);
    if (strip.lm != 0) dot('lm', strip.lmHz);
    if (strip.hm != 0) dot('hm', strip.hmHz);
    if (strip.hf != 0) dot('hf', hfShelfHz);
    out.write('</g>');

    svg.setAttribute('viewBox', '0 0 ${fmt(w)} ${fmt(h)}');
    svg.setAttribute('width', fmt(w));
    svg.setAttribute('height', fmt(h));
    svg.innerHTML = out.toString();
    _summary();
  }

  static const _sumLo = 25.0, _sumHi = 16000.0;

  /// The largest value of [score] from 25 Hz to 16 kHz, and where it is:
  /// a coarse scan, then a narrow search around the best sample.
  (double, double) _extreme(double Function(double hz) score) {
    const n = 160;
    double fAt(num i) => _sumLo * math.pow(_sumHi / _sumLo, i / n).toDouble();
    var best = 0;
    for (var i = 1; i <= n; i++) {
      if (score(fAt(i)) > score(fAt(best))) best = i;
    }
    var a = math.max(0, best - 1).toDouble(), b = math.min(n, best + 1).toDouble();
    for (var k = 0; k < 40; k++) {
      final m1 = a + (b - a) / 3, m2 = b - (b - a) / 3;
      if (score(fAt(m1)) < score(fAt(m2))) {
        a = m1;
      } else {
        b = m2;
      }
    }
    final f = fAt((a + b) / 2);
    return (score(f), f);
  }

  /// The curve in words: biggest boost and cut from the four EQ bands, and
  /// where your setting is furthest from the starting point.
  void _summary() {
    final eq = strip.copyWith(hpfIn: false);
    final start = channel.start;
    final hi = _extreme((f) => eq.responseDb(f));
    final lo = _extreme((f) => -eq.responseDb(f));
    final diff = _extreme((f) => (strip.responseDb(f) - start.responseDb(f)).abs());
    String at((double, double) p, double Function(double) value) {
      final hz = p.$2;
      final where = hz <= _sumLo * 1.01
          ? 'at ${formatHz(_sumLo)} and below'
          : hz >= _sumHi * 0.99 ? 'at ${formatHz(_sumHi)} and above' : 'at ${formatHz(roundHz(hz))}';
      return '${formatDb((value(hz) * 10).round() / 10)} $where';
    }
    String item(String k, String v) => '<div><dt>$k</dt><dd>${esc(v)}</dd></div>';
    summary.innerHTML = [
      item('Biggest EQ boost', hi.$1 < 0.05 ? 'None' : at(hi, eq.responseDb)),
      item('Biggest EQ cut', lo.$1 < 0.05 ? 'None' : at(lo, eq.responseDb)),
      item('Furthest from the start',
          diff.$1 < 0.05 ? 'Same as the start' : at(diff, (f) => strip.responseDb(f) - start.responseDb(f))),
    ].join();
  }
}

// ---- Theme: follows the device until the person chooses ------------------
// The same rule and storage key as the channel list, so a choice carries over.

class Theme {
  final Element? button = document.getElementById('mode');
  final Element? label = document.getElementById('modeLabel');

  void wire() {
    final b = button;
    if (b == null) return;
    _apply(document.documentElement.getAttribute('data-mode') ?? 'dark');
    b.addEventListener('click', (() {
      final next = document.documentElement.getAttribute('data-mode') == 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem('eq-sop-theme', next);
      } catch (_) {}
      _apply(next);
    }).toJS);
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', ((JSObject e) {
      String? saved;
      try {
        saved = window.localStorage.getItem('eq-sop-theme');
      } catch (_) {}
      if (saved == null) _apply(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    }).toJS);
  }

  void _apply(String mode) {
    document.documentElement.setAttribute('data-mode', mode);
    final next = mode == 'dark' ? 'light' : 'dark';
    label?.textContent = 'Switch to $next';
    button?.setAttribute('aria-label', 'Switch to $next theme');
  }
}
