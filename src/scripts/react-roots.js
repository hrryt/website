import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import App from '../components/App.jsx';

function renderComponent(id, component) {
  node = document.getElementById(id);
  const root = createRoot(node);
  root.render(createElement(component));
}

renderComponent('app', App);
