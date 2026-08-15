import { getColourClass } from "../../scripts/graphUtils"

export default function Line({ line, viewBox, label=null, colour='auto' }) { 
  const [ minX, minY, width, height ] = viewBox
  const maxX = minX + width
  const maxY = minY + height

  const xPairs = [minX, maxX].map((x) => [x, (-line.c - line.a*x)/line.b])
  const yPairs = [minY, maxY].map((y) => [(-line.c - line.b*y)/line.a, y])

  // important to do this for straight (y = c or x = c) lines.
  let points = []
  xPairs.map((point) => { (point[1] >= minY && point[1] <= maxY) && points.push(point) })
  yPairs.map((point) => { (point[0] > minX && point[0] < maxX) && points.push(point) })

  // points will always be two.
  const [i, f] = points
  return <line x1={i[0]} y1={i[1]} x2={f[0]} y2={f[1]} class={getColourClass(colour)} />
}
