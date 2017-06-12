import * as assert from 'assert'
import * as fs from 'fs'
import * as path from 'path'
import { rmdir } from '@gradealabs/fs-utils'
import hanzo from './index'

describe('hanzo', function () {
  afterEach(function () {
    return rmdir('.hanzo')
  })

  it('should compile a .scss file', function (done) {
    hanzo(
      [ path.resolve(__dirname, './_fixtures/styles.scss') ],
      '.hanzo/out.css',
      { verbose: false, minify: true, sourceMaps: true }
    ).then(() => {
      assert.ok(fs.existsSync('.hanzo/out.css'))
      assert.ok(fs.existsSync('.hanzo/out.css.map'))
      assert.strictEqual(fs.readFileSync('.hanzo/out.css', 'utf8'), [
        `body{font-size:16px;color:red}h1{font-size:3.8rem}`,
        `/*# sourceMappingURL=out.css.map */`
      ].join('\n'))
    }).then(done, done)
  })

  it('should compile a .sass file', function (done) {
    hanzo(
      [ path.resolve(__dirname, './_fixtures/styles.sass') ],
      '.hanzo/out.css',
      { verbose: false, minify: true, sourceMaps: true }
    ).then(() => {
      assert.ok(fs.existsSync('.hanzo/out.css'))
      assert.ok(fs.existsSync('.hanzo/out.css.map'))
      assert.strictEqual(fs.readFileSync('.hanzo/out.css', 'utf8'), [
        `body{font-size:16px;color:red}h1{font-size:3.8rem}`,
        `/*# sourceMappingURL=out.css.map */`
      ].join('\n'))
    }).then(done, done)
  })

  it('should compile a .css file', function (done) {
    hanzo(
      [ path.resolve(__dirname, './_fixtures/styles.css') ],
      '.hanzo/out.css',
      { verbose: false, minify: true, sourceMaps: true }
    ).then(() => {
      assert.ok(fs.existsSync('.hanzo/out.css'))
      assert.ok(fs.existsSync('.hanzo/out.css.map'))
      assert.strictEqual(fs.readFileSync('.hanzo/out.css', 'utf8'), [
        `.widget{background:#777}`,
        `/*# sourceMappingURL=out.css.map */`
      ].join('\n'))
    }).then(done, done)
  })

  it('should compile .scss and .css files', function (done) {
    hanzo(
      [
        path.resolve(__dirname, './_fixtures/styles.css'),
        path.resolve(__dirname, './_fixtures/styles.scss')
      ],
      '.hanzo/out.css',
      { verbose: false, minify: true, sourceMaps: true }
    ).then(() => {
      assert.ok(fs.existsSync('.hanzo/out.css'))
      assert.ok(fs.existsSync('.hanzo/out.css.map'))
      assert.strictEqual(fs.readFileSync('.hanzo/out.css', 'utf8'), [
        `.widget{background:#777}body{font-size:16px;color:red}h1{font-size:3.8rem}`,
        `/*# sourceMappingURL=out.css.map */`
      ].join('\n'))
    }).then(done, done)
  })
})
