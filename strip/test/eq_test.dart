// The simulator must draw the same curve as the channel cards. The reference
// values come from public/app.js itself (tool/js_reference.mjs).
import 'dart:convert';
import 'dart:io';

import 'package:strip/channel.dart';
import 'package:strip/eq.dart';
import 'package:test/test.dart';

void main() {
  final ref = jsonDecode(File('test/js_reference.json').readAsStringSync()) as Map<String, Object?>;
  final freqs = (ref['freqs'] as List).cast<num>().map((f) => f.toDouble()).toList();
  final cases = (ref['cases'] as List).cast<Map<String, Object?>>();

  test('reference was made at the same sample rate', () {
    expect(ref['sampleRate'], sampleRate);
  });

  test('covers every channel and the console limits', () {
    expect(cases.length, greaterThan(60));
  });

  for (final c in cases) {
    test('${c['label']} matches app.js within 0.01 dB', () {
      final strip = stripFromBands((c['bands'] as Map).cast<String, Object?>());
      final want = (c['db'] as List).cast<num>();
      for (var i = 0; i < freqs.length; i++) {
        expect(strip.responseDb(freqs[i]), closeTo(want[i].toDouble(), 0.01),
            reason: 'at ${freqs[i].toStringAsFixed(1)} Hz');
      }
    });
  }

  group('filters', () {
    test('a flat strip is 0 dB everywhere', () {
      const flat = Strip();
      for (final f in [20.0, 80.0, 1000.0, 12000.0, 20000.0]) {
        expect(flat.responseDb(f), 0);
      }
    });

    test('HPF is 3 dB down at 80 Hz and falls 12 dB per octave', () {
      const hpf = Strip(hpfIn: true);
      expect(hpf.responseDb(80), closeTo(-3.01, 0.05));
      final drop = hpf.responseDb(20) - hpf.responseDb(40);
      expect(drop, closeTo(-12, 0.5));
    });

    test('a peak reaches its full gain at its centre', () {
      expect(const Strip(hm: 15, hmHz: 3500).responseDb(3500), closeTo(15, 0.01));
      expect(const Strip(lm: -15, lmHz: 35).responseDb(35), closeTo(-15, 0.01));
    });

    test('shelves are at half their gain at the corner and full beyond it', () {
      expect(const Strip(lf: 12).responseDb(80), closeTo(6, 0.1));
      expect(const Strip(lf: 12).responseDb(20), closeTo(12, 0.3));
      expect(const Strip(hf: -9).responseDb(12000), closeTo(-4.5, 0.1));
    });

    test('gains are whole dB within ±15', () {
      expect(clampGain(15.4), 15);
      expect(clampGain(-40), -15);
      expect(clampGain(2.6), 3);
      expect(const Strip().copyWith(hf: 99).hf, 15);
    });

    test('sweeps stay inside the console limits', () {
      final s = const Strip().copyWith(lmHz: 10, hmHz: 40000);
      expect(s.lmHz, lmMinHz);
      expect(s.hmHz, hmMaxHz);
    });
  });
}
