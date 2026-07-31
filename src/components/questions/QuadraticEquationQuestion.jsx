import * as React from 'react';
import Question from '../Question.jsx';
import { getRandomInt, getRandomBoolean, getRandomChoice, formatNumber } from '../../scripts/utils.js';

function formatQuadraticExpression(a, b, c) {
  const fa = formatNumber(a, showPlus=false, showOne=false, showZero=false, suffix='x^2');
  const fb = formatNumber(b, showPlus=true,  showOne=false, showZero=false, suffix='x');
  const fc = formatNumber(c, showPlus=true,  showOne=true,  showZero=false);
  return `${fa} ${fb} ${fc}`;
}

function formatRoots(root1, root2) {
  const froot2 = formatNumber(root2, showPlus=false, showOne=true, showZero=true);
  if (root1 == root2) { return `x = ${froot2}`; }
  if (Math.abs(root1) == root2) { return `x = plus.minus ${root2}`; }
  const froot1 = formatNumber(root1, showPlus=false, showOne=true, showZero=true);
  return `x = ${froot1} thick "or" thick x = ${froot2}`;
}

function formatFactor(root) {
  if (root == 0) { return "x"; }
  const froot = formatNumber(root, showPlus=true, showOne=true, showZero=false);
  return `(x${froot})`;
}

function sortFactors(root1, root2) {
  if (root1 > 0 && root2 < 0) { return -1; }
  if (root1 < 0 && root2 > 0) { return +1; }
  return Math.abs(root1) - Math.abs(root2);
}

function formatFactors(root1, root2, a) {
  const fa = formatNumber(a, showPlus=false, showOne=false, showZero=true);
  [root1, root2] = [root1, root2].sort(sortFactors);
  const froot2 = formatFactor(root2);
  if (root1 == root2) { return `${fa}${froot2}^2`; }
  const froot1 = formatFactor(root1);
  return `${fa}${froot1}${froot2}`;
}

function getRandomRoots(seed) {
  return [
    getRandomInt(-9, 9, seed),
    getRandomInt(-9, 9, seed + .1),
  ].sort((a, b) => a - b);
}

export default function QuadraticEquationQuestion({ seed, showAnswer, aPlurality, framing }) {
  const aChoices = Array();
  aPlurality.includes("a=1") && aChoices.push(1);
  aPlurality.includes("a>1") && aChoices.push(2, 3);
  const a = getRandomChoice(aChoices, seed);

  const factoriseChoices = Array();
  framing.includes("Solve") && factoriseChoices.push(false);
  framing.includes("Factorise") && factoriseChoices.push(true);
  const factorise = getRandomChoice(factoriseChoices, seed + .1);

  const [root1, root2] = getRandomRoots(seed + .2);

  const b = a * -(root1 + root2);
  const c = a * root1 * root2;

  const quadratic = formatQuadraticExpression(a, b, c);
  question = factorise ? `"Factorise" thick ${quadratic}` : `${quadratic} = 0`;
  const answer = factorise ? formatFactors(root1, root2, a) : formatRoots(root1, root2);

  return <Question question={question} answer={answer} showAnswer={showAnswer} />;
}
