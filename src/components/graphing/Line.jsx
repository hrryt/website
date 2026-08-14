import { getColourClass } from "../../scripts/utils"

export default function Line({ line, viewBox, label=null, colour='auto' }) {
  // try to find pair of points that meet line at xmin, xmax
  // same for ymin, ymax.
  // discard points outside of viewbox.
  // use two remainers to draw line. 
  const [ minX, minY, width, height ] = viewBox
  const maxX = minX + width
  const maxY = minY + height

  let points = []

  const xPairs = [minX, maxX].map((x) => [x, (line.c - line.a*x)/line.b])
  const yPairs = [minY, maxY].map((y) => [(line.c - line.b*y)/line.a, y])
  xPairs.map((point) => { (point[1] >= minY && point[1] <= maxY) && points.push(point) })
  yPairs.map((point) => { (point[0] > minX && point[0] < maxX) && points.push(point) })

  console.log(points)
  const [i, f] = points
  return <line x1={i[0]} y1={i[1]} x2={f[0]} y2={f[1]} class={getColourClass(colour)} />
}
