import Label from './Label.jsx';

export default function CoordinateLabel({ x, y, position = "top" }) {
  return <Label x={x} y={y} position={position}>{`(${x},${y})`}</Label>;
}
