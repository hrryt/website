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
