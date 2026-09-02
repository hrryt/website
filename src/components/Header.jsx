import { Link } from 'wouter-preact';

function getActiveClass(active) {
  return active ? "active" : "";
}

export default function Header() {
  return (
    <header>
      <nav class="window taskbar">
        <Link href="/" className={getActiveClass}>
          <button class="taskbar-element">
            Home
          </button>
        </Link>
        <Link href="/questions" className={getActiveClass}>
          <button class="taskbar-element">
            Questions
          </button>
        </Link>
        <Link href="/renderer" className={getActiveClass}>
          <button class="taskbar-element">
            KaTeX Renderer
          </button>
        </Link>
			</nav>
		</header>
	);
}
