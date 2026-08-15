import { getColourClass, getMidpoint } from "../../scripts/graphUtils";

export default function Segment({ points, marker = null, colour = "auto" }) {
  if (!marker) {
    const [i, f] = points;
    return <line x1={i[0]} y1={i[1]} x2={f[0]} y2={f[1]} class={getColourClass(colour)} />;
  }
  const allPoints = [points[0], getMidpoint(points), points[1]];
  return <polyline points={allPoints} marker-mid={`url(#${marker})`} class={getColourClass(colour)} />;
}
