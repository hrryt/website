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

function getLabelPosition(points, radius, start, end) {
  const midpoint = interpolate(start, end, 0.5);
  return interpolateDistance(points[1], midpoint, 1.5 * radius);
}

export default function Angle({ points, radius = 0.5, label = null, colour = "auto" }) {
  const [start, end] = getArc(points, radius);
  return (
    <g>
      <path d={`M ${start} A ${radius} ${radius} 0 0 1 ${end}`} class={getColourClass(colour)} />
      {label && <Label point={getLabelPosition(points, radius, start, end)} colour={colour}>{label}</Label>}
    </g>
  );
}
