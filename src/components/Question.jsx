import Equation from './Equation.jsx';

function maybeEquation(expression) {
  if (typeof expression == 'string') { return <Equation equation={expression} />; }
  return expression;
}

export default function Question({ question, answer, showAnswer }) {
  return (
    <li>
      {maybeEquation(showAnswer ? answer : question)}
    </li>
  );
}
