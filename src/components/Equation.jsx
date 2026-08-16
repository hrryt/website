import { render } from 'katex';

export default function Equation({ equation, displayMode = false }) {

  function renderEquation(dom) {
    dom === null || render(equation, dom, { displayMode: displayMode });
  }

  return <span ref={renderEquation}></span>;
}
