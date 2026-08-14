import { getRandomChoice, getRandomInt } from "../../scripts/utils";
import Point from "../plotting/Point";
import Polygon from "../plotting/Polygon";
import Plot from "../plotting/Plot";
import Question from "../Question";
import Equation from "../Equation";

function rotatePoint(point, angle, axis=[0, 0]) {
  const diff = [point[0] - axis[0], point[1] - axis[1]]
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return [axis[0] + c*diff[0] + s*diff[1], axis[1] + c*diff[1] - s*diff[0]]
}

export default function RotationTranslationQuestion({ seed, showAnswer }) {
  const viewBox = [-7, -7, 14, 14]
  const originalShape = [[0, 1], [2, 1], [0, 2]]
  const axis1 = [getRandomInt(-3, 3, seed++), getRandomInt(-3, 3, seed++)]
  let axis2 = axis1;
  while (axis2.every((x, i) => x === axis1[i])) {
    axis2 = [getRandomInt(-3, 3, seed++), getRandomInt(-3, 3, seed++)]
  }
  const angleDegrees = getRandomChoice([90, 180, -90], seed++)
  const angle = angleDegrees / 180 * Math.PI

  // Rotation then translation!. could do other way around if really needed.
  const midShape = originalShape.map((point) => rotatePoint(point, angle, axis1))

  const rotatedAxis = rotatePoint(axis2, angle, axis1)
  const translationVector = axis2.map((value, i) => Math.round(value - rotatedAxis[i]))

  const endShape = midShape.map((point) => point.map((value, i) => value + translationVector[i]))

  let angleDirection = ""
  if (angleDegrees !== 180) {
    if (angleDegrees < 0) {
      angleDirection = "counterclockwise"
    } else {
      angleDirection = "clockwise"
    }
  }

  const angleExpression = (
    <span>
      <Equation equation={`${Math.abs(angleDegrees)} degree`} /> {angleDirection}
    </span>
  )

  const question = (<>
    <p>Shape P is rotated {angleExpression} about point Q to form shape R.</p>
    <p>Shape R is translated by <Equation equation={`vec(${translationVector[0]}, ${translationVector[1]})`} /> to form shape S.</p>
    <p>What single transformation maps shape P onto shape S?</p>
    <Plot viewBox={viewBox}>
      <Polygon points={originalShape} label="P" colour="1" />
      <Point   point={         axis1} label="Q" colour="2" />
    </Plot>
  </>)

  const answer = (<>
    <p>Rotation {angleExpression} about <Equation equation={`(${axis2[0]}, ${axis2[1]})`} />.</p>
    <Plot viewBox={viewBox}>
      <Polygon points={originalShape} label="P" colour="1" />
      <Point   point={         axis1} label="Q" colour="2" />
      <Polygon points={     midShape} label="R" colour="2" />
      <Polygon points={     endShape} label="S" colour="3" />
      <Point   point={         axis2} colour="3" />
    </Plot>
  </>)

  return <Question question={question} answer={answer} showAnswer={showAnswer} />
}
