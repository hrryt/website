import { useEffect, useRef, useState } from 'preact/hooks';
import Equation from '../components/Equation.jsx';
import Card from '../components/Card.jsx'

export default function LatexRenderer() {
  const [text, setText] = useState("")
  const textRef = useRef(null)

  function updateText(e) {
    setText(e.target.value)
  }

  useEffect(() => {
    textRef.current.addEventListener('input', updateText)
  })

  return (
    <Card title="LaTeX Renderer">
      <p>Render LaTeX code to the screen.</p>
      <textarea
        placeholder="LaTeX code here..."
        value={text}
        ref={textRef}
        onChange={e => updateText(e)}
        spellcheck={false}
      />
      <div class="field-border">
        <Equation equation={text} />
      </div>
    </Card>
  )
}
