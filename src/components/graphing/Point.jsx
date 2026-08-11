import Label from './Label.jsx';
import { getColourClass } from '../../scripts/utils.js';

export default function Point({ x, y, label=null, colour="auto", position="top" }) {
  return (
    <g>
      <path marker-start="url(#cross)" d={`M ${x},${y}`} class={getColourClass(colour)}/>
      {label && <Label x={x} y={y} position={position} d={.3} colour={colour}>{label}</Label>}
    </g>
  );
}
