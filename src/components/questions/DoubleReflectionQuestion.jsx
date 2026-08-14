import { formatLine, getRandomChoice, getRandomInt } from "../../scripts/utils";
import Plot from "../plotting/Plot";
import Line from "../plotting/Line";
import Polygon from "../plotting/Polygon";
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
  const k = line1.a*line2.b - line2.a*line1.b
  // parallel
  if (k == 0) {
    return null
  }
  return [(line1.c*line2.b - line2.c*line1.b) / k, (line1.a*line2.c - line2.a*line1.c) / k]
}

function randomLine(seed, lineType, excludedLine = {a: 100, b: 100, c: 100}) {
  let f = (seed) => {return {a: 0, b: 1, c: 1}}
  switch (lineType) {
    case 'horizontal':
      f = (seed) => {return {a: 0, b: 1, c: getRandomInt(-3, 3, seed)}}
      break
    case 'vertical':
      f = (seed) => {return {a: 1, b: 0, c: getRandomInt(-3, 3, seed)}}
      break
    case 'diagonal':
      f = (seed) => {return {a: 1, b: getRandomChoice([-1, 1], seed), c: 0}}
      break
  }
  
  let output = excludedLine
  while (output.a == excludedLine.a && output.b == excludedLine.b && output.c == excludedLine.c) {
    output = f(seed++)
  }
  return output
}

export default function DoubleReflectionQuestion({ seed, showAnswer }) {
  const viewBox = [-7, -7, 14, 14]
  const originalShape = [[0, 1], [2, 1], [0, 2]]

  const lineTypes = ['horizontal', 'vertical', 'diagonal']
  const line1Type = getRandomChoice(lineTypes, seed++)
  const line2Type = getRandomChoice(lineTypes, seed++)

  const line1 = randomLine(seed++, line1Type)
  const line2 = randomLine(seed++, line2Type, line1)
  
  const question = (<>
    <p>
      Reflect in {formatLine(line1)} then {formatLine(line2)}. What single transformation describes this?
    </p>
    <Plot viewBox={viewBox} width="300" height="300">
      <Polygon points={originalShape} label="P" colour="1" />
      <Line line={line1} colour="2" viewBox={viewBox} />
      <Line line={line2} colour="3" viewBox={viewBox} />
    </Plot>
  </>)

  const intersect = findIntersect(line1, line2)
  let answer = ""
  if (intersect === null) { // translation

  } else { // rotation 180
  }


  return <Question question={question} answer={answer} showAnswer={showAnswer} />
}
