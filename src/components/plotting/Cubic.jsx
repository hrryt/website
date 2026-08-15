import { getColourClass, getSymmetricBounds } from '../../scripts/utils.js';

function getDepressedCubicRoots(a, b, c, d) {
  // https://en.wikipedia.org/wiki/Cubic_equation#Depressed_cubic
  const p = (3*a*c - b*b) / (3*a*a);
  const q = (2*b*b*b - 9*a*b*c + 27*a*a*d) / (27*a*a*a);
  const discriminantish = q*q/4 + p*p*p/27;

  if (discriminantish > 0) {
    // https://en.wikipedia.org/wiki/Cubic_equation#Cardano's_formula
    const sqrt = Math.sqrt(discriminantish);
    const root = Math.cbrt(-q/2 + sqrt) + Math.cbrt(-q/2 - sqrt);
    return [root];
  }

  if (discriminantish === 0) {
    // https://en.wikipedia.org/wiki/Cubic_equation#Multiple_root
    if (p === 0) { return [0,0,0]; }
    const doubleRoot = -3*q/(2*p);
    return [3*q/p, doubleRoot, doubleRoot];
  }

  // https://en.wikipedia.org/wiki/Cubic_equation#Trigonometric_and_hyperbolic_solutions
  const cosCoef = 2*Math.sqrt(-p/3);
  const arccosine = 1/3 * Math.acos(3*q/(2*p) * Math.sqrt(-3/p));
  const kCoef = 2*Math.PI / 3;
  return [0,1,2].map(k => cosCoef * Math.cos(arccosine - kCoef * k));
}

export default function Cubic({ a=1, b=0, c=0, d=0, colour="auto", viewBox }) {
  // https://math.stackexchange.com/questions/3356084/to-construct-a-polynomial-using-b%C3%A9zier-curves
  // http://graphics.stanford.edu/courses/cs164-09-spring/Handouts/handout19.pdf
  function G(u, v, w) { return a*u*v*w + b*(v*w + w*u + u*v)/3 + c*(u + v + w)/3 + d; }

  const midX = -b / (3*a);

  const [minX, minY, width, height] = viewBox;
  const maxY = minY + height;
  const intercepts = [
    ...getDepressedCubicRoots(a,b,c,d - minY),
    ...getDepressedCubicRoots(a,b,c,d - maxY)
  ];
  console.log(intercepts.map(x => x + midX));
  const dx = Math.max(...intercepts.map(x => Math.abs(x)));

  const [i, f] = getSymmetricBounds(midX, dx, viewBox);

  // https://math.stackexchange.com/questions/2414459/draw-cubic-polynomial-using-2d-cubic-bezier-curve
  const x1 = 2/3 * i + 1/3 * f;
  const x2 = 1/3 * i + 2/3 * f;

  d = `M ${i},${G(i,i,i)} C ${x1},${G(i,i,f)} ${x2},${G(i,f,f)} ${f},${G(f,f,f)}`;
  return <path d={d} class={getColourClass(colour)} />
}
