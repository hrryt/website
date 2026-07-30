export const questionPanel = {
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
      lockedParameters: { factorise: false },
    }, {
      type: 'adding-fractions',
    }]
  }]
}
