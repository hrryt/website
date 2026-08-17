import { Route, Switch, Link } from 'wouter-preact';
import QuestionWindow from '../components/QuestionWindow.jsx';
const data = import.meta.glob('./*/*.js', {
  eager: true, import: 'data', base: '../data/questions'
});

function getHref(path) {
  const relative = path.match(/\.\/(.+).js/)[1];
  return `/questions/${relative}`;
}

function QuestionLink({ href, title }) {
  return (
    <li>
      <Link href={href}>
        {title}
      </Link>
    </li>
  );
}

const tree = { };
for (const path in data) {
  const category = path.match(/^\.\/(.+)\//)[1];
  tree[category] ??= [];
  tree[category].push(
    <QuestionLink href={getHref(path)} title={data[path].title} />
  );
}

function Category({ category, questionLinks }) {
  return (
    <li>
      <details open>
        <summary>{category}</summary>
        <ul>
          {questionLinks}
        </ul>
      </details>
    </li>
  );
}

const categories = Object.keys(tree).map(category =>
  <Category category={category} questionLinks={tree[category]} />
);

const routes = Object.keys(data).map(path => {
  function Component() { return <QuestionWindow data={data[path]} />; }
  return <Route path={getHref(path)} component={Component} />;
})

export default function QuestionIndex() {
  return (
    <main>
      <nav class="sidebar">
        <ul class="tree-view">
          {categories}
        </ul>
      </nav>
      <Switch>
        {routes}
      </Switch>
    </main>
  );
}
