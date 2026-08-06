import { LocationProvider, Router, hydrate, prerender as ssr } from 'preact-iso';

import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import QuestionIndex from './pages/QuestionIndex.jsx';
import NotFound from './pages/NotFound.jsx';
import './styles/index.css';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<Router>
				<Home path="/" />
				<QuestionIndex path="/questions" />
				<QuestionIndex path="/questions/*" />
				<NotFound default />
			</Router>
		</LocationProvider>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
