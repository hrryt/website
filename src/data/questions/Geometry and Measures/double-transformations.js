import DoubleReflectionQuestion from "../../../components/questions/DoubleReflectionQuestion";
import RotationTranslationQuestion from "../../../components/questions/RotationTranslationQuestion";

export const data = {
  title: 'Double Transformations',
  questionLists: [{
    id: 0,
    n: 3,
    questions: [{
      type: RotationTranslationQuestion,
    },
    {
      type: DoubleReflectionQuestion,
    }]
  }]
}
