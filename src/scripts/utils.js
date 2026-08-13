export function getRandomInt(min, max, seed) {
  return min + Math.floor((max - min + 1) * getRandomNumber(seed));
}

export function getRandomChoice(arr, seed) {
  return arr[getRandomInt(0, arr.length - 1, seed)];
}

export function getRandomBoolean(seed) {
  return getRandomNumber(seed) < 0.5;
}

export function getRandomNumber(seed) {
  const x = 1e4 * Math.sin(7 * seed);
  return x - Math.floor(x);
}

export function getHCF(a, b) {
  if (a == 1 && b == 1) { return 1 }
  return b == 0 ? a : getHCF(b, a % b);
}

export function formatCoefficient(x, parameters = {showPlus: false, showOne: true, showZero: true, suffix: ''}) {
  if (!parameters.showZero && x == 0) { return ''; }
  const plus = parameters.showPlus ? '+' : '';
  const sign = x < 0 ? '-' : plus;
  x = Math.abs(x);
  parameters.showOne || x == 1 && (x = '');
  parameters.suffix || (parameters.suffix = '') // if suffix undefined
  return sign + x + parameters.suffix;
}

export function getSymmetricBounds(midX, viewBox) {
  const [ minX, minY, width, height ] = viewBox;
  const halfWidth = Math.max(midX - minX, minX + width - midX);
  return [midX - halfWidth, midX + halfWidth];
}

export function getColourClass(colour) {
  if (colour == 'auto') { return ''; }
  return `color-${colour}`;
}
