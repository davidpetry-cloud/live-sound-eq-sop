// Frequency sweeps and the words and numbers the simulator shows.
//
// A sweep knob turns in octaves, not hertz, so each slider step is about a
// 24th of an octave. Each step is rounded to a value an engineer would read
// off the panel (315 Hz, 3.5 kHz). The panel's printed marks and every
// starting frequency in the data are steps too, so the arrow keys land on
// familiar values and "Reset" lands exactly on the recorded one.
import 'dart:math' as math;

import 'eq.dart';

/// A swept band's frequency steps, low to high.
class Sweep {
  final List<double> steps;
  Sweep._(this.steps);

  /// Steps from [lo] to [hi]. Panel marks, the ISO third-octave centres and
  /// any [extra] values inside the range are always steps; a grid step within
  /// a 48th of an octave of one gives way to it, so steps stay even.
  factory Sweep(double lo, double hi, {Iterable<double> extra = const [], int perOctave = 24}) {
    final fixed = {lo, hi, for (final f in [...landmarks, ...extra]) if (f >= lo && f <= hi) f};
    final octaves = math.log(hi / lo) / math.ln2;
    final n = (octaves * perOctave).round();
    final set = {...fixed};
    for (var i = 1; i < n; i++) {
      final f = roundHz(lo * math.pow(hi / lo, i / n));
      if (fixed.every((x) => (math.log(f / x) / math.ln2).abs() > 1 / 48)) set.add(f);
    }
    return Sweep._(set.toList()..sort());
  }

  /// Marks printed around the WZ3's sweep knobs, and the third-octave centres.
  static const landmarks = <double>[
    35, 45, 70, 180, 250, 400, 1000, 500, 700, 3000, 4000, 6000, 15000,
    40, 50, 63, 80, 100, 125, 160, 200, 315, 630, 800,
    1250, 1600, 2000, 2500, 3150, 5000, 6300, 8000, 10000, 12500,
  ];

  static final lm = Sweep(lmMinHz, lmMaxHz);
  static final hm = Sweep(hmMinHz, hmMaxHz);

  int get last => steps.length - 1;

  /// The step nearest [hz], measured in octaves.
  int indexOf(double hz) {
    var best = 0;
    var bestGap = double.infinity;
    for (var i = 0; i < steps.length; i++) {
      final gap = (math.log(steps[i] / hz)).abs();
      if (gap < bestGap) {
        best = i;
        bestGap = gap;
      }
    }
    return best;
  }

  double at(int i) => steps[i.clamp(0, last)];

  /// Where [hz] sits along the sweep, 0 to 1 on a log scale (for tick marks).
  double position(double hz) => math.log(hz / steps.first) / math.log(steps.last / steps.first);
}

/// Round to the resolution a panel reading has: 1 Hz below 100 Hz,
/// 5 Hz below 1 kHz, 50 Hz below 2 kHz, 100 Hz below 10 kHz, 500 Hz above.
double roundHz(num hz) {
  final step = hz < 100 ? 1 : hz < 1000 ? 5 : hz < 2000 ? 50 : hz < 10000 ? 100 : 500;
  return ((hz / step).round() * step).toDouble();
}

const _minus = '−';

/// "350 Hz", "3.5 kHz", "12 kHz".
String formatHz(double hz) {
  if (hz < 1000) return '${hz.round()} Hz';
  final k = hz / 1000;
  final text = k == k.roundToDouble() ? '${k.round()}' : _trim(k.toStringAsFixed(2));
  return '$text kHz';
}

/// The number and unit apart, for setting the unit smaller.
(String, String) splitHz(double hz) {
  final parts = formatHz(hz).split(' ');
  return (parts[0], parts[1]);
}

/// "+3 dB", "0 dB", "−4 dB", with a true minus sign.
String formatDb(num db) => '${signed(db)} dB';

/// "+3", "0", "−4".
String signed(num db) {
  final n = db is int ? db : (db * 10).round() / 10;
  final text = n is double && n == n.roundToDouble() ? '${n.abs().round()}' : '${n.abs()}';
  if (n > 0) return '+$text';
  if (n < 0) return '$_minus$text';
  return '0';
}

/// How far [hz] is from [from], in words: "0.5 octave higher".
String octaveChange(double from, double hz) {
  final oct = math.log(hz / from) / math.ln2;
  final r = (oct.abs() * 10).round() / 10;
  if (r == 0) return 'same frequency';
  final amount = r == r.roundToDouble() ? '${r.round()}' : '$r';
  return '$amount ${r <= 1 ? 'octave' : 'octaves'} ${oct > 0 ? 'higher' : 'lower'}';
}

String _trim(String s) => s.contains('.') ? s.replaceFirst(RegExp(r'\.?0+$'), '') : s;
