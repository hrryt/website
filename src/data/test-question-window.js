export const questionWindow = {
  variables: [{
    id: 'framing',
    legend: 'Quadratic Equations: Framing',
    type: 'multiple-selection',
    values: ["Solve", "Factorise"],
  }, {
    id: 'aPlurality',
    legend: 'Quadratic Equations: Coefficient a',
    type: 'multiple-selection',
    values: ["a=1", "a>1"],
  }],
  questionLists: [{
    id: 0,
    n: 10,
    questions: [{
      type: 'quadratic-equation',
      variables: { aPlurality: 'aPlurality', framing: 'framing' },
    }]
  }, {
    id: 1,
    n: 5,
    questions: [{
      type: 'adding-fractions',
    }]
  }]
}
