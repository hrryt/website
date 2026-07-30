import * as React from 'react';
import QuestionPanel from './QuestionPanel.jsx';
import { questionPanel } from '../data/test-question-panel.js';

export default function TestQuestionPanel() {
  return <QuestionPanel data={questionPanel} />;
}
