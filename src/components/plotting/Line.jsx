import { useContext } from 'preact/hooks';
import { PlotContext } from '../../scripts/contexts.js';
import { getColourClass } from "../../scripts/graphUtils"

export default function Line({ line, label=null, colour='auto' }) {
  const p = useContext(PlotContext);

  const xPairs = [p.minX, p.maxX].map((x) => [x, (-line.c - line.a*x)/line.b])
  const yPairs = [p.minY, p.maxY].map((y) => [(-line.c - line.b*y)/line.a, y])

  // important to do this for straight (y = c or x = c) lines.
  let points = []
  xPairs.map((point) => { (point[1] >= p.minY && point[1] <= p.maxY) && points.push(point) })
  yPairs.map((point) => { (point[0] > p.minX && point[0] < p.maxX) && points.push(point) })

  // points will always be two.
  const [i, f] = points
  return <line x1={i[0]} y1={i[1]} x2={f[0]} y2={f[1]} class={getColourClass(colour)} />
}
