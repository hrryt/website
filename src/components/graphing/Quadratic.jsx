import { getSymmetricBounds } from '../../scripts/utils.js';

export default function Quadratic({ a=1, b=0, c=0, colour="1", viewBox }) {
  function f(x) { return a*x*x + b*x + c; }

  const turnX = -b / (2*a);
  const [startX, endX] = getSymmetricBounds(turnX, viewBox);

  const endY = f(endX);
  const controlY = 2*f(turnX) - endY;

  const d = `M ${startX},${endY} Q ${turnX},${controlY} ${endX},${endY}`;
  return <path d={d} class={`color-${colour}`} />;
}
