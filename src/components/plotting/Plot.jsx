import { useContext } from 'preact/hooks';
import { StrokeWidthContext } from '../../scripts/contexts.js';
import Label from './Label.jsx';

function Grid({ viewBox }) {
  const [ minX, minY, width, height ] = viewBox;
  const d = `M ${minX},${minY} h ${width}${` m -${width},1 h ${width}`.repeat(height)} v -${height}${` m -1,${height} v -${height}`.repeat(width)}`;
  return <path id="grid" d={d} />;
}

function Axes({ viewBox }) {
  const [ minX, minY, width, height ] = viewBox;
  const arrowheadHeight = 4 * useContext(StrokeWidthContext);
  return (
    <g>
      <path class="axis" d={`M ${minX},0 h ${ width - arrowheadHeight}`} marker-end="url(#arrowhead)"/>
      <path class="axis" d={`M 0,${minY} v ${height - arrowheadHeight}`} marker-end="url(#arrowhead)"/>
    </g>
  );
}

function AxisTicks({ viewBox }) {
  const every = Math.floor(20 * useContext(StrokeWidthContext));
  const [ minX, minY, width, height ] = viewBox;
  return (
    <g>
      <g>
        <g>
          {Array.from({ length: width - 1 }).map((_, i) => {
            const x = i + minX + 1;
            if (x == 0 || x % every) { return; }
            return <Label point={[x, 0]} position="bottom">{x}</Label>;
          })}
        </g>
        <g>
          {Array.from({ length: height - 1 }).map((_, i) => {
            const y = i + minY + 1;
            if (y == 0 || y % every) { return; }
            return <Label point={[0, y]} position="left">{y}</Label>;
          })}
        </g>
        <Label point={[0, 0]} position="bottom-left">0</Label>
      </g>
      <g>
        <Label weight="bold" point={[minX +  width, 0]} position="bottom-left" spacing={3}>x</Label>
        <Label weight="bold" point={[0, minY + height]} position="bottom-left" spacing={3}>y</Label>
      </g>
    </g>
  )
}

export default function Plot({ children, mode="graph", viewBox, width="300", height="300" }) {
  const id = `graph-${Math.floor(1000 * Math.random())}`;
  const scaleFactor = Math.max(viewBox[2] / width, viewBox[3] / height);
  const strokeWidth = 2.5 * scaleFactor;
  const style = `
    g#${id} text {
      font-size: ${scaleFactor}em;
      stroke-width: ${mode === "graph" ? 1.6 * strokeWidth : 0};
    }
    g#${id} :is(path,polygon,line,polyline,rect,circle,ellipse) {
      stroke-width: ${strokeWidth};
    }
    g#${id} path#grid {
      stroke-width: ${0.2 * strokeWidth};
    }
    g#${id} polygon {
      fill-opacity: ${mode === "graph" ? 0.5 : 0};
    }
  `;
  return (
    <svg
      width={width} height={height} viewBox={viewBox.join(' ')}
      transform="scale(1 -1)" xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <g>
          <marker
            id='arrowhead'
            viewBox="0 0 4 4"
            refX="0" refY="2"
            markerWidth="4" markerHeight="4"
            orient="auto"
          >
            <polygon class='marker' points="0,0 4,2 0,4" />
          </marker>
          <marker
            id="cross"
            viewBox="0 0 6 6"
            refX="3" refY="3"
            markerWidth="6" markerHeight="6"
          >
            <line class='marker' x1="1" y1="1" x2="5" y2="5" />
            <line class='marker' x1="1" y1="5" x2="5" y2="1" />
          </marker>
          <marker
            id="hash"
            viewBox="0 0 2 6"
            refX="1" refY="3"
            markerWidth="2" markerHeight="6"
            orient="auto"
          >
            <line class="marker" x1="1" y1="1" x2="1" y2="5" />
          </marker>
          <marker
            id="double-hash"
            viewBox="0 0 4 6"
            refX="2" refY="3"
            markerWidth="4" markerHeight="6"
            orient="auto"
          >
            <line class="marker" x1="1" y1="1" x2="1" y2="5" />
            <line class="marker" x1="3" y1="1" x2="3" y2="5" />
          </marker>
          <marker
            id="feather"
            viewBox="0 0 6 6"
            refX="5" refY="3"
            markerWidth="6" markerHeight="6"
            orient="auto"
          >
            <polyline class="marker" points="2,1 5,3 2,5" />
          </marker>
          <marker
            id="double-feather"
            viewBox="0 0 9 6"
            refX="5" refY="3"
            markerWidth="9" markerHeight="6"
            orient="auto"
          >
            <polyline class="marker" points="2,1 5,3 2,5" />
            <polyline class="marker" points="5,1 8,3 5,5" />
          </marker>
        </g>
        <style>
          {style}
        </style>
      </defs>
      <StrokeWidthContext value={strokeWidth}>
        <g id={id}>
          {mode === "graph" && (
            <g>
              <Grid viewBox={viewBox} />
              <Axes viewBox={viewBox} />
              <AxisTicks viewBox={viewBox} />
            </g>
          )}
          {children}
        </g>
      </StrokeWidthContext>
    </svg>
  );
}
