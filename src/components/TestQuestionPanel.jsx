import * as React from 'react';
import QuestionPanel from './QuestionPanel.jsx';
import { questionLists } from '../data/test-question-panel.js';

export default function TestQuestionPanel() {
  return <QuestionPanel questionLists={questionLists} />;
}
