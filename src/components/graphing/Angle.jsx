import Label from './Label.jsx';
import { getColourClass } from '../../scripts/utils.js';

function sum(arr) {
  return arr.reduce((a, b) => a + b);
}

function sumVectors(arr) {
  return arr.reduce((a, b) => a.map((ai, i) => ai + b[i]));
}

function scale(vector, factor) {
  return vector.map(a => a * factor);
}

function normalise(vector, scaleFactor = 1) {
  const length = Math.sqrt(sum(vector.map(a => a*a)));
  return scale(vector, scaleFactor / length);
}

function getVector(start, end) {
  return [end[0] - start[0], end[1] - start[1]];
}

function interpolate(start, end, along) {
  return sumVectors([start, scale(getVector(start, end), along)]);
}

function interpolateDistance(start, end, distance) {
  return sumVectors([start, normalise(getVector(start, end), distance)]);
}

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
  const [start, end] = getArc(points, 1);
  const midpoint = interpolate(start, end, 0.5);
  const point = interpolateDistance(points[1], midpoint, 1.5 * radius);
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
