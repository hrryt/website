import Label from './Label.jsx';
import { useContext } from 'preact/hooks';
import { PlotContext } from '../../scripts/contexts.js';
import { getColourClass, getMidpoint, interpolateDistance, sumVectors, getVector } from '../../scripts/graphUtils.js';

function getArc(points, radius) {
  const start = interpolateDistance(points[1], points[0], radius);
  const end = interpolateDistance(points[1], points[2], radius);
  return [start, end];
}

function RightAngle({ points, radius, colour }) {
  const [start, end] = getArc(points, radius);
  const midpoint = sumVectors(start, getVector(points[1], end));
  return <polygon points={[points[1], start, midpoint, end]} class={getColourClass(colour)} />
}

function AngleArc({ points, radius, colour }) {
  const [start, end] = getArc(points, radius);
  return <path d={`M ${start} A ${radius} ${radius} 0 0 1 ${end}`} class={getColourClass(colour)} />;
}

function AngleLabel({ points, radius, colour, children }) {
  const point = interpolateDistance(points[1], getMidpoint(getArc(points, 1)), 1.5 * radius);
  return <Label point={point} colour={colour}>{children}</Label>;
}

export default function Angle({ points, right = false, arcs = 1, label = null, colour = "auto" }) {
  const p = useContext(PlotContext);
  const radius = 10 * p.strokeWidth;
  const concentricGap = 1.5 * p.strokeWidth;
  return (
    <g>
      {right ? (
                <RightAngle points={points} radius={0.8 * radius} colour={colour} />
      ) : Array.from({ length: arcs }).map(
        (_, i) => <AngleArc points={points} radius={(radius + i*concentricGap)} colour={colour} />
      )}
      {label && <AngleLabel points={points} radius={radius} colour={colour}>{label}</AngleLabel>}
    </g>
  );
}
