import Label from './Label.jsx';
import { getColourClass } from '../../scripts/utils.js';

export default function Point({ point, label=null, colour="auto", position="top" }) {
  return (
    <g>
      <path marker-start="url(#cross)" d={`M ${point}`} class={getColourClass(colour)}/>
      {label && <Label point={point} position={position} spacing={5} colour={colour}>{label}</Label>}
    </g>
  );
}
