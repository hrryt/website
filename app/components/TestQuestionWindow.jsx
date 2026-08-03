import * as React from 'react';
import QuestionWindow from './QuestionWindow.jsx';
import { questionWindow } from '../data/test-question-window.js';

export default function TestQuestionPanel() {
  return <QuestionWindow data={questionWindow} />;
}
