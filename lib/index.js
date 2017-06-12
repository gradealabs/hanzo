"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const sass = require("node-sass");
const CleanCss = require("clean-css");
const fs_utils_1 = require("@gradealabs/fs-utils");
/**
 * Bundles .css, .scss and .sass files into an output file.
 *
 * @param {string[]} entries Entry files to compile and bundle
 * @param {string} outFileName The file to write the bundle to
 * @return {Promise<void>}
 */
function hanzo(entries, outFileName, { verbose = false, sourceMaps = false, minify = false, includePaths = ['.'] } = {}) {
    return Promise.all(entries.map(fileName => {
        const ext = path.extname(fileName);
        switch (ext) {
            case '.css':
                return new Promise((resolve, reject) => {
                    fs.readFile(fileName, 'utf8', (error, styles) => {
                        error ? reject(error) : resolve({ styles, fileName });
                    });
                });
            case '.scss':
            case '.sass':
                return new Promise((resolve, reject) => {
                    sass.render({
                        file: fileName,
                        includePaths,
                        sourceMap: sourceMaps ? outFileName + '.map' : undefined,
                        sourceMapContents: true,
                        omitSourceMapUrl: true,
                        outFile: path.join(path.dirname(outFileName), path.basename(fileName)),
                        outputStyle: 'expanded',
                        precision: 5
                    }, (error, result) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve({
                                styles: result.css.toString(),
                                fileName,
                                map: result.map ? result.map.toString() : null
                            });
                        }
                    });
                });
            default:
                return Promise.reject(new Error(`Unsupported stylesheet ${fileName}`));
        }
    }))
        .then(results => {
        const css = new CleanCss({
            format: minify ? false : 'beautify',
            inline: ['local'],
            level: minify ? 1 : 0,
            rebase: false,
            sourceMap: sourceMaps,
            sourceMapInlineSources: true,
            returnPromise: true
        });
        const src = results.reduce((src, r) => {
            src[r.fileName] = { styles: r.styles, sourceMap: r.map };
            return src;
        }, {});
        return css.minify(src)
            .then(output => {
            if (output.errors && output.errors.length) {
                return Promise.reject(new Error(output.errors.join('\n---\n')));
            }
            else {
                if (output.warnings && output.warnings.length && verbose) {
                    console.warn(output.warnings.join('\n'));
                }
                return fs_utils_1.mkdir(path.dirname(outFileName)).then(() => {
                    let styles = output.styles;
                    if (output.sourceMap) {
                        styles +=
                            `\n/*# sourceMappingURL=${path.basename(outFileName + '.map')} */`;
                    }
                    return Promise.all([
                        new Promise((resolve, reject) => {
                            fs.writeFile(outFileName, styles, 'utf8', error => {
                                error ? reject(error) : resolve();
                            });
                        }),
                        output.sourceMap && new Promise((resolve, reject) => {
                            fs.writeFile(outFileName + '.map', output.sourceMap.toString(), 'utf8', error => error ? reject(error) : resolve());
                        })
                    ]);
                });
            }
        });
    });
}
exports.default = hanzo;
