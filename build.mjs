import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/scripts/index.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outdir: 'www/js',
})

await esbuild.build({
  entryPoints: ['src/styles/index.css'],
  bundle: true,
  outdir: 'www/css',
})
