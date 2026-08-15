import { formatLine, getRandomChoice, getRandomInt } from "../../scripts/utils";
import Plot from "../plotting/Plot";
import Line from "../plotting/Line";
import Polygon from "../plotting/Polygon";
import Question from "../Question";
import Point from "../plotting/Point";
import Equation from "../Equation";
import RotationTextElement from "../RotationTextElement";

function shapeToString(shape) {
  return shape.map((point) => point.join(",")).join(" ")
}

function reflectPoint(point, line = {a: 1, b: 1, c: 0}) {
  const [px, py] = point
  const k = (line.a*px + line.b*py + line.c) / (line.a**2 + line.b**2)
  return [px - 2*line.a*k, py - 2*line.b*k]
}

function getLineAngle(line) {
  // gradient is -b/a. need -arctan(b/a)
  return -Math.atan(line.b/line.a)
}

function rotationText(angle) {
  angle = ((angle + Math.PI) % 2*Math.PI) - Math.PI // range -pi to pi
  angle = Math.round(angle * 180 / Math.PI)
  if (angle == 0) { return '180degree' }
  if (angle < 0) { return `${-angle}degree anticlockwise`}
  return `${angle}degree clockwise`
}

function findIntersect(line1, line2) {
  const k = line1.a*line2.b - line2.a*line1.b
  // parallel
  if (k == 0) {
    return null
  }
  return [(line2.c*line1.b - line1.c*line2.b) / k, (line2.a*line1.c - line1.a*line2.c) / k]
}

function randomLine(seed, lineType, excludedLine = {a: 100, b: 100, c: 100}) {
  let f = (seed) => {return {a: 0, b: 1, c: 1}}
  switch (lineType) {
    case 'horizontal':
      f = (seed) => {return {a: 0, b: 1, c: getRandomInt(-2, 2, seed)}}
      break
    case 'vertical':
      f = (seed) => {return {a: 1, b: 0, c: getRandomInt(-2, 2, seed)}}
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
      Reflect P in <Equation equation={formatLine(line1)} /> then <Equation equation={formatLine(line2)} />.
    </p>
    <p>  
      What single transformation describes this?
    </p>
    <Plot viewBox={viewBox} width="300" height="300">
      <Polygon points={originalShape} label="P" colour="1" />
      <Line line={line1} colour="2" viewBox={viewBox} />
      <Line line={line2} colour="3" viewBox={viewBox} />
    </Plot>
  </>)

  const midShape = originalShape.map((point) => reflectPoint(point, line1))
  const endShape = midShape.map((point) => reflectPoint(point, line2))

  const intersect = findIntersect(line1, line2)
  let answerTextElement = <></>
  let answerGraphElement = <></>
  if (intersect === null) { // translation, lines parallel
    const xTrans = 2*(line1.c*line1.a - line2.c*line2.a)
    const yTrans = 2*(line1.c*line1.b - line2.c*line2.b)
    answerTextElement = <p>Translation by vector <Equation equation={`vec(${xTrans}, ${yTrans})`} /></p>
  } else { // rotation
    const angle = 2*(getLineAngle(line2) - getLineAngle(line1))
    answerTextElement = <p>Rotation <RotationTextElement angle={angle} /> about <Equation equation={`(${intersect[0]}, ${intersect[1]})`} /></p>
    answerGraphElement = <Point point={intersect} />
  }
  const answer = (<>
    {answerTextElement}
    <Plot viewBox={viewBox} width="300" height="300">
      <Polygon points={originalShape} label="P" colour="1" />
      <Polygon points={midShape} label="Q" colour="2" />
      <Polygon points={endShape} label="R" colour="3" />
      <Line line={line1} colour="2" viewBox={viewBox} />
      <Line line={line2} colour="3" viewBox={viewBox} />
      {answerGraphElement}
    </Plot>
  </>)

  return <Question question={question} answer={answer} showAnswer={showAnswer} />
}

