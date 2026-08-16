import { lazy, Router, Route } from 'preact-iso';
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
      <a href={`/questions/${id}/${question.id}`}>
        {question.label}
      </a>
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

const routes = allQuestions.flatMap(({ id, questions }) => questions.map(question => {
  const Component = lazy(() =>
    import(`../data/questions/${id}/${question.id}.js`).then(m =>
      () => <QuestionWindow data={m.data} title={question.label} />
    )
  );
  return <Route path={`/${id}/${question.id}`} component={Component} />;
}));

export default function QuestionIndex() {
  return (
    <main>
      <nav class="sidebar">
        <ul class="tree-view">
          {items}
        </ul>
      </nav>
      <Router>
        {routes}
      </Router>
    </main>
  );
}
