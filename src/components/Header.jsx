import { useLocation } from 'preact-iso';

export default function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav class="window">
			  <a href="/">
          <button class={'nav-element' + (url == '/' ? ' active' : '')}>
            Home
          </button>
        </a>
        <a href="/questions">
          <button class={'nav-element' + (url.startsWith('/questions') ? ' active' : '')}>
            Questions
          </button>
        </a>
			</nav>
		</header>
	);
}
