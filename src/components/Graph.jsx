import { useRef, useEffect } from 'preact/hooks';
import Plane from '../scripts/Plane.js';

export default function Graph({ procedure }) {
  const ref = useRef(null);

  useEffect(() => {
    const plane = new Plane(ref.current);
    procedure(plane)
  }, [procedure]);

  return <canvas ref={ref} width="150" height="150"/>;
}
