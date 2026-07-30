import * as React from 'react';
import Equation from './Equation.jsx';

export default function Question({ question, answer, showAnswer }) {
  return (
    <li>
      <Equation equation={showAnswer ? answer : question} />
    </li>
  );
}
