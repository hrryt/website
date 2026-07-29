export function getRandomInt(min, max, seed) {
  return min + Math.floor((max - min + 1) * getRandomNumber(seed));
}

export function getRandomBoolean(seed) {
  return getRandomNumber(seed) < 0.5;
}

export function getRandomNumber(seed) {
  const x = 1e4 * Math.sin(7 * seed);
  return x - Math.floor(x);
}

export function getHCF(a, b) {
  return b == 0 ? a : getHCF(b, a % b);
}

export function formatNumber(x, showPlus, showOne, showZero, suffix='') {
  if (!showZero && x == 0) { return ''; }
  plus = showPlus ? '+' : '';
  sign = x < 0 ? '-' : plus;
  x = Math.abs(x);
  showOne || x == 1 && (x = '');
  return sign + x + suffix;
}
