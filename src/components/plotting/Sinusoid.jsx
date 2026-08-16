import { useContext } from 'preact/hooks';
import { PlotContext } from '../../scripts/contexts.js';
import { getColourClass } from '../../scripts/graphUtils.js';
import { trueMod } from '../../scripts/mathsUtils.js';
import Point from './Point.jsx';

export default function Sinusoid({ period=1, amp=1, dx=0, dy=0, colour="auto" }) {
  const p = useContext(PlotContext);

  const offset = trueMod(p.minX - dx, period);
  const x0 = p.minX - offset;
  const periods = Math.ceil((p.width + offset) / period);

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
