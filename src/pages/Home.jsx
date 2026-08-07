import Window from '../components/Window.jsx';
import Graph from '../components/Graph.jsx';

export default function Home() {
  return (
    <main>
      <Window title="Home">
        <p>Hello World!</p>
        <Graph procedure={p => p.draw_test()}/>
      </Window>
    </main>
  );
}
