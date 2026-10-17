// Channel records from api/channels.json, turned into strip settings.
//
// The records use the page's own format: gains are numbers or a range
// written as text ("−2 dB to +2 dB"), frequencies are labels ("3.5 kHz",
// "park 15k", or "0 dB" for a band that is switched off). Parsing follows
// toHz() in src/data.js and ends() in public/app.js.
import 'eq.dart';

enum Status {
  attested('Attested'),
  proposed('Proposed'),
  expired('Lapsed'),
  rejected('Rejected');

  final String label;
  const Status(this.label);

  static Status parse(Object? value) =>
      Status.values.firstWhere((s) => s.name == value, orElse: () => Status.proposed);

  /// Only a current, signed record is a starting point to trust.
  bool get trusted => this == Status.attested;
}

class Attestation {
  final String? source, by, role, basis, verified, model, rationale;
  final String? rejectedBy, rejectionReason, reviewed;

  const Attestation({
    this.source, this.by, this.role, this.basis, this.verified, this.model, this.rationale,
    this.rejectedBy, this.rejectionReason, this.reviewed,
  });

  factory Attestation.fromJson(Map<String, Object?> j) {
    final r = j['rejection'];
    final rej = r is Map ? r.cast<String, Object?>() : const <String, Object?>{};
    String? s(Object? v) => v is String && v.trim().isNotEmpty ? v : null;
    return Attestation(
      source: s(j['source']), by: s(j['by']), role: s(j['role']), basis: s(j['basis']),
      verified: s(j['verified']), model: s(j['model']), rationale: s(j['rationale']),
      rejectedBy: s(rej['by']), rejectionReason: s(rej['reason']), reviewed: s(rej['reviewed']),
    );
  }

  bool get fromModel => source == 'model';
}

class Channel {
  final String name;
  final String? variant;
  final String group;
  final Status status;
  final Attestation attestation;

  /// The starting point: the low end of any range, as the channel cards draw it.
  final Strip start;

  /// Band names whose record gives a range, with the range as written.
  final Map<String, String> ranges;

  const Channel({
    required this.name, this.variant, required this.group, required this.status,
    required this.attestation, required this.start, this.ranges = const {},
  });

  /// "TOM (FLOOR)", as the rest of the site names channels.
  String get id => variant == null ? name : '$name ($variant)';

  /// A short, URL-safe key for the address bar: "tom-floor".
  String get slug => id.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]+'), '-').replaceAll(RegExp(r'^-+|-+$'), '');

  factory Channel.fromJson(Map<String, Object?> j) {
    final bands = (j['bands'] as Map).cast<String, Object?>();
    final a = j['attestation'];
    final variant = j['variant'];
    return Channel(
      name: '${j['name']}',
      variant: variant is String && variant.isNotEmpty ? variant : null,
      group: '${j['group'] ?? ''}',
      status: Status.parse(j['status']),
      attestation: a is Map ? Attestation.fromJson(a.cast<String, Object?>()) : const Attestation(),
      start: stripFromBands(bands),
      ranges: {
        for (final (key, band) in const [('hf', 'HF'), ('hmD', 'HM'), ('lmD', 'LM'), ('lf', 'LF')])
          if (bands[key] is String) band: '${bands[key]}'.replaceAll('-', '−'),
      },
    );
  }
}

/// A record's bands as a strip setting. [end] 0 is the low end of a range, 1 the high end.
Strip stripFromBands(Map<String, Object?> b, {int end = 0}) {
  final lmHz = toHz(b['lmF']), hmHz = toHz(b['hmF']);
  // A band with no frequency is switched off, whatever its gain says,
  // just as the channel cards draw it.
  return Strip(
    hpfIn: b['hpf'] == 'IN',
    hf: clampGain(ends(b['hf'])[end]),
    hmHz: hmHz == null || hmHz.isNaN ? 3000 : hmHz.clamp(hmMinHz, hmMaxHz).toDouble(),
    hm: hmHz == null || hmHz.isNaN ? 0 : clampGain(ends(b['hmD'])[end]),
    lmHz: lmHz == null || lmHz.isNaN ? 300 : lmHz.clamp(lmMinHz, lmMaxHz).toDouble(),
    lm: lmHz == null || lmHz.isNaN ? 0 : clampGain(ends(b['lmD'])[end]),
    lf: clampGain(ends(b['lf'])[end]),
  );
}

/// "3.5 kHz" → 3500, "park 15k" → 15000, "0 dB" → null (band off), else NaN.
double? toHz(Object? label) {
  if (label == null || label == '0 dB') return null;
  if (label is num) return label.toDouble();
  final text = '$label';
  if (text == 'park 15k') return 15000;
  final m = RegExp(r'^\s*[+-]?(\d+(\.\d*)?|\.\d+)').firstMatch(text);
  if (m == null) return double.nan;
  final value = double.parse(m.group(0)!);
  return RegExp('k', caseSensitive: false).hasMatch(text) ? value * 1000 : value;
}

/// A gain as both ends of its range: 3 → [3, 3]; "−2 dB to +2 dB" → [−2, 2].
List<double> ends(Object? v) {
  if (v is num) return [v.toDouble(), v.toDouble()];
  final found = RegExp(r'[−+-]?\d+(\.\d+)?')
      .allMatches('$v')
      .map((m) => double.parse(m.group(0)!.replaceAll('−', '-')))
      .toList();
  if (found.isEmpty) return [0, 0];
  return [found.first, found.length > 1 ? found[1] : found.first];
}
