import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import TestQuestionPanel from '../components/TestQuestionPanel.jsx';

function renderComponent(id, component) {
  node = document.getElementById(id);
  const root = createRoot(node);
  root.render(createElement(component));
}

renderComponent('test-question-panel', TestQuestionPanel);
