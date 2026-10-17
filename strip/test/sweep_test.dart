import 'package:strip/eq.dart';
import 'package:strip/sweep.dart';
import 'package:test/test.dart';

void main() {
  group('Sweep', () {
    test('runs end to end of the console range', () {
      expect(Sweep.lm.steps.first, lmMinHz);
      expect(Sweep.lm.steps.last, lmMaxHz);
      expect(Sweep.hm.steps.first, hmMinHz);
      expect(Sweep.hm.steps.last, hmMaxHz);
    });

    test('steps rise and are about a 24th of an octave', () {
      final s = Sweep.hm.steps;
      for (var i = 1; i < s.length; i++) {
        expect(s[i], greaterThan(s[i - 1]));
      }
      expect(s.length, inInclusiveRange(90, 130));
      for (var i = 1; i < s.length; i++) {
        expect(s[i] / s[i - 1], lessThan(1.06), reason: '${s[i - 1]} to ${s[i]}');
      }
    });

    test('lands exactly on recorded frequencies', () {
      final lm = Sweep(35, 1000, extra: [350, 450]);
      for (final f in [315.0, 350.0, 450.0, 45.0, 180.0]) {
        expect(lm.at(lm.indexOf(f)), f, reason: '$f Hz');
      }
      final hm = Sweep(500, 15000, extra: [2800, 3500, 4500, 7000]);
      for (final f in [2800.0, 3500.0, 4500.0, 7000.0, 3000.0, 15000.0]) {
        expect(hm.at(hm.indexOf(f)), f, reason: '$f Hz');
      }
    });

    test('adds extra values inside the range only', () {
      final s = Sweep(500, 1000, extra: [612, 2000]);
      expect(s.steps, contains(612));
      expect(s.steps, isNot(contains(2000)));
    });
  });

  group('formatting', () {
    test('frequencies read like the panel', () {
      expect(formatHz(350), '350 Hz');
      expect(formatHz(3500), '3.5 kHz');
      expect(formatHz(12000), '12 kHz');
      expect(splitHz(2800), ('2.8', 'kHz'));
    });

    test('gains carry a sign and a true minus', () {
      expect(formatDb(3), '+3 dB');
      expect(formatDb(0), '0 dB');
      expect(formatDb(-4), '−4 dB');
      expect(signed(-4.24), '−4.2');
    });

    test('frequency changes are in octaves', () {
      expect(octaveChange(350, 350), 'same frequency');
      expect(octaveChange(350, 700), '1 octave higher');
      expect(octaveChange(1000, 250), '2 octaves lower');
      expect(octaveChange(1000, 1414), '0.5 octave higher');
    });
  });
}
