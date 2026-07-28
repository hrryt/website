import * as React from 'react';
import { QListContext, ShowAnswerContext, RefreshContext } from '../scripts/contexts.js';

function QuestionSet({ children }) {
  const [showAnswers, setShowAnswers] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  function revealAnswers() { setShowAnswers(!showAnswers) };
  function triggerRefresh() { setRefresh(!refresh) };
  
  return (
    <div className="QuestionSet">
      <div className="ButtonPanel">
        <button className="reveal-button" onClick={revealAnswers}>
          {showAnswers ? "Hide" : "Show"} Answers
        </button>
        <button className="refresh-button" onClick={triggerRefresh}>
          Refresh Questions
        </button>
      </div>
      <ShowAnswerContext value={showAnswers}>
        <RefreshContext value={refresh}>
          {children}
        </RefreshContext>
      </ShowAnswerContext>
    </div>
  );
}

export default function QList({ children }) {
  const inQList = React.useContext(QListContext);
  
  const list = (
    <ol className={"QList" + (inQList ? " QListInner" : " QListOuter")}>
      <QListContext value="true">
        {children}
      </QListContext>
    </ol>
  );

  return inQList ? <li>{list}</li> : <QuestionSet>{list}</QuestionSet>;
}
