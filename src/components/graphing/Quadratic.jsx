export default function Quadratic({ a, b, c, viewBox }) {
  const [ minX, minY, width, height ] = viewBox;
  function f(x) { return a*x*x + b*x + c; }

  const turnX = -b / (2*a);

  const maxX = minX + width;
  // Assumes turnX within viewBox!
  const halfWidth = Math.max(
    turnX -  minX,
     maxX - turnX
  );

  const startX = turnX - halfWidth;
  const   endX = turnX + halfWidth;

  const endY = f(endX);
  const controlY = 2*f(turnX) - endY;

  return <path d={`M ${startX},${endY} Q ${turnX},${controlY} ${endX},${endY}`} />;
}
