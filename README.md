## Problem
When using an old SPFx version (e.g.because you are forced to also work on SharePoint 2016/2019) you are forced to use the corresponding old versions of dependencies, e.g React, TypeScript, etc. This is not good.

## Solution
Only use SPFx as the entry point, handover all of the rest to your custom scripts. That way you can do whatever you want in your custom scripts (e.g. load the newest and coolest) dependencies, etc. The `core` folder contains the custom (sub) project.

### Drawbacks
- You will need to take care of the bundling yourself (e.g. using webpack). This might also be an advantage though, because in the end your are more flexible than when using SPFx.
- Certain packages might be loaded multiple times, e.g. React, as you will not consume what SPFx provides, but what is bundled.
- Not all of this has been tested thoroughly. It just an idea that seems to work so far. 

### Steps
- Create a regular SPFx project (e.g. using `yo`) using the mode you need - e.g. support also for SP2019
- Within that project create a folder that hosts your sub-project (custom scripts), for example `core`
- Within that folder
  - Create a new `package.json` (add all the dependencies you want)
  - Create a new build/bundle config (e.g. `webpack.config.js`)
    - Bundle the sub-project...
    - ...and somehow make its contents available (e.g. using `output.library` with webpack)
- Add the bundled sub-project
  - to the `dependencies` in the `package.json`: `"core": "file:./core/dist",`
  - and as `externals` in the `config.json` of the SPFx: `"externals": { "core": "./core/dist/index.js" }`
- Load/import the sub-project in the SPFx component (web part, application customizer), execute it and pass what is required - for the current example it's a DOM element and `context`-object

### How to use
- For development you will need to
  - Run `gulp serve` in the root folder
  - Run `npm run dev` in the `core` folder
- To edit you code you can either
  - Open the SPFx project in the IDE
  - Or you can simply only open the `core` folder in your IDE - most probably you will very rarely need to make changes to stuff that's not in the `core` folder once everything has been setup

