export const questionWindow = {
  inputs: [{
    id: 'aPlurality',
    legend: 'Quadratic Equations: a',
    type: 'multiple-selection',
    values: ["a=1", "a>1"],
  }],
  questionLists: [{
    id: 0,
    n: 10,
    questions: [{
      type: 'quadratic-equation',
      controlledParameters: { aPlurality: 'aPlurality' },
    }]
  }, {
    id: 1,
    n: 5,
    questions: [{
      type: 'adding-fractions',
    }]
  }, {
    id: 2,
    n: 5,
    questions: [{
      type: 'quadratic-equation',
      lockedParameters: { aPlurality: ["a=1"], factorise: false },
     }]
  }]
}
