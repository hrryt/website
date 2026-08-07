import Window from '../components/Window.jsx';
import Graph from '../components/graphing/Graph.jsx';
import Quadratic from '../components/graphing/Quadratic.jsx';
import Label from '../components/graphing/Label.jsx';

export default function Home() {
  return (
    <main>
      <Window title="Home">
        <p>Hello World!</p>
        <div class="field-border kern">
          <Graph viewBox={[-5, -1, 7, 6]}>
            <Quadratic />
            <Label x="-2" y="4" position="left">x²</Label>
            <polygon points="1,2 -1,1, -4,3" />
            <Label x="-4" y="3" position="top">(-4, 3)</Label>
          </Graph>
        </div>
      </Window>
    </main>
  );
}
