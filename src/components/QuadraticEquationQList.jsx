import * as React from 'react';
import QList from './QList.jsx';
import QuadraticEquationQItem from './QuadraticEquationQItem.jsx';
import { RefreshContext } from '../scripts/contexts.js';

function getRandomInt(min, range) {
  return min + Math.floor(range * Math.random());
}

function getRandomRoots() {
  return [getRandomInt(-9, 19), getRandomInt(-9, 19)].sort((a, b) => a - b);
}

function getUniqueRoots(n) {
  const listRoots = Array();
  
  for (let i = 0; i < n; i++) {
    roots = getRandomRoots();
    while (listRoots.some((v, i) => v[0] == roots[0] && v[1] == roots[1])) {
      roots = getRandomRoots();
    }
    listRoots.push(roots);
  }

  return listRoots;
}

export default function QuadraticEquationQList({ n, a = 1 }) {
  const [listRoots, setListRoots] = React.useState(getUniqueRoots(10));
  const refresh = React.useContext(RefreshContext);

  React.useEffect(() => {
    setListRoots(getUniqueRoots(10));
  }, [refresh]);

  return (
    <QList>
      {Array.from({ length: n }).map((v, i) => {
        return <QuadraticEquationQItem roots={listRoots[i]} a={a} />;
      })}
    </QList>
  );
}
