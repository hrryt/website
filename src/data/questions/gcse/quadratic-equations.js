import QuadraticEquationQuestion from '/src/components/questions/QuadraticEquationQuestion.jsx';
import MultipleSelection from '/src/components/MultipleSelection.jsx';

export const data = {
  variables: [{
    id: 'framing',
    legend: 'Framing',
    type: MultipleSelection,
    values: ["Solve", "Factorise"],
  }, {
    id: 'aPlurality',
    legend: 'Coefficient a',
    type: MultipleSelection,
    values: ["a=1", "a>1"],
  }],
  questionLists: [{
    id: 0,
    n: 10,
    questions: [{
      type: QuadraticEquationQuestion,
      variables: { aPlurality: 'aPlurality', framing: 'framing' },
    }]
  }]
}
