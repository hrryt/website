import { useEffect, useRef, useState } from 'preact/hooks';
import Equation from '../components/Equation.jsx';
import Window from '../components/Window.jsx'
 
export default function KatexRenderer() {
  const [text, setText] = useState("")
  const textRef = useRef(null)

  function updateText(e) {
    setText(e.target.value)
  }

  useEffect(() => {
    textRef.current.addEventListener('input', updateText)
  })

  return (
    <main>
      <Window title="KaTeX Renderer">
        <p>Hello World!</p>
        <textarea 
          class="field-border"
          placeholder="Typst Syntax Here..."
          value={text}
          ref={textRef}
          onChange={e => updateText(e)}
        />
        <div className="field-border">
          <Equation equation={text} />
        </div>
      </Window>
    </main>
  )
}