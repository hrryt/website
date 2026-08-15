import { getColourClass, getSymmetricBounds } from "../../scripts/graphUtils";

export default function Quadratic({ a=1, b=0, c=0, colour="auto", viewBox }) {
  function F(x) { return a*x*x + b*x + c; }

  const midX = -b / (2*a);

  const [minX, minY, width, height] = viewBox;
  const maxY = minY + height;
  const midY = F(midX);
  const curveHeight = a < 0 ? midY - minY : maxY - midY;
  const dx = Math.sqrt(curveHeight / Math.abs(a));

  const [i, f] = getSymmetricBounds(midX, dx, viewBox);

  const y0 = F(i);
  const y1 = 2*midY - y0;

  const d = `M ${i},${y0} Q ${midX},${y1} ${f},${y0}`;
  return <path d={d} class={getColourClass(colour)} />;
}
