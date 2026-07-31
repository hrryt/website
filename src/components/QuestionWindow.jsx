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

function resolveParameters(question, variables) {
  const parameters = question.constants || { };
  const variableKeys = question.variables || { };
  Object.keys(variableKeys).forEach((key) => {
    parameters[key] = variables[variableKeys[key]];
  })
  return parameters;
}

function renderQuestion(seed, showAnswer, variables) {
  return (question, i) => {
    const QuestionComponent = chooseQuestionComponent(question.type);
    const parameters = resolveParameters(question, variables);
    return <QuestionComponent key={i} seed={seed+i} showAnswer={showAnswer} {...parameters} />;
  };
}

function getQuestionList(id, questions, showAnswers, seed, variables) {
  return (
    <QuestionList key={id}>
      {questions.map(renderQuestion(seed, showAnswers, variables))}
    </QuestionList>
  );
}

function shuffleArray(arr, n, seed) {
  return Array.from({ length: n }).map(() => getRandomChoice(arr, ++seed));
}

export default function QuestionWindow({ data }) {

  defaultVariables = Object.fromEntries(
    data.variables.map(input => [input.id, input.default ?? input.values])
  );

  const [showAnswers, setShowAnswers] = React.useState(false);
  const [seed       , setSeed       ] = React.useState(Math.random());
  const [variables  , setVariables  ] = React.useState(defaultVariables);

  function setVariable(id) {
    return (value) => {
      setVariables({
        ...variables,
        [id]: value
      });
    }
  }

  function revealAnswers() { setShowAnswers(!showAnswers); }
  function triggerRefresh() { setSeed(getRandomNumber(seed)); }

  let current_seed = seed;
  const questions = data.questionLists.map(questionList => {
    const { id: id, n: n, questions: unique_questions } = questionList;
    const questions = shuffleArray(unique_questions, n, current_seed);
    const randomQuestionList = getQuestionList(id, questions, showAnswers, current_seed, variables);
    current_seed += n;
    return randomQuestionList;
  });

  const fields = data.variables.map(input => {
    const { type: type, ...props } = input;
    const InputComponent = chooseInputComponent(type);
    return <InputComponent key={input.id} variable={variables[input.id]} setVariable={setVariable(input.id)} {...props} />;
  });

  return (
    <Window title="Questions">
      {fields}
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
