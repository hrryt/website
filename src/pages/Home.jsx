import Window from '../components/Window.jsx';
import Graph from '../components/graphing/Graph.jsx';
import Quadratic from '../components/graphing/Quadratic.jsx';
import Cubic from '../components/graphing/Cubic.jsx';
import Polygon from '../components/graphing/Polygon.jsx';
import Angle from '../components/graphing/Angle.jsx';
import Segment from '../components/graphing/Segment.jsx';

export default function Home() {
  const viewBox = [-5, -4, 8, 8];
  return (
    <main>
      <Window title="Home">
        <p>Hello World!</p>
        <div class="field-border kern">
          <Graph viewBox={viewBox}>
            <Quadratic a={2} b={1} c={-3} colour="1" viewBox={viewBox} />
            <Polygon points={[[1,2], [-1,1], [-4,3]]} label="P" colour="2" />
            <Angle points={[[-4,3], [1,2], [-1,1]]} double={true} colour="2" />
            <Cubic a={1} b={-3} c={3} d={-1} colour="3" viewBox={viewBox} />
            <Segment points={[[0,1], [2,2]]} marker="hash" colour="4" />
          </Graph>
        </div>
      </Window>
    </main>
  );
}
