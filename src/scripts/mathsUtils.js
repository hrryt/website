export function getHCF(a, b) {
  if (a == 1 && b == 1) return 1;
  return b == 0 ? a : getHCF(b, a % b);
}

export function simplifyFraction(num, denom) {
  const hcf = getHCF(num, denom);
  return [num / hcf, denom / hcf];
}

export function trueMod(a, b) {
  // a mod b, but with expected behaviour for negatives.
  return a >= 0 ? a % b : b - ((-a % b) || b);
}
