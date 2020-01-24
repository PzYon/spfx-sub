## Problem
When using an old SPFx version (e.g.because you are forced to also work on prem) you are forced to use old version of dependencies, e.g React, TypeScript, etc. This is not good.

## Solution
Only use SPFx as the entry point, handover all the rest to your custom scripts. That way you can do whatever you want in your custom scripts (e.g. load the newest and coolest) dependencies, etc.

## What needs to be done
- Create a regular SPFx project (e.g. using `yo`)
- Within that project create a folder that hosts your sub-project (custom scripts), for example `core`
- Within the core folder
  - Create a new `package.json` (add all the dependencies you want)
  - Create a new build/bundle config (e.g. `webpack.config.js`)
    - Bundle the the sub-project...
    - ...and somehow make it's contents available (e.g. using `output.library` with webpack)
- Add the bundled sub-project 
  - to the `dependencies` in the `package.json`: `"core": "file:./core/dist",`
  - as `externals` in the `config.json` of the SPFx: `"externals": { "core": "./core/dist/index.js" }`
- Load the sub-project in the SPFx component (web part, application customizer), execute it and pass what is required - for the current example it's a DOM element and `context`-object

