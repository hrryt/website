import Label from './Label.jsx';

function Grid({ viewBox }) {
  const [ minX, minY, width, height ] = viewBox;
  const d = `M ${minX},${minY} h ${width} ${`m -${width},1 h ${width}`.repeat(height)} v -${height} ${`m -1,${height} v -${height}`.repeat(width)}`;
  return <path id="grid" d={d} />;
}

function Axes({ viewBox }) {
  const [ minX, minY, width, height ] = viewBox;
  return (
    <g>
      <path class="axis" d={`M ${minX},0 h ${width-.1}`} marker-end="url(#arrow)"/>
      <path class="axis" d={`M 0,${minY} v ${height-.1}`} marker-end="url(#arrow)"/>
    </g>
  );
}

function AxisTicks({ every = 1, viewBox }) {
  const [ minX, minY, width, height ] = viewBox;
  return (
    <g>
      <g>
        {Array.from({ length: width - 1 }).map((_, i) => {
          const x = i + minX + 1;
          if (x == 0 || x % every) { return; }
          return <Label x={x} y="0" position="bottom" d={.1}>{x}</Label>;
        })}
      </g>
      <g>
        {Array.from({ length: height - 1 }).map((_, i) => {
          const y = i + minY + 1;
          if (y == 0 || y % every) { return; }
          return <Label x="0" y={y} position="left" d={.1}>{y}</Label>;
        })}
      </g>
      <Label x="0" y="0" position="bottom-left" d={.1}>0</Label>
    </g>
  )
}

export default function Graph({ children, viewBox, width="300", height="300" }) {
  const scaleFactor = Math.max(viewBox[2] / width, viewBox[3] / height);
  const style = `
    text {
      font-size: ${scaleFactor}em;
    }
  `;
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
          <polygon points="0,0 4,2 0,4" id='arrowhead' />
        </marker>
        <style>
          {style}
        </style>
      </defs>
      <Grid viewBox={viewBox} />
      <Axes viewBox={viewBox} />
      {children}
      <AxisTicks every={Math.floor(50 * scaleFactor)} viewBox={viewBox} />
    </svg>
  );
}
