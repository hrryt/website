import Window from '../components/Window.jsx';
import Plot from '../components/plotting/Plot.jsx';
import Quadratic from '../components/plotting/Quadratic.jsx';
import Cubic from '../components/plotting/Cubic.jsx';
import Polygon from '../components/plotting/Polygon.jsx';
import Angle from '../components/plotting/Angle.jsx';
import Segment from '../components/plotting/Segment.jsx';
import Line from '../components/plotting/Line.jsx';
import Point from '../components/plotting/Point.jsx';
import Label from '../components/plotting/Label.jsx';

export default function Home() {
  const viewBox = [-5, -4, 8, 8];
  const [A, B, C] = [[1,4], [3,2], [2,1]];
  return (
    <main>
      <Window title="Home">
        <p>Hello World!</p>
        <div class="field-border kern">
          <Plot viewBox={viewBox}>
            <Quadratic a={2} b={1} c={-3} colour="1" viewBox={viewBox} />
            <Polygon points={[[1,2], [-1,1], [-4,3]]} label="P" colour="2" />
            <Cubic a={1} b={-3} c={3} d={-1} colour="3" viewBox={viewBox} />
            <Line line={{a: -10, b: -9, c: -1}} colour="4" viewBox={viewBox} />
            <Point point={[0,1]} label="Q" colour="5" />
          </Plot>
          <Plot mode="blank" viewBox={[0, 0, 5, 5]}>
            <Label point={A} position="top">A</Label>
            <Label point={B} position="right">B</Label>
            <Label point={C} position="bottom">C</Label>
            <Segment points={[A, B]} marker="hash" />
            <Segment points={[C, B]} marker="double-feather" />
            <Segment points={[A, C]} />
            <Angle points={[A, B, C]} right={true} />
            <Angle points={[B, C, A]} />
            <Angle points={[C, A, B]} />
          </Plot>
        </div>
      </Window>
    </main>
  );
}
