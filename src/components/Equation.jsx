import * as React from 'react';
import { render } from 'kern-typ';

export default function Equation({ equation, displayMode = false }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    render(equation, ref.current, { displayMode: displayMode });
  }, [equation]);

  return <div ref={ref} />;
}
