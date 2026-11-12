import 'package:strip/dates.dart';
import 'package:test/test.dart';

void main() {
  group('localDay', () {
    test('formats with zero padding', () {
      expect(localDay('2026-03-04T05:06:07Z', toLocal: false), '2026-03-04');
    });

    test('uses the local calendar day, not the UTC one', () {
      // 01:29 UTC on the 12th is still the 11th anywhere west of UTC-1:29.
      const iso = '2026-11-12T01:29:00.000Z';
      final local = DateTime.parse(iso).toLocal();
      final expected = '${local.year}-${local.month.toString().padLeft(2, '0')}-${local.day.toString().padLeft(2, '0')}';
      expect(localDay(iso), expected);
    });

    test('returns null for text that is not a timestamp', () {
      expect(localDay(''), isNull);
      expect(localDay('not a date'), isNull);
    });
  });
}
