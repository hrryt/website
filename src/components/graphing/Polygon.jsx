import Label from './Label.jsx';

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

export default function Polygon({ points, label=null, colour="1" }) {
  const pointsString = points.map((point) => point.join(",")).join(" ");
  const colourClass = `color-${colour}`;
  return (
    <g>
      <polygon points={pointsString} class={colourClass}/>
      {label && <PolygonLabel points={points} colour={colour}>{label}</PolygonLabel>}
    </g>
  );
}
