import { render } from 'preact';
import { Route, Switch } from 'wouter-preact';

import Header from './components/Header.jsx';

import Home from './pages/Home.jsx';
import QuestionIndex from './pages/QuestionIndex.jsx';
import NotFound from './pages/NotFound.jsx';

import './styles/index.css';

export function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/questions" component={QuestionIndex} />
        <Route path="/questions/*" component={QuestionIndex} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

render(<App />, document.getElementById('app'));
