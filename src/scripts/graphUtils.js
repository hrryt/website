function scale(vector, factor) {
  return vector.map(a => a * factor);
}

function sum(arr) {
  return arr.reduce((a, b) => a + b);
}

export function sumVectors(a, b) {
  return a.map((ai, i) => b[i] + ai);
}

export function getVector(start, end) {
  return start.map((a, i) => end[i] - a);
}

function normalise(vector, scaleFactor = 1) {
  const length = Math.sqrt(sum(vector.map(a => a*a)));
  return scale(vector, scaleFactor / length);
}

function interpolate(start, end, along) {
  return sumVectors(start, scale(getVector(start, end), along));
}

export function interpolateDistance(start, end, distance) {
  return sumVectors(start, normalise(getVector(start, end), distance));
}

export function getMidpoint(points) {
  return interpolate(points[0], points[1], 0.5);
}

export function getSymmetricBounds(midX, dx, viewBox) {
  const [minX, minY, width, height] = viewBox;
  const maxX = minX + width;

  const maxDx = Math.max(midX - minX, maxX - midX);
  const dx0 = Math.min(maxDx, dx);
  return [midX - dx0, midX + dx0];
}

export function getColourClass(colour) {
  if (colour == 'auto') { return ''; }
  return `color-${colour}`;
}
