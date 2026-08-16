import { Route, Switch, Link } from 'wouter-preact';

import QuestionWindow from '../components/QuestionWindow.jsx';

const allQuestions = [{
  id: 'gcse',
  label: 'GCSE',
  questions: [{
    id: 'quadratic-equations',
    label: 'Quadratic Equations'
  }, {
    id: 'adding-fractions',
    label: 'Adding Fractions'
  }, {
    id: 'double-transformations',
    label: 'Double Transformations'
  }]
}, {
  id: 'a-level',
  label: 'A-Level',
  questions: []
}]

function QuestionItem({ id, question }) {
  return (
    <li>
      <Link href={`/questions/${id}/${question.id}`}>
        {question.label}
      </Link>
    </li>
  );
}

function QuestionsItem({ id, label, questions }) {
  return (
    <li>
      <details open>
        <summary>{label}</summary>
        <ul>
          {questions.map(question =>
            <QuestionItem id={id} question={question} />
          )}
        </ul>
      </details>
    </li>
  );
}

const items = allQuestions.map(({ id, label, questions }) =>
  <QuestionsItem id={id} label={label} questions={questions} />
);

const arr = await Promise.all(allQuestions.map(async ({ id, questions }) =>
  await Promise.all(questions.map( async question => {
    const m = await import(`../data/questions/${id}/${question.id}.js`);
    function Component() { return <QuestionWindow data={m.data} title={question.label} />; }
    return <Route path={`/questions/${id}/${question.id}`} component={Component} />;
  }))
));
const routes = arr.flat();

export default function QuestionIndex() {
  return (
    <main>
      <nav class="sidebar">
        <ul class="tree-view">
          {items}
        </ul>
      </nav>
      <Switch>
        {routes}
      </Switch>
    </main>
  );
}
