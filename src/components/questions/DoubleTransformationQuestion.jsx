import { getRandomChoice, getRandomInt } from "../../scripts/utils";
import CoordinateLabel from "../graphing/CoordinateLabel";
import Graph from "../graphing/Graph";
import Question from "../Question";

function pointToString(point) {
  return point[0].toString() + ',' + point[1].toString()
}

function shapeToString(shape) {
  console.log(shape.map((point) => pointToString(point)).join(" "))
  return shape.map((point) => pointToString(point)).join(" ")
}

function rotatePoint(point, angle, axis=[0, 0]) {
  const diff = [point[0] - axis[0], point[1] - axis[1]]
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return [axis[0] + c*diff[0] + s*diff[1], axis[1] + c*diff[1] - s*diff[0]]
}


export default function DoubleTransformationQuestion({ seed, showAnswer }) {
  const viewBox = [-7, -7, 14, 14]
  const originalShape = [[0, 1], [2, 1], [0, 2]]
  const axis = [getRandomInt(-3, 3, seed), getRandomInt(-3, 3, seed + .1)]
  const angle = getRandomChoice([Math.PI/2, Math.PI, 3*Math.PI/2], seed + .2)

  // Rotation then translation!. could do other way around if really needed.
  const midShape = originalShape.map((point) => rotatePoint(point, angle))

  const rotatedAxis = rotatePoint(axis, angle)
  const translationVector = axis.map((value, i) => value - rotatedAxis[i])

  const endShape = midShape.map((point) => point.map((value, i) => value + translationVector[i]))


  const question = (<>
    <p>What single transformation..?</p>
    <Graph viewBox={viewBox} width="300" height="300">
      <polygon points={shapeToString(originalShape)} />
      <polygon points={shapeToString(midShape)} />
      <polygon points={shapeToString(endShape)} />
      <CoordinateLabel x={axis[0]} y={axis[1]} position="top" />
    </Graph>
  </>)

  return <Question question={question} answer="" showAnswer={showAnswer} />
}