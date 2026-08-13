import { getRandomChoice, getRandomInt } from "../../scripts/utils";
import CoordinateLabel from "../graphing/CoordinateLabel";
import Graph from "../graphing/Graph";
import Question from "../Question";

function shapeToString(shape) {
  return shape.map((point) => point.join(",")).join(" ")
}

function reflectPoint(point, line = {a: 1, b: 1, c: 0}) {
  const [px, py] = point
  const k = (line.a*px + line.b*py + line.c) / (line.a**2 + line.b**2)
  return [px - 2*line.a*k, py - 2*line.b*k]
}

function findIntersect(line1, line2) {
  // this condition should work for both bs = 0 too.
  if (line1.a/line1.b == line2.a/line2.b) {
    return null
  }
  return ()
}

export default function DoubleReflectionQuestion({ seed, showAnswer }) {
  const viewBox = [-7, -7, 14, 14]
  const originalShape = [[0, 1], [2, 1], [0, 2]]

  const linetypes = ['horizontal', 'vertical', 'diagonal']



  const question = (<>
    <p>
      What single transformation..?
    </p>
    <Graph viewBox={viewBox} width="300" height="300">
    </Graph>
  </>)

  return <Question question={question} answer="" showAnswer={showAnswer} />
}
