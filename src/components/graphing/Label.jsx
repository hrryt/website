import { getColourClass } from '../../scripts/utils.js';

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

export default function Label({ point, position='central', colour='auto', d=.15, children }) {
  const [x, y] = point;
  const [dominantBaseline, textAnchor, dx, dy] = getPosition(position);
  return (
    <text
      x={x} y={-y} dx={d*dx} dy={-d*dy} transform='scale(1 -1)'
      dominant-baseline={dominantBaseline}
      text-anchor={textAnchor}
      class={getColourClass(colour)}
    >
      {children}
    </text>
  );
}
