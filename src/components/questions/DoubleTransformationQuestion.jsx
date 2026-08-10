import { getRandomChoice, getRandomInt } from "../../scripts/utils";
import CoordinateLabel from "../graphing/CoordinateLabel";
import Graph from "../graphing/Graph";
import Question from "../Question";

function shapeToString(shape) {
  return shape.map((point) => point.join(",")).join(" ")
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
  const axis1 = [getRandomInt(-3, 3, seed), getRandomInt(-3, 3, seed + .1)]
  const axis2 = [getRandomInt(-3, 3, seed + .2), getRandomInt(-3, 3, seed + .3)]
  const angle = getRandomChoice([Math.PI/2, Math.PI, 3*Math.PI/2], seed + .4)

  // Rotation then translation!. could do other way around if really needed.
  const midShape = originalShape.map((point) => rotatePoint(point, angle, axis1))

  const rotatedAxis = rotatePoint(axis2, angle, axis1)
  const translationVector = axis2.map((value, i) => value - rotatedAxis[i])

  const endShape = midShape.map((point) => point.map((value, i) => value + translationVector[i]))

  const question = (<>
    <p>
      What single transformation..?
    </p>
    <Graph viewBox={viewBox} width="300" height="300">
      <polygon className="color-1" points={shapeToString(originalShape)} />
      <polygon className="color-2" points={shapeToString(midShape)} />
      <polygon className="color-3" points={shapeToString(endShape)} />
      <CoordinateLabel x={axis2[0]} y={axis2[1]} position="top" />
      <CoordinateLabel x={axis1[0]} y={axis1[1]} position="top" />
    </Graph>
  </>)

  return <Question question={question} answer="" showAnswer={showAnswer} />
}
