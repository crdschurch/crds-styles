crds-styles
==========

`crds-styles` provides the primary CSS framework and global style patterns that
power [crossroads.net](http://crossroads.net) and its related properties.

Any elements and/or implementation details included within the [Digital Design
Kit (DDK)](http://github.com/crdschurch/crds-styleguide) are provided by this
NPM package. Any deviations from the patterns defined there should be
implemented in the client application.

Installation
----------

There are two options for including crds-styles in your project.

### Option #1 (Recommended) - External Build

The easiest way to include crds-styles is by loading the external CSS file. The
build is deployed to S3 and is available through our Cloudfront distribution.

This approach is most useful when you don't need to override any styles, or
when the styles you're overriding don't require needing crds-styles' (or
Bootstrap's) sass variables.

```html
<link rel="stylesheet" href="//d1tmclqz61gqwd.cloudfront.net/styles/crds-styles-2.0.0.min.css">
```

_(Note: Replace `2.0.0` with the desired version.)_

### Option #2 - NPM via package.json

If your project needs to use crds-styles' sass variables or requires that you
build crds-styles locally, you can bring it in via NPM in your `package.json`
file.

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "crds-styles": "2.0.0"
  }
}
```

You can also use a reference to the GitHub URL in cases where you would like to
use upstream changes that haven't yet been released.

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "crds-styles": "crdschurch/crds-styles#development"
  }
}
```

Usage
----------

Import the stylesheet in your application's main '.scss'
file using the following convention. You can optionally override
any of the customizable Bootstrap variables prior to import.

```scss
@import '~crds-styles/assets/stylesheets/crds-styles';
```

_Note: The tilde character (`~`) is a shorthand reference to `node_modules`,
provided by either [Webpack's SASS Loader](https://github.com/webpack-contrib/sass-loader#imports)
or [node-sass-tilde-importer](https://github.com/matthewdavidson/node-sass-tilde-importer),
depending on your preferred build configuration._

---

#### A note on local development

When making changes to crds-styles locally and in wanting them to be reflected
in your project, you should follow the NPM/package.json approach for importing
styles.

In this case you'll want to link to a local copy of crds-styles. Assuming the
`crds-styles` repo resides in the same local directory as your project, you can
do the following to setup the symlink.

```text
$ cd path/to/your/project-directory
$ rm -rf node_modules/crds-styles
$ npm link ../crds-styles
```

SVGs
--------

Any project consuming `crds-styles` will need to update their build process in
order to access SVG files. For information on adding new icons to `crds-styles`
please refer to [the
documentation](https://github.com/crdschurch/crds-styles/blob/development/src/assets/svgs/README.md).

### Angular CLI Build

Angular CLI ships with the ability to copy assets into a project. To include the
icons (or any other assets), first install crds-styles into your `node_modules`
directory via NPM. Then add the following to your `assets` config in
`.angular-cli.json` file:

```js
{
  "apps": [{
    "assets": [
      {
        "glob": "icons.svg",
        "input": "../node_modules/crds-styles/assets/svgs",
        "output": "assets"
      }
    ]
  }
]
```

Note that you could change `icons.svg` to `*` to copy all of crds-styles' svg
assets into your project.


#### Contributing to the DDK

The DDK is now a Jekyll project. The Styleguide is on continuous deployment and updates branches are merged into `master`.

Styles are still in `crds-styles` but they are now linked through `git submodules` instead of `npm`.

### Updating Styles in Styleguide

When working in the new `crds-styleguide` and `crds-styles` for the first time you will need to add the `crds-styles` submodule:

```$ git submodule add https://github.com/crdschurch/crds-styles.git vendor/gems/crds-styles ```

run command ```GIT ADD [SUBMODULE REPO] [OPTIONAL DIRECTORY]```

if submodule has already been added:
run `GIT SUBMODULE UPDATE` to update all submodules defined in .gitmodules file

if project is a ruby project, run BUNDLE UPDATE and all assets should be successfully updated/added


Versioning
--------

Versions are released sprintly following [semantic
versioning](https://semver.org/). In other words:

- Bug fixes and other minor changes: Patch release, increment the last number,
  e.g. 1.0.1
- New features which don't break existing features: Minor release, increment the
  middle number, e.g. 1.1.0
- Changes which break backwards compatibility: Major release, increment the
  first number, e.g. 2.0.0

License
--------

This project is licensed under the [3-Clause BSD
License](https://opensource.org/licenses/BSD-3-Clause).
