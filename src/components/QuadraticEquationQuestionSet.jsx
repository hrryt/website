import * as React from 'react';
import QList from './QList.jsx';
import QuadraticEquationQList from './QuadraticEquationQList.jsx';

export default function QuadraticEquationQuestionSet() {
  return (
    <QList>
      <QuadraticEquationQList n="5" />
      <QuadraticEquationQList n="6" a="2" />
      <QuadraticEquationQList n="7" a="3" />
      <QuadraticEquationQList n="5" a="4" />
    </QList>
  );
}
