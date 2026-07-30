import * as React from 'react';
import QuestionList from './QuestionList.jsx';
import { getRandomInt, getRandomNumber } from '../scripts/utils.js';

import AddingFractionsQuestion from './questions/AddingFractionsQuestion.jsx';
import QuadraticEquationQuestion from './questions/QuadraticEquationQuestion.jsx';
import Window from './Window.jsx';

function chooseQuestionComponent(type) {
  switch (type) {
    case 'quadratic-equation':
      return QuadraticEquationQuestion;
    case 'adding-fractions':
      return AddingFractionsQuestion;
  }
}

function renderQuestion(seed, showAnswer) {
  return (question, i) => {
    const QuestionComponent = chooseQuestionComponent(question.type);
    return <QuestionComponent key={i} seed={seed+i} showAnswer={showAnswer} parameters={question.parameters || {}} />;
  };
}

function getQuestionList(id, questions, showAnswers, seed) {
  return (
    <QuestionList key={id}>
      {questions.map(renderQuestion(seed, showAnswers))}
    </QuestionList>
  );
}

function shuffleArray(arr, n, seed) {
  const max = arr.length - 1;
  return Array.from({ length: n }).map(() => arr[getRandomInt(0, max, ++seed)]);
}

export default function QuestionWindow({ data }) {
  const [showAnswers, setShowAnswers] = React.useState(false);
  const [seed       , setSeed       ] = React.useState(Math.random());

  function revealAnswers() { setShowAnswers(!showAnswers); }
  function triggerRefresh() { setSeed(getRandomNumber(seed)); }

  let current_seed = seed;
  const questions = data.questionLists.map(questionList => {
    const { id: id, n: n, questions: unique_questions } = questionList;
    const questions = shuffleArray(unique_questions, n, current_seed);
    const randomQuestionList = getQuestionList(id, questions, showAnswers, current_seed);
    current_seed += n;
    return randomQuestionList;
  });

  const formRef = React.useRef();
  function submitForm() { formRef.current.submit(); }
  function handleSubmit(e) { e.preventDefault(); }

  return (
    <Window title="Questions">
      <form ref={formRef} onChange={submitForm} onSubmit={handleSubmit}>
          <fieldset>
            <legend>Options</legend>
            <button onClick={revealAnswers}>
              {showAnswers ? "Hide" : "Show"} Answers
            </button>
            <button onClick={triggerRefresh}>
              Refresh Questions
            </button>
          </fieldset>
        </form>
        <br />
        <div className="field-border kern">
          {questions}
        </div>
    </Window>
  );
}
