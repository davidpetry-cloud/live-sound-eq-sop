import 'package:strip/channel.dart';
import 'package:test/test.dart';

void main() {
  group('toHz, as in src/data.js', () {
    test('reads hertz and kilohertz', () {
      expect(toHz('350 Hz'), 350);
      expect(toHz('3.5 kHz'), 3500);
      expect(toHz('1k'), 1000);
    });
    test('knows the special labels', () {
      expect(toHz('park 15k'), 15000);
      expect(toHz('0 dB'), isNull);
      expect(toHz('nonsense')!.isNaN, isTrue);
    });
  });

  group('ends, as in public/app.js', () {
    test('a number is both ends', () => expect(ends(3), [3, 3]));
    test('a range gives low and high', () {
      expect(ends('−2 dB to +2 dB'), [-2, 2]);
      expect(ends('0 dB to +2 dB'), [0, 2]);
    });
  });

  group('Channel.fromJson', () {
    Map<String, Object?> record({String status = 'attested', Map<String, Object?>? bands}) => {
          'name': 'TOM',
          'variant': 'FLOOR',
          'group': 'Drums',
          'status': status,
          'bands': bands ??
              {'hpf': 'IN', 'lf': 3, 'lmF': '350 Hz', 'lmD': -4, 'hmF': '3.5 kHz', 'hmD': 2, 'hf': 0},
          'attestation': {
            'source': 'practitioner', 'by': 'David Petry', 'verified': '2026-08-25',
            'rejection': null,
          },
        };

    test('reads the starting point in strip order', () {
      final c = Channel.fromJson(record());
      expect(c.id, 'TOM (FLOOR)');
      expect(c.slug, 'tom-floor');
      expect(c.start.hpfIn, isTrue);
      expect(c.start.lmHz, 350);
      expect(c.start.lm, -4);
      expect(c.start.hmHz, 3500);
      expect(c.start.hm, 2);
      expect(c.start.lf, 3);
      expect(c.ranges, isEmpty);
      expect(c.attestation.by, 'David Petry');
    });

    test('a band with no frequency is off', () {
      final c = Channel.fromJson(record(bands: {
        'hpf': 'OUT', 'lf': 0, 'lmF': '0 dB', 'lmD': -3, 'hmF': '3 kHz', 'hmD': 0, 'hf': 0,
      }));
      expect(c.start.lm, 0);
      expect(c.start.hpfIn, isFalse);
    });

    test('a range starts at its low end and is reported', () {
      final c = Channel.fromJson(record(bands: {
        'hpf': 'OUT', 'lf': '−2 dB to +2 dB', 'lmF': '0 dB', 'lmD': 0, 'hmF': '0 dB', 'hmD': 0, 'hf': 0,
      }));
      expect(c.start.lf, -2);
      expect(c.ranges, {'LF': '−2 dB to +2 dB'});
    });

    test('status decides whether the starting point is trusted', () {
      expect(Channel.fromJson(record()).status.trusted, isTrue);
      for (final s in ['proposed', 'expired', 'rejected']) {
        expect(Channel.fromJson(record(status: s)).status.trusted, isFalse, reason: s);
      }
      expect(Status.expired.label, 'Lapsed');
      expect(Status.parse('unknown'), Status.proposed);
    });
  });
}
