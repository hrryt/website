import Window from '../components/Window.jsx';
import Graph from '../components/graphing/Graph.jsx';
import Quadratic from '../components/graphing/Quadratic.jsx';
import Cubic from '../components/graphing/Cubic.jsx';
import Polygon from '../components/graphing/Polygon.jsx';
import Angle from '../components/graphing/Angle.jsx';
import Segment from '../components/graphing/Segment.jsx';
import Line from '../components/graphing/Line.jsx';
import Point from '../components/graphing/Point.jsx';

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
            <Angle points={[[-4,3], [1,2], [-1,1]]} arcs={3} colour="2" />
            <Cubic a={1} b={-3} c={3} d={-1} colour="3" viewBox={viewBox} />
            <Line line={{a: -10, b: -9, c: -1}} colour="5" viewBox={viewBox} />
            <Segment points={[[0,1], [2,2]]} marker="double-feather" />
            <Point point={[0,1]} label="Q" colour="1" />
          </Graph>
        </div>
      </Window>
    </main>
  );
}
