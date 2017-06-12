# Hanzo

Hanzo is a .css/.scss/.sass bundler.

## Quick Start

    npm install gradealabs/hanzo -S

To use the API:

    import hanzo from '@gradealabs/hanzo'

    hanzo(
      [ 'sass/styles.scss', 'css/other.css' ],
      'dest/styles/styles.css',
      {
        includePaths: [ 'sass' ],
        minify: true,
        sourceMaps: true
      }
    ).then(() => console.log('styes bundled!'))
    .catch(error => console.error(error))

To use the CLI:

    {
      "scripts": {
        "bundle:styles": "hanzo sass/styles.scss css/other.css"
      }
    }

## CLI

    Usage: hanzo [options] file.css file.scss ...

    Options:
    --config            Path to JSON config file
    --verbose, -V       Print warnings to console       [boolean] [default: false]
    --minify, -M        Minify the generated bundle     [boolean] [default: false]
    --sourcemaps, -S    Generate source maps            [boolean] [default: false]
    --outfile, -O       The bundle output file                 [string] [required]
    --includepaths, -I  Include paths for .scss/.sass files
                                                            [array] [default: ["."]]
    --help              Show help                                        [boolean]

Example:

    node ./node_modules/.bin/hanzo sass/styles.sass

Or in a `package.json` (installed locally):

    {
      "scripts": {
        "build:styles": "hanzo sass/styles.sass"
      }
    }

## API

**hanzo(entryFiles, outFileName, options)**

Bundles .css/.scss/.sass files into a single file.

Supported options:

- `verbose` {default: false} Determines if compilation warnings are logged
- `sourceMaps` {default: false} Determines if source maps are generated
- `minify` {default: false} Determines if the bundle is minified
- `includePaths` {default: ['.']} The include paths for Sass imports

Example:

    import hanzo from '@gradealabs/hanzo'

    hanzo(
      [ 'sass/styles.scss', 'css/other.css' ],
      'dest/styles/styles.css',
      {
        includePaths: [ 'sass' ],
        minify: true,
        sourceMaps: true
      }
    ).then(() => console.log('styes bundled!'))
    .catch(error => console.error(error))

## Building

To build the source

    npm run build
    npm run build:node

To clean all generated folders

    npm run clean

## Testing

Unit tests are expected to be colocated next to the module/file they are testing
and have the following suffix `.test.js`.

To run unit tests through [istanbul](https://istanbul.js.org/) and
[mocha](http://mochajs.org/)

    npm test

## Maintainence

To check what modules in `node_modules` is outdated

    npm run audit

To update outdated modules while respecting the semver rules in the package.json

    npm update

To update a module to the latest major version (replacing what you have)

    npm install themodule@latest -S (if to save in dependencies)
    npm install themodule@latest -D (if to save in devDependencies)
