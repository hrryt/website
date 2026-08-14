import Label from './Label.jsx';
import { getColourClass, getMidpoint, interpolateDistance } from '../../scripts/utils.js';

function getArc(points, radius) {
  const start = interpolateDistance(points[1], points[0], radius);
  const end = interpolateDistance(points[1], points[2], radius);
  return [start, end];
}

function AngleArc({ points, radius, colour }) {
  const [start, end] = getArc(points, radius);
  return <path d={`M ${start} A ${radius} ${radius} 0 0 1 ${end}`} class={getColourClass(colour)} />;
}

function AngleLabel({ points, radius, colour, children }) {
  const point = interpolateDistance(points[1], getMidpoint(getArc(points, 1)), 1.5 * radius);
  return <Label point={point} colour={colour}>{children}</Label>;
}

export default function Angle({ points, radius = 0.5, double = false, label = null, colour = "auto" }) {
  return (
    <g>
      <AngleArc points={points} radius={radius} colour={colour} />
      {double && <AngleArc points={points} radius={1.2*radius} colour={colour} />}
      {label && <AngleLabel points={points} radius={radius} colour={colour}>{label}</AngleLabel>}
    </g>
  );
}
