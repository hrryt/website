import { render } from 'preact';
import { Route, Switch, Link } from 'wouter-preact';
import QuestionCard from './components/QuestionCard.jsx';
import Card from './components/Card.jsx';

import Home from './pages/Home.jsx';
import LatexRenderer from './pages/LatexRenderer.jsx';
import NotFound from './pages/NotFound.jsx';

import './styles/index.css';

const data = import.meta.glob('./*/*.js', {
  eager: true, import: 'data', base: './data/questions'
});

function getHref(path) {
  const relative = path.match(/([^\/]+).js$/)[1];
  return `/questions/${relative}`;
}

const tree = { };
for (const path in data) {
  const category = path.match(/^\.\/(.+)\//)[1];
  tree[category] ??= [];
  tree[category].push({
    href: getHref(path),
    title: data[path].title
  });
}

function getActiveClass(active) {
  return active ? "active" : "";
}

function SidebarLink({ href, title, children }) {
  return (
    <li>
      <Link href={href} className={getActiveClass}>
        {title}
      </Link>
      {children}
    </li>
  );
}

function SidebarQuestionCategory({ categoryName, categoryList }) {
  const questionLinks = categoryList.map(c => <SidebarLink href={c.href} title={c.title} />);
  return (
    <li>
      <details open>
        <summary>{categoryName}</summary>
        <ul>
          {questionLinks}
        </ul>
      </details>
    </li>
  );
}

const sidebarQuestions = Object.keys(tree).map(categoryName => {
  return <SidebarQuestionCategory categoryName={categoryName} categoryList={tree[categoryName]} />;
});

const questionRoutes = Object.keys(data).map(path => {
  return <Route path={getHref(path)}><QuestionCard data={data[path]} /></Route>;
})

function Sidebar() {
  return (
    <nav id="sidebar">
      <ul>
        <SidebarLink href="/" title="Home" />
        <SidebarLink href="/questions" title="Questions">
          <Route path="/questions/*?">
            <ul>
              {sidebarQuestions}
            </ul>
          </Route>
        </SidebarLink>
        <SidebarLink href="/renderer" title="LaTeX Renderer" />
      </ul>
		</nav>
	);
}

function QuestionIndex() {
  return (
    <Card title="Questions">
      <nav class="index">
        <ul>
          {sidebarQuestions}
        </ul>
      </nav>
    </Card>
  );
}

export function App() {
  return (
    <>
      <header>
        <a id="logo" href="/"><h1>TTMaths</h1></a>
        <span id="tagline">resources for learning</span>
      </header>
      <div id="sidebar-and-main">
        <Sidebar />
        <main>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/questions" component={QuestionIndex} />
            <Route path="/questions/*">
              {questionRoutes}
            </Route>
            <Route path="/renderer" component={LatexRenderer} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </>
  );
}

render(<App />, document.getElementById('app'));
