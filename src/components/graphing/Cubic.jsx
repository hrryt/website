import { getSymmetricBounds } from '/src/scripts/utils.js';

export default function Cubic({ a=1, b=0, c=0, d=0, colour="1", viewBox }) {
  // https://math.stackexchange.com/questions/3356084/to-construct-a-polynomial-using-b%C3%A9zier-curves
  // http://graphics.stanford.edu/courses/cs164-09-spring/Handouts/handout19.pdf
  function g(u, v, w) { return a*u*v*w + b*(v*w + w*u + u*v)/3 + c*(u + v + w)/3 + d; }

  const [i, f] = getSymmetricBounds(-b / (3*a), viewBox);
  // https://math.stackexchange.com/questions/2414459/draw-cubic-polynomial-using-2d-cubic-bezier-curve
  const x1 = 2/3 * i + 1/3 * f;
  const x2 = 1/3 * i + 2/3 * f;

  d = `M ${i},${g(i,i,i)} C ${x1},${g(i,i,f)} ${x2},${g(i,f,f)} ${f},${g(f,f,f)}`;
  return <path d={d} class={`color-${colour}`} />
}
