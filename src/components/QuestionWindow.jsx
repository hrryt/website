import * as React from 'react';
import QuestionList from './QuestionList.jsx';
import { getRandomInt, getRandomNumber, getRandomChoice } from '../scripts/utils.js';

import MultipleSelection from './MultipleSelection';

import AddingFractionsQuestion from './questions/AddingFractionsQuestion.jsx';
import QuadraticEquationQuestion from './questions/QuadraticEquationQuestion.jsx';
import Window from './Window.jsx';

function chooseInputComponent(type) {
  switch (type) {
    case 'multiple-selection':
      return MultipleSelection;
  }
}

function chooseQuestionComponent(type) {
  switch (type) {
    case 'quadratic-equation':
      return QuadraticEquationQuestion;
    case 'adding-fractions':
      return AddingFractionsQuestion;
  }
}

function getFormValue(id, formData) {
  // TODO: Implement
  return ["a=1"];
}

function resolveParameters(question, formData) {
  const parameters = question.lockedParameters || { };
  const controlledParameters = question.controlledParameters || { };
  Object.keys(controlledParameters).forEach((key) => {
    parameters[key] = getFormValue(controlledParameters[key], formData);
  })
  return parameters;
}

function renderQuestion(seed, showAnswer, formData) {
  return (question, i) => {
    const QuestionComponent = chooseQuestionComponent(question.type);
    const parameters = resolveParameters(question, formData);
    return <QuestionComponent key={i} seed={seed+i} showAnswer={showAnswer} parameters={parameters} />;
  };
}

function getQuestionList(id, questions, showAnswers, seed, formData) {
  return (
    <QuestionList key={id}>
      {questions.map(renderQuestion(seed, showAnswers, formData))}
    </QuestionList>
  );
}

function shuffleArray(arr, n, seed) {
  return Array.from({ length: n }).map(() => getRandomChoice(arr, ++seed));
}

export default function QuestionWindow({ data }) {
  const [showAnswers, setShowAnswers] = React.useState(false);
  const [seed       , setSeed       ] = React.useState(Math.random());
  const [formData   , setFormData   ] = React.useState({ });

  function revealAnswers() { setShowAnswers(!showAnswers); }
  function triggerRefresh() { setSeed(getRandomNumber(seed)); }

  let current_seed = seed;
  const questions = data.questionLists.map(questionList => {
    const { id: id, n: n, questions: unique_questions } = questionList;
    const questions = shuffleArray(unique_questions, n, current_seed);
    const randomQuestionList = getQuestionList(id, questions, showAnswers, current_seed, formData);
    current_seed += n;
    return randomQuestionList;
  });

  const fields = data.inputs.map(input => {
    const { type: type, ...props } = input;
    const InputComponent = chooseInputComponent(type);
    return <InputComponent {...props} />;
  });

  function updateFormData(e) {
    const newFormData = new FormData(e.currentTarget);
    setFormData(Object.fromEntries(newFormData.entries()));
  }

  return (
    <Window title="Questions">
      <form onChange={updateFormData}>
        {fields}
      </form>
      <fieldset>
        <legend>Options</legend>
        <button onClick={revealAnswers}>
          {showAnswers ? "Hide" : "Show"} Answers
        </button>
        <button onClick={triggerRefresh}>
          Refresh Questions
        </button>
      </fieldset>
      <div className="field-border question-field kern">
        <ol className="master-question-list">
          {questions}
        </ol>
      </div>
    </Window>
  );
}
