import { useLocation } from 'preact-iso';

export default function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav class="window taskbar">
			  <a href="/">
          <button class={'taskbar-element' + (url == '/' ? ' active' : '')}>
            Home
          </button>
        </a>
        <a href="/questions">
          <button class={'taskbar-element' + (url.startsWith('/questions') ? ' active' : '')}>
            Questions
          </button>
        </a>
			</nav>
		</header>
	);
}
