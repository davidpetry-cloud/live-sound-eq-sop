/// Calendar dates as people read them at the desk.
library;

/// The local calendar day of an ISO 8601 timestamp, as YYYY-MM-DD.
///
/// The API's `generated` time is UTC. Taking its first ten characters gave
/// tomorrow's date to anyone west of Greenwich in the evening, which is gig
/// time. Returns null when the text is not a timestamp.
String? localDay(String iso, {bool toLocal = true}) {
  final parsed = DateTime.tryParse(iso);
  if (parsed == null) return null;
  final d = toLocal ? parsed.toLocal() : parsed;
  String two(int n) => n.toString().padLeft(2, '0');
  return '${d.year.toString().padLeft(4, '0')}-${two(d.month)}-${two(d.day)}';
}
