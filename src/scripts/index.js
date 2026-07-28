import './auto-maths.js';
import './react-roots.js';

if (!IS_PRODUCTION) {
  new EventSource('/esbuild').addEventListener('change', () => location.reload())
}
