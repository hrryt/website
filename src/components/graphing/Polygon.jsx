import Label from './Label.jsx';
import { getColourClass } from '../../scripts/utils.js';

function getMean(arr) {
  return arr.reduce((a, b) => a + b) / arr.length;
}

function getMiddle(points) {
  const x = points.map(point => point[0]);
  const y = points.map(point => point[1]);
  return [getMean(x), getMean(y)];
}

function PolygonLabel({ children, points, colour }) {
  const [x, y] = getMiddle(points);
  return <Label x={x} y={y} colour={colour}>{children}</Label>;
}

export default function Polygon({ points, label=null, colour="auto" }) {
  const pointsString = points.map((point) => point.join(",")).join(" ");
  return (
    <g>
      <polygon points={pointsString} class={getColourClass(colour)}/>
      {label && <PolygonLabel points={points} colour={colour}>{label}</PolygonLabel>}
    </g>
  );
}
