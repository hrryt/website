import Point from './Point.jsx';
import { getColourClass, trueMod } from '../../scripts/utils.js';

export default function Sinusoid({ period=1, amp=1, dx=0, dy=0, colour="auto", viewBox }) {
  const [minX, minY, width, height] = viewBox;

  const offset = trueMod(minX - dx, period);
  const x0 = minX - offset;
  const periods = Math.ceil((width + offset) / period);

  const magicNumber = 0.3642124232;
  const halfPeriod = period /  2;

  const dx1 = halfPeriod * magicNumber;
  const dx2 = halfPeriod * (1 - magicNumber);

  const h = 2*amp;

  const wave = `
    c ${dx1},0 ${dx2},${-h} ${halfPeriod},${-h}
    c ${dx1},0 ${dx2},${+h} ${halfPeriod},${+h}
  `;

  return <path d={`M ${x0},${amp+dy}${wave.repeat(periods)}`} class={getColourClass(colour)} />;
}
