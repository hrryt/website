import Question from '../Question.jsx';
<<<<<<< HEAD
import { getRandomInt, getRandomBoolean, getRandomChoice, formatCoefficient, getHCF } from '../../scripts/utils.js';
=======
import { getRandomInt, getRandomBoolean, getRandomChoice, formatNumber } from '/src/scripts/utils.js';
>>>>>>> 7778bc7 (Add cubic graphing component)

function formatQuadraticExpression(a, b, c) {
  const fa = formatCoefficient(a, { showPlus: false, showOne: false, showZero: false, suffix: 'x^2' });
  const fb = formatCoefficient(b, { showPlus: true, showOne: false, showZero: false, suffix: 'x' });
  const fc = formatCoefficient(c, { showPlus: true, showOne: true, showZero: false });
  return `${fa} ${fb} ${fc}`;
}

function formatFraction(num, denom) {
  const hcf = getHCF(Math.abs(num), Math.abs(denom))
  num = num / hcf
  denom = denom / hcf
  if (denom == 1) { return `${num}`; }
  return `frac(${num}, ${denom})`
}

function formatRoots(l, m, n, o) {
  if (m / l == o / n) { return `x = ${formatFraction(-m, l)}`; }
  if (-m / l == o / n) { return `x = plus.minus ${formatFraction(Math.abs(-m), l)}`; }
  
  return `x = ${formatFraction(-m, l)} "or" x = ${formatFraction(-o, n)}`;
}

function formatFactor(x_coeff, const_coeff) {
  if (const_coeff == 0) { return "x"; }
  const fx_coeff = formatCoefficient(x_coeff, { showPlus: false, showOne: false, showZero: false, suffix: 'x'})
  const fconst_coeff = formatCoefficient(const_coeff, { showPlus: true, showOne: true, showZero: false })
  return `(${fx_coeff}${fconst_coeff})`;
}

function formatFactors(l, m, n, o) {
  if (l == n && m == o) { return `${formatFactor(l, m)}^2`}
  return `${formatFactor(l, m)}${formatFactor(n, o)}`
}

function getRandomRoots(seed) {
  return [
    getRandomInt(-9, 9, seed),
    getRandomInt(-9, 9, seed + .1),
  ].sort((a, b) => a - b);
}

export default function QuadraticEquationQuestion({ seed, showAnswer, aPlurality, framing, cSigns }) {
  // (lx + m)(nx + o)

  const aChoices = Array();
  aPlurality.includes("a=1") && aChoices.push(1);
  aPlurality.includes("a>1") && aChoices.push(2, 3);
  let l = getRandomChoice(aChoices, seed);
  let n = getRandomChoice(aChoices, seed + .1);

  const factoriseChoices = Array();
  framing.includes("Solve") && factoriseChoices.push(false);
  framing.includes("Factorise") && factoriseChoices.push(true);
  const factorise = getRandomChoice(factoriseChoices, seed + .2);

  const cSignChoices = Array();
  cSigns.includes("Positive") && cSignChoices.push(1)
  cSigns.includes("Negative") && cSignChoices.push(-1)

  const mSign = getRandomChoice([-1, 1], seed + .3)
  const cSign = getRandomChoice(cSignChoices, seed + .4)

  let m = getRandomInt(1, 9, seed + .5) * mSign
  let o = getRandomInt(1, 9, seed + .6) * mSign * cSign

  if (-m/l > -o/n) {
    [l, m, n, o] = [n, o, l, m]
  }

  // lnx^2 + (lo + nm)x + mo
  const a = l * n
  const b = (l * o) + (n * m)
  const c = m * o

  const quadratic = formatQuadraticExpression(a, b, c);
  const question = factorise ? `"Factorise" ${quadratic}` : `"Solve" ${quadratic} = 0`;

  const answer = factorise ? formatFactors(l, m, n, o) : formatRoots(l, m, n, o);

  return <Question question={question} answer={answer} showAnswer={showAnswer} />;

}