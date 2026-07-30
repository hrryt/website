export const questionWindow = {
  inputs: [{
    id: 'a',
    legend: 'Quadratic Equations: a',
    type: 'multiple-selection',
    values: [1, 2, 3],
  }],
  questionLists: [{
    id: 0,
    n: 10,
    questions: [{
      type: 'quadratic-equation',
      controlledParameters: { a: 'a' },
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
      lockedParameters: { a: 1, factorise: false },
     }]
  }]
}
