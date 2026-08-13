import Question from '../Question.jsx';
import { getRandomInt, getHCF } from '../../scripts/utils.js';

function formatFraction(num, denom) {
  if (denom == 1) { return `${num}`; }
  return num + '/' + denom;
}

function simplifyFraction(num, denom) {
  const hcf = getHCF(num, denom);
  return [num / hcf, denom / hcf];
}

function getRandomFraction(seed) {
  const num0 = getRandomInt(1, 5, seed++);
  const denom0 = getRandomInt(2, 10, seed++);
  const [num, denom] = simplifyFraction(num0, denom0);
  if (denom == 1) { return getRandomFraction(seed++); }
  return [num, denom];
}

function getRandomFractions(seed) {
  const [num1, denom1] = getRandomFraction(seed++);
  const [num2, denom2] = getRandomFraction(seed++);
  return [num1, denom1, num2, denom2];
}

export default function AddingFractionsQuestion({ seed, showAnswer }) {
  const [num1, denom1, num2, denom2] = getRandomFractions(seed++);

  const question = formatFraction(num1, denom1) + ' + ' + formatFraction(num2, denom2);

  const hcf = getHCF(denom1, denom2);
  const sum = (num1 * denom2 + num2 * denom1) / hcf;
  const lcm = denom1 * denom2 / hcf;
  const [num, denom] = simplifyFraction(sum, lcm);

  const answer = formatFraction(num, denom);

  return <Question question={question} answer={answer} showAnswer={showAnswer} />;
}
