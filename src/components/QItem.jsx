import * as React from 'react';
import Equation from './Equation.jsx';
import { ShowAnswerContext, QListContext } from '../scripts/contexts.js';

export default function QItem({ question, answer }) {
  const showAnswer = React.useContext(ShowAnswerContext);
  const inQList = React.useContext(QListContext);

  const item = (
    <div className="QItem">
      <div className="Question">
        <Equation equation={question} />
      </div>
      <div className={"Answer" + (showAnswer ? "" : " AnswerInvisible")}>
        <Equation equation={answer} />
      </div>
    </div>
  );

  return inQList ? <li>{item}</li> : item;
}
