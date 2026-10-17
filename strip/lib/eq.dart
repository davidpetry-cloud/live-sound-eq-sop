// The WZ3 channel EQ as filters: RBJ cookbook biquads at 96 kHz.
//
// The same maths as curve()/biquad() in public/app.js, so the simulator and
// the channel cards draw the same shape for the same settings. A test holds
// the two within 0.01 dB (test/eq_test.dart).
//
// Console limits come from the WZ3 16:2 / 12:2 User Guide (AP5331), as
// recorded in src/data.js:
//   HPF  80 Hz fixed, 12 dB/octave, in or out only
//   HF   shelf at 12 kHz        LF  shelf at 80 Hz
//   HM   peak, 500 Hz - 15 kHz  LM  peak, 35 Hz - 1 kHz
//   All gain bands ±15 dB in whole steps, Q fixed at 1.8
import 'dart:math' as math;

const double sampleRate = 96000;
const double hpfHz = 80;
const double lfShelfHz = 80;
const double hfShelfHz = 12000;
const double peakQ = 1.8;
const int gainLimitDb = 15;
const double lmMinHz = 35, lmMaxHz = 1000;
const double hmMinHz = 500, hmMaxHz = 15000;

/// One second-order section: numerator b0..b2, denominator a0..a2.
class Biquad {
  final double b0, b1, b2, a0, a1, a2;
  const Biquad(this.b0, this.b1, this.b2, this.a0, this.a1, this.a2);

  /// Gain in dB at [hz].
  double magnitudeDb(double hz) {
    final w = 2 * math.pi * hz / sampleRate;
    final c1 = math.cos(w), c2 = math.cos(2 * w);
    final s1 = math.sin(w), s2 = math.sin(2 * w);
    final nr = b0 + b1 * c1 + b2 * c2, ni = b1 * s1 + b2 * s2;
    final dr = a0 + a1 * c1 + a2 * c2, di = a1 * s1 + a2 * s2;
    return 10 * math.log((nr * nr + ni * ni) / (dr * dr + di * di)) / math.ln10;
  }
}

/// 12 dB/octave high-pass (Butterworth, Q 0.7071).
Biquad highPass(double f0) {
  final w0 = 2 * math.pi * f0 / sampleRate, c = math.cos(w0);
  final al = math.sin(w0) / (2 * 0.7071);
  return Biquad((1 + c) / 2, -(1 + c), (1 + c) / 2, 1 + al, -2 * c, 1 - al);
}

/// Peak/dip at [f0] with [gainDb] and [q].
Biquad peak(double f0, double gainDb, [double q = peakQ]) {
  final a = math.pow(10, gainDb / 40).toDouble();
  final w0 = 2 * math.pi * f0 / sampleRate, c = math.cos(w0);
  final al = math.sin(w0) / (2 * q);
  return Biquad(1 + al * a, -2 * c, 1 - al * a, 1 + al / a, -2 * c, 1 - al / a);
}

/// Low shelf at [f0], slope 1.
Biquad lowShelf(double f0, double gainDb) {
  final (a, c, ra) = _shelf(f0, gainDb);
  return Biquad(
    a * ((a + 1) - (a - 1) * c + ra), 2 * a * ((a - 1) - (a + 1) * c), a * ((a + 1) - (a - 1) * c - ra),
    (a + 1) + (a - 1) * c + ra, -2 * ((a - 1) + (a + 1) * c), (a + 1) + (a - 1) * c - ra);
}

/// High shelf at [f0], slope 1.
Biquad highShelf(double f0, double gainDb) {
  final (a, c, ra) = _shelf(f0, gainDb);
  return Biquad(
    a * ((a + 1) + (a - 1) * c + ra), -2 * a * ((a - 1) + (a + 1) * c), a * ((a + 1) + (a - 1) * c - ra),
    (a + 1) - (a - 1) * c + ra, 2 * ((a - 1) - (a + 1) * c), (a + 1) - (a - 1) * c - ra);
}

(double, double, double) _shelf(double f0, double gainDb) {
  final a = math.pow(10, gainDb / 40).toDouble();
  final w0 = 2 * math.pi * f0 / sampleRate;
  final al = math.sin(w0) / 2 * math.sqrt2;
  return (a, math.cos(w0), 2 * math.sqrt(a) * al);
}

/// A whole strip setting, in strip order top to bottom.
class Strip {
  final bool hpfIn;
  final int hf;
  final double hmHz;
  final int hm;
  final double lmHz;
  final int lm;
  final int lf;

  const Strip({
    this.hpfIn = false,
    this.hf = 0,
    this.hmHz = 3000,
    this.hm = 0,
    this.lmHz = 300,
    this.lm = 0,
    this.lf = 0,
  });

  Strip copyWith({bool? hpfIn, int? hf, double? hmHz, int? hm, double? lmHz, int? lm, int? lf}) => Strip(
        hpfIn: hpfIn ?? this.hpfIn,
        hf: clampGain(hf ?? this.hf),
        hmHz: (hmHz ?? this.hmHz).clamp(hmMinHz, hmMaxHz).toDouble(),
        hm: clampGain(hm ?? this.hm),
        lmHz: (lmHz ?? this.lmHz).clamp(lmMinHz, lmMaxHz).toDouble(),
        lm: clampGain(lm ?? this.lm),
        lf: clampGain(lf ?? this.lf),
      );

  /// The filters this setting switches in. A band at 0 dB is flat, so it is left out.
  List<Biquad> get filters => [
        if (hpfIn) highPass(hpfHz),
        if (lf != 0) lowShelf(lfShelfHz, lf.toDouble()),
        if (lm != 0) peak(lmHz, lm.toDouble()),
        if (hm != 0) peak(hmHz, hm.toDouble()),
        if (hf != 0) highShelf(hfShelfHz, hf.toDouble()),
      ];

  /// The strip's total response in dB at [hz].
  double responseDb(double hz) {
    var sum = 0.0;
    for (final f in filters) {
      sum += f.magnitudeDb(hz);
    }
    return sum;
  }

  @override
  bool operator ==(Object other) =>
      other is Strip &&
      other.hpfIn == hpfIn && other.hf == hf && other.hmHz == hmHz && other.hm == hm &&
      other.lmHz == lmHz && other.lm == lm && other.lf == lf;

  @override
  int get hashCode => Object.hash(hpfIn, hf, hmHz, hm, lmHz, lm, lf);
}

/// Gains are whole dB within ±15, like the console's knobs.
int clampGain(num db) => db.round().clamp(-gainLimitDb, gainLimitDb);
