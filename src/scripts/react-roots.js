import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import QuadraticEquationQuestionSet from '../components/QuadraticEquationQuestionSet.jsx';

function renderComponent(id, component) {
  node = document.getElementById(id);
  const root = createRoot(node);
  root.render(createElement(component));
}

renderComponent('quadratic-equation-question-set', QuadraticEquationQuestionSet);
