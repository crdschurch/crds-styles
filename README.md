# crds-styles

`crds-styles` provides the primary CSS framework and global style patterns that power [crossroads.net](http://crossroads.net) and it's related properties. Any elements and/or implementation details included within the [Digital Design Kit (DDK)](http://github.com/crdschurch/crds-styleguide) are provided by this NPM package. Any deviations from the patterns defined there should be implemented in the client application.

## Implementation

Until this project is published to NPM, you have two options to get it included as a dependency of your Node compatible application.

---

### Option #1 - Symlink Local Directory

Assuming the `crds-styles` repo resides in the same local directory as your project, you can do the following to setup the symlink...

    $ cd path/to/your/project-directory
    $ npm link ../crds-styles

### Option #2 - Reference Github URL in package.json

If you don't have the DDK cloned locally, you can just reference the repo directly in your `package.json` file, like so...

    {
      "name": "foo",
      "version": "0.0.0",
      "dependencies": {
        "crds-styles": "crdschurch/crds-styles"
      }
    }

---

Once you've added `crds-styles` to `package.json` you need to import the stylesheet in your application's main '.scss' file using the following convention. You can optionally override any of the customizable Bootstrap variables prior to import...

    @import '~crds-styles/assets/stylesheets/bootstrap';

## SVGs

Any project consuming `crds-styles` will need to update their build process in order to access SVG files.  

### Webpack build
If using webpack, the `copy-webpack-plugin` can be used to move the svg files to the distribution folder
```javascript
plugins: [
    new CopyWebpackPlugin([
      {
        context: './node_modules/crds-styles/assets/stylesheets/svg/assets',
        from: '*.svg',
        to: 'assets',
      }
    ])
  ]
```
See `crds-styleguide` [`webpack.common.js`](https://github.com/crdschurch/crds-styleguide/blob/development/config/webpack.common.js) for a full example

### Webpack Dev Server
If using `webpack-dev-server` as a development tool, the implementation will need to be modifed to support `content-base` which will serve static assets from the given directory as well as trigger a build in order to have `CopyWebpackPlugin` triggered to move SVGs
```json
"scripts": {
    "serve": "npm run start",
    "start": "npm run build-dev && webpack-dev-server --inline --open --progress --port 4200 --content-base dist/",
    "build-dev": "rimraf dist && webpack --config config/webpack.dev.js --progress --profile --bail",
}
```
See `crds-styleguide` [`package.json`](https://github.com/crdschurch/crds-styleguide/blob/development/package.json) for a full example.

### Adding New SVGs
We're using [Sketch](https://www.sketchapp.com/) to development consistent iconography for this project.

The source file, `crds-styles.sketch` is [hosted on Dropbox](https://www.dropbox.com/sh/d04xcc0lk5tbo71/AAD-EWEnTQkDrgITNR_DArmga/library). First thing's first, download this file.

With the file open, you can duplicate the last artboard. When you do, be sure to drag the artboard down to the bottom of the lefthand panel. Rename the artboard appropriately (this name will eventually be the class/ID used to render the icon).

_Note: If you're adding a new artboard beyond the end of a row, you're welcome to start a new row, just keep spacing and positioning consistent._

![](https://github.com/crdschurch/crds-styleguide/blob/defect/DE2890-convert-svg-to-paths/src/assets/images/sketch-icon-docs/duplicate-artboard.gif?raw=true)

Then you can delete the duplicated contents of that artboard.

![](https://raw.githubusercontent.com/crdschurch/crds-styleguide/defect/DE2890-convert-svg-to-paths/src/assets/images/sketch-icon-docs/delete-layer.gif?raw=true)

Next, find the SVG you're doing to add to the library. You can simply copy and paste from your filesystem into Sketch.

![](https://github.com/crdschurch/crds-styleguide/blob/defect/DE2890-convert-svg-to-paths/src/assets/images/sketch-icon-docs/import-shape.gif?raw=true)

Lock the dimensions into place, resize the artwork to `236px` on its longer side, and position it in the exact center of the artboard.

![](https://github.com/crdschurch/crds-styleguide/blob/defect/DE2890-convert-svg-to-paths/src/assets/images/sketch-icon-docs/resize-and-center.gif?raw=true)

You can also remove all the excess folders and layers from the icon so all the artboard contains is a single layer (our goal is that the exported shape for the SVG is only a single `<path>` element).

![](https://github.com/crdschurch/crds-styleguide/blob/defect/DE2890-convert-svg-to-paths/src/assets/images/sketch-icon-docs/remove-extra-layers.gif?raw=true)

And you're ready to export! Be sure to **export the entire artboard**, not just the artwork. We require that each SVG export be `256px` square. Export the new SVG layer to `assets/svgs` in this project, then you're ready to compile into a single SVG.

![](https://github.com/crdschurch/crds-styleguide/blob/defect/DE2890-convert-svg-to-paths/src/assets/images/sketch-icon-docs/export-svg.gif?raw=true)

### Compile SVG sprites
Run `npm run build-svg` to compile the SVGs into the correct sass and sprite files

## Versions &amp; Roadmap

We'll be developing the pattern library over the next few months and as we release new updates, we will increase the version number according to the following rules.

* Bug fixes and other minor changes: Patch release, increment the last number, e.g. 1.0.1
* New features which don't break existing features: Minor release, increment the middle number, e.g. 1.1.0
* Changes which break backwards compatibility: Major release, increment the first number, e.g. 2.0.0

Once we reach version 1.0.0, the DDK will be feature complete and will continue to be updated in manner described above.

## License

This project is licensed under the [3-Clause BSD License](https://opensource.org/licenses/BSD-3-Clause). 
