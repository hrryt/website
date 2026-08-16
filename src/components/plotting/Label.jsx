import { useContext } from 'preact/hooks';
import { PlotContext } from '../../scripts/contexts.js';
import { getColourClass } from '../../scripts/graphUtils.js';

function getPosition(position) {
  switch (position) {
    case 'central':
      return ['central', 'middle', 0, 0];
    case 'left':
      return ['central', 'end', -1, 0];
    case 'right':
      return ['central', 'start', 1, 0];
    case 'top':
      return ['auto', 'middle', 0, 1];
    case 'bottom':
      return ['hanging', 'middle', 0, -1];
    case 'bottom-left':
      return ['hanging', 'end', -1, -1];
  }
}

export default function Label({ point, position='central', spacing=1, weight="normal", colour='auto', children }) {
  const [x, y] = point;
  const [dominantBaseline, textAnchor, dx, dy] = getPosition(position);
  const scaledSpacing = spacing * useContext(PlotContext).strokeWidth;
  return (
    <text
      x={x} y={-y} dx={scaledSpacing * dx} dy={scaledSpacing * -dy} transform='scale(1 -1)'
      dominant-baseline={dominantBaseline}
      text-anchor={textAnchor}
      class={getColourClass(colour)}
      font-weight={weight}
    >
      {children}
    </text>
  );
}
