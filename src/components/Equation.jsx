import { useRef, useEffect } from 'preact/hooks';
import { render } from 'kern-typ';

export default function Equation({ equation, displayMode = false }) {
  const ref = useRef(null);

  useEffect(() => {
    render(equation, ref.current, { displayMode: displayMode });
  }, [equation]);

  return <div ref={ref}>{equation}</div>;
}
