import * as React from 'react';
import QItem from './QItem.jsx';

function formatNumber(x, showPlus, showOne, showZero, suffix='') {
  if (!showZero && x == 0) { return ''; }
  plus = showPlus ? '+' : '';
  sign = x < 0 ? '-' : plus;
  x = Math.abs(x);
  showOne || x == 1 && (x = '');
  return sign + x + suffix;
}

function formatQuadraticEquation(a, b, c) {
  const fa = formatNumber(a, showPlus=false, showOne=false, showZero=false, suffix='x^2');
  const fb = formatNumber(b, showPlus=true,  showOne=false, showZero=false, suffix='x');
  const fc = formatNumber(c, showPlus=true,  showOne=true,  showZero=false);
  return `${fa} ${fb} ${fc} = 0`;
}

function formatRoots(root1, root2) {
  const froot2 = formatNumber(root2, showPlus=false, showOne=true, showZero=true);
  if (root1 == root2) { return `x = ${froot2}`; }
  if (Math.abs(root1) == root2) { return `x = plus.minus ${root2}`; }
  const froot1 = formatNumber(root1, showPlus=false, showOne=true, showZero=true);
  return `x = ${froot1} thick "or" thick x = ${froot2}`;
}

function getQuadraticEquation(root1, root2, a) {
  const b = a * -(root1 + root2);
  const c = a * root1 * root2;

  const equation = formatQuadraticEquation(a, b, c);
  const roots = formatRoots(root1, root2);

  return [equation, roots];
}

export default function QuadraticEquationQItem({ roots, a = 1 }) {
  const [question, answer] = getQuadraticEquation(roots[0], roots[1], a);
  return <QItem question={question} answer={answer} />;
}
