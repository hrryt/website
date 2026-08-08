import { getSymmetricBounds } from '/src/scripts/utils.js';

export default function Quadratic({ a=1, b=0, c=0, viewBox }) {
  function f(x) { return a*x*x + b*x + c; }

  const turnX = -b / (2*a);
  const [startX, endX] = getSymmetricBounds(turnX, viewBox);

  const endY = f(endX);
  const controlY = 2*f(turnX) - endY;

  return <path d={`M ${startX},${endY} Q ${turnX},${controlY} ${endX},${endY}`} />;
}
