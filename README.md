# webpack4-config-boiler
This is meant to be a bare-bones (but fully functional) webpack 4 configuration boilerplate.


## READ THIS
I have extracted the core packages from my working React project. This means **that I may have accidently removed packages that are necessary** (but I shouldn't have). **If anything is missing please let me know!**

## Defaults
- Assumes using CSS-in-JS for styling, no css extracting
- Assumes the use of redux, react router, and the need to polyfill
- hmr, code splitting, svg optimized loading, image optimization on build
- gzipped bundle for your server

## Optimization

#### dev/hmr build (with react bundled, etc.) ~3s
```
❯ yarn start
yarn run v1.5.1
$ cross-env NODE_ENV=development webpack-dev-server --mode development --colors --hot --inline --progress --config webpack.dev.config.babel.js
 10% building modules 1/1 modules 0 activeℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from ./src/
ℹ ｢wdm｣: Hash: 14226b26fd197b835ac1
Version: webpack 4.1.1
Time: 2953ms
```

#### prod build (with react bundled, etc.) ~4s
```
❯ yarn build
yarn run v1.5.1
$ cross-env NODE_ENV=production webpack --mode production --color --progress --config webpack.prod.config.babel.js
clean-webpack-plugin: /Users/evankysley/Documents/TGO/website/dist has been removed.
 10% building modules 1/1 modules 0 active(node:26021) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
 10% building modules 7/7 modules 0 active(node:26021) DeprecationWarning: Chunk.mapModules: Use Array.from(chunk.modulesIterable, fn) instead
Hash: 222cc4eca405434310a5
Version: webpack 4.1.1
Time: 1931ms
...
✨ Done in 4.06s.
```
