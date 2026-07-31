import * as React from 'react';

export default function QuestionList({ children }) {
  return (
    <li>
      <ol className="question-list">
        {children}
      </ol>
    </li>
  );
}
