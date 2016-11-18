# crds-styles

`crds-styles` provides the primary CSS framework and global style patterns that power [crossroads.net](http://crossroads.net) and it's related properties. Any elements and/or implementation details included within the [Digital Design Kit (DDK)](http://github.com/crdschurch/crds-styleguide) are provided by this NPM package. Any deviations from the patterns defined there should be implemented in the client application.

## Implementation

Until this project is published to NPM, you have two options to get it included as a dependency of your Node compatible application.

---

### Option #1 - Symlink Local Directory

Assuming the `crds-styles` repo resides in the same local directory as your project, you can do the following to setup the symlink...

    $ cd path/to/your/project-directory
    $ npm link ../crds-styles

Then update your project's `package.json` file with a reference to `crds-styles`, for example...

    {
      "name": "foo",
      "version": "0.0.0",
      "dependencies": {
        "crds-styles": "*"
      }
    }

---

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

## Versions &amp; Roadmap

We'll be developing the pattern library over the next few months and as we release new updates, we will increase the version number according to the following rules.

* Bug fixes and other minor changes: Patch release, increment the last number, e.g. 1.0.1
* New features which don't break existing features: Minor release, increment the middle number, e.g. 1.1.0
* Changes which break backwards compatibility: Major release, increment the first number, e.g. 2.0.0

Once we reach version 1.0.0, the DDK will be feature complete and will continue to be updated in manner described above.

## License

This project rocks and uses MIT-LICENSE.
