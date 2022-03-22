/**
 * Converts RGBA to HSBA color. Max ranges are RGBA[255, 255, 255, 255] to HSB[360, 100, 100, 100].
 * @param {Array} rgb An array of [R, G, B, A] colors. A is optional.
 * @returns The [H, S, B, A] color.
 * @see https://www.30secondsofcode.org/js/s/rgb-to-hsb
 */
function RGBToHSB(rgb) {
  let r = rgb[0];
  let g = rgb[1];
  let b = rgb[2];
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  const a = 100 * rgb[3] / 255 ?? 100;
  return [
    60 * (h < 0 ? h + 6 : h),
    v && (n / v) * 100,
    v * 100,
    a
  ];
};

/**
 * Converts RGBA to HSBA color. Max ranges are HSB[360, 100, 100, 100] to RGBA[255, 255, 255, 255].
 * @param {Array} hsb An array of [H, S, B, A] colors. A is optional.
 * @returns The [R, G, B, A] color.
 * @see https://www.30secondsofcode.org/js/s/rgb-to-hsb
 */
function HSBToRGB(hsb) {
  let h = hsb[0];
  let s = hsb[1];
  let b = hsb[2];
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  const a = 255 * hsb[3] / 100 ?? 255;
  return [
    255 * f(5),
    255 * f(3),
    255 * f(1),
    a
  ];
};
