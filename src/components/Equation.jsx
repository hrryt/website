import * as React from 'react';
import { render } from 'kern-typ';

export default function Equation({ equation, displayMode = false }) {
  const elementRef = React.useRef();

  React.useEffect(() => {
    render(equation, elementRef.current, { displayMode: displayMode });
  }, [equation]);

  return <div className="Equation" ref={elementRef} />;
}
