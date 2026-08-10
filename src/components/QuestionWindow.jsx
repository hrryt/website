import { useState } from 'preact/hooks';
import QuestionList from './QuestionList.jsx';
import { getRandomInt, getRandomNumber, getRandomChoice } from '../scripts/utils.js';
import Window from './Window.jsx';

const seedDiff = 100;

function resolveParameters(question, variables) {
  const parameters = question.constants ?? { };
  const variableKeys = question.variables ?? { };
  Object.keys(variableKeys).forEach((key) => {
    parameters[key] = variables[variableKeys[key]];
  })
  return parameters;
}

function renderQuestion(seed, showAnswer, variables) {
  return (question, i) => {
    const QuestionComponent = question.type;
    const parameters = resolveParameters(question, variables);
    return <QuestionComponent key={i} seed={seed+seedDiff*i} showAnswer={showAnswer} {...parameters} />;
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

export default function QuestionWindow({ data, title }) {

  const dataVariables = data.variables ?? [];

  const defaultVariables = Object.fromEntries(
    dataVariables.map(input => [input.id, input.default ?? input.values])
  );

  const [showAnswers, setShowAnswers] = useState(false);
  const [seed       , setSeed       ] = useState(Math.random());
  const [variables  , setVariables  ] = useState(defaultVariables);

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
    current_seed += seedDiff * n;
    return randomQuestionList;
  });

  const fields = dataVariables.map(input => {
    const { type: InputComponent, ...props } = input;
    return <InputComponent key={input.id} variable={variables[input.id]} setVariable={setVariable(input.id)} {...props} />;
  });

  return (
    <Window title={title}>
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
      <div class="field-border question-field kern">
        <ol class="master-question-list">
          {questions}
        </ol>
      </div>
    </Window>
  );
}
