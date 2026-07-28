import * as esbuild from 'esbuild'
import config from './esbuild.json' with { type: "json" };

config.define = { IS_PRODUCTION: 'true' };
config.minify = true;

await esbuild.build(config);
