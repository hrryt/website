import { getHCF, simplifyFraction } from './mathsUtils'

export function formatCoefficient(x, parameters = { showPlus: false, showOne: true, showZero: true, suffix: '' }) {
  if (!parameters.showZero && x == 0) { return ''; }
  const plus = parameters.showPlus ? '+' : '';
  const sign = x < 0 ? '-' : plus;
  x = Math.abs(x);
  parameters.showOne || x == 1 && (x = '');
  parameters.suffix || (parameters.suffix = '') // if suffix undefined
  return sign + x + parameters.suffix;
}

// this thing is probably begging for bugs from simplification and zeroes.
export function formatFraction(num, denom, parameters = { showPlus: false, showOne: true, showZero: true, simplify: false, suffix: '' }) {
  if (!parameters.showZero && num == 0) { return ''; }
  if (getHCF(num, denom) == denom && parameters.simplify) { return formatCoefficient(simplifyFraction(num, denom)[0], parameters)}
  const [numOriginal, denomOriginal] = [num, denom]
  const plus = parameters.showPlus ? '+' : ''
  const sign = num / denom < 0 ? '-' : plus

  num = Math.abs(num)
  denom = Math.abs(denom);
  [num, denom] = parameters.simplify ? simplifyFraction(num, denom) : [num, denom]
  parameters.suffix || (parameters.suffix = '')

  let x = `frac(${num}, ${denom})`
  parameters.showOne || num / denom == 1 && (x = '');
  return sign + x + parameters.suffix
}

export function formatLine(line) {
  if (line.b == 0) { return `x = ${formatFraction(-line.c, line.a, { showPlus: false, showOne: true, showZero: true, simplify: true })}`; }
  let mxTerm = formatFraction(-line.a, line.b, { showPlus: false, showOne: false, showZero: false, simplify: true, suffix: 'x' })
  const cTerm = formatFraction(-line.c, line.b, { showPlus: false, showOne: true, showZero: false, simplify: true })
  if (!mxTerm && !cTerm) {
    mxTerm = '0'
  }
  return 'y = ' + mxTerm + cTerm
}
