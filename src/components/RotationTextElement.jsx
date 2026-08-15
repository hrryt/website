import { trueMod } from "../scripts/utils"
import Equation from "./Equation"

export default function RotationTextElement({ angle }) {

  angle = trueMod(angle, 2*Math.PI)
  angle = Math.round(angle * 180 / Math.PI) // range 0 to 360
  let directionText = ""
  if (Math.abs(angle) == 180) { directionText = "" }
  else { directionText = angle < 180 ? 'clockwise' : 'anticlockwise' }
  angle = angle > 180 ? 360 - angle : angle
  return <span><Equation equation={angle + 'degree'} /> {directionText}</span>
}
