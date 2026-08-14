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

export function formatCoefficient(x, parameters = { showPlus: false, showOne: true, showZero: true, suffix: '' }) {
  if (!parameters.showZero && x == 0) { return ''; }
  const plus = parameters.showPlus ? '+' : '';
  const sign = x < 0 ? '-' : plus;
  x = Math.abs(x);
  parameters.showOne || x == 1 && (x = '');
  parameters.suffix || (parameters.suffix = '') // if suffix undefined
  return sign + x + parameters.suffix;
}

export function simplifyFraction(num, denom) {
  const hcf = getHCF(num, denom);
  return [num / hcf, denom / hcf];
}

// this thing is probably begging for bugs from simplification and zeroes.
export function formatFraction(num, denom, parameters = { showPlus: false, showOne: true, showZero: false, simplify: false, suffix: '' }) {
  if (!parameters.showZero && num == 0) { return ''; }
  const plus = parameters.showPlus ? '+' : '';
  const sign = num / denom < 0 ? '-' : plus;

  [num, denom] = [Math.abs(num), Math.abs(denom)]
  [num, denom] = parameters.simplify ? [num, denom] : simplifyFraction(num, denom)
  parameters.suffix || (parameters.suffix = '')

  let x = `frac(${num}, ${denom})`
  parameters.showOne || num / denom == 1 && (x = '');
  if (denom == 1) { return sign + Math.abs(num) + parameters.suffix; }
  return sign + x + parameters.suffix
}

export function formatLine(line) {
  if (line.b == 0) { return `x = ${formatFraction(line.c, line.a, { simplify: true })}` }
  const mxTerm = formatFraction(-line.a, line.b, { simplify: true, suffix: 'x' })
  const cTerm = formatFraction(line.c, line.b, { showOne: true, simplify: true })
  return 'y = ' + mxTerm + cTerm
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

function sumVectors(arr) {
  return arr.reduce((a, b) => a.map((ai, i) => ai + b[i]));
}

function scale(vector, factor) {
  return vector.map(a => a * factor);
}

function sum(arr) {
  return arr.reduce((a, b) => a + b);
}

function normalise(vector, scaleFactor = 1) {
  const length = Math.sqrt(sum(vector.map(a => a*a)));
  return scale(vector, scaleFactor / length);
}

function getVector(start, end) {
  return start.map((a, i) => end[i] - a);
}

function interpolate(start, end, along) {
  return sumVectors([start, scale(getVector(start, end), along)]);
}

export function interpolateDistance(start, end, distance) {
  return sumVectors([start, normalise(getVector(start, end), distance)]);
}

export function getMidpoint(points) {
  return interpolate(points[0], points[1], 0.5);
}
