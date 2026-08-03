import * as React from 'react';
import type { Route } from "./+types/home";
import TestQuestionWindow from '../components/TestQuestionWindow.jsx';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "qestion page :)" },
    { name: "description", content: "Nor sure" },
  ];
}

export default function Questions() {
  return <TestQuestionWindow />;
}
