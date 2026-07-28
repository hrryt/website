import * as esbuild from 'esbuild';
import config from './esbuild.json' with { type: "json" };

config.define = { IS_PRODUCTION: 'false' };
config.sourcemap = true;

let ctx = await esbuild.context(config);

await ctx.watch();

let { hosts, port } = await ctx.serve({
  servedir: 'www',
});
