import Label from './Label.jsx';

function Grid({ viewBox }) {
  const [ minX, minY, width, height ] = viewBox;
  const d = `M ${minX} ${minY} h ${width} ${`m -${width} 1 h ${width}`.repeat(height)} v -${height} ${`m -1 ${height} v -${height}`.repeat(width)}`;
  return <path id="grid" d={d} />;
}

function Axes({ viewBox }) {
  const [ minX, minY, width, height ] = viewBox;
  return (
    <g>
      <path id="axes" d={`M ${minX} 0 h ${width-.1}`} marker-end="url(#arrow)"/>
      <path id="axes" d={`M 0 ${minY} v ${height-.1}`} marker-end="url(#arrow)"/>
    </g>
  );
}

function AxisTicks({ viewBox }) {
  const [ minX, minY, width, height ] = viewBox;
  return (
    <g>
      <g>
        {Array.from({ length: width - 1 }).map((_, i) => {
          const x = i + minX + 1;
          if (x == 0) { return; }
          return <Label x={x} y="0" position="bottom" d={.1}>{x}</Label>;
        })}
      </g>
      <g>
        {Array.from({ length: height - 1 }).map((_, i) => {
          const y = i + minY + 1;
          if (y == 0) { return; }
          return <Label x="0" y={y} position="left" d={.1}>{y}</Label>;
        })}
      </g>
      <Label x="0" y="0" position="bottom-left" d={.1}>0</Label>
    </g>
  )
}

export default function Graph({ children, width="500", height="500", viewBox=[-5, -5, 10, 10] }) {
  return (
    <svg
      width={width} height={height} viewBox={viewBox.join(' ')}
      transform="scale(1 -1)" xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id='arrow'
          viewBox="0 0 4 4"
          refX="3" refY="2"
          markerWidth="4" markerHeight="4"
          markerUnits="strokeWidth"
          orient="auto"
        >
          <path d="M 0 0 L 4 2 L 0 4 z" id='arrowhead' />
        </marker>
      </defs>
      <Grid viewBox={viewBox} />
      <Axes viewBox={viewBox} />
      {children}
      <AxisTicks viewBox={viewBox} />
    </svg>
  );
}
