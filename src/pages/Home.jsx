import Window from '../components/Window.jsx';
import Graph from '../components/graphing/Graph.jsx';
import Quadratic from '../components/graphing/Quadratic.jsx';
import Cubic from '../components/graphing/Cubic.jsx';
import CoordinateLabel from '../components/graphing/CoordinateLabel.jsx';

export default function Home() {
  const viewBox = [-5, -4, 8, 8];
  return (
    <main>
      <Window title="Home">
        <p>Hello World!</p>
        <div class="field-border kern">
          <Graph viewBox={viewBox}>
            <Quadratic a={2} b={1} c={-3} viewBox={viewBox} />
            <CoordinateLabel x={-.25} y={-3.125} position="bottom" />
            <polygon points="1,2 -1,1, -4,3" />
            <CoordinateLabel x={-4} y={3} position="top" />
            <Cubic a={1} b={-3} c={3} d={-1} viewBox={viewBox}/>
          </Graph>
        </div>
      </Window>
    </main>
  );
}
