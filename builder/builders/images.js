const fs = require('fs-extra')
const path = require('path')
const { promisify } = require('util')
const imagemagick = require('../lib/imagemagick')
const { Spinner } = require('clui')

const readDir = promisify(fs.readdir)

const sizes = [
  { key: 'xs', width:  32, height:  48, quality: 1.0 },
  { key: 'sm', width: 160, height: 240, quality: 1.0 },
  { key: 'md', width: 320, height: 480, quality: 1.0 },
  { key: 'lg', width: 480, height: 640, quality: 1.0 },
]

const crop = options => new Promise((s, f) => {
  imagemagick.crop(options, (err, stdout, stderr) => err ? f(err): s(stdout))
})

const prepareCropOptions = file => sizes.map(size => ({
  srcPath: `builder/sources/images/${file}`,
  dstPath: `api/images/${size.key}/${file}`,
  width: size.width,
  height: size.height,
  quality: size.quality,
  gravity: "Center"
}))

const flatArray = arr => arr.reduce((a, b) => [ ...a, ...b ], [])

const buildImages = async () => {
  await fs.ensureDir('api/images')

  for (const size of sizes) {
    await fs.ensureDir(`api/images/${size.key}`)
  }

  const spin = new Spinner('Building images...', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷'])

  const files = (await readDir('builder/sources/images'))

  const cropOptions = flatArray(files.map(prepareCropOptions))

  let i = 0
  spin.start()
  for (const options of cropOptions) {
    await crop(options)

    const progress = (i / cropOptions.length) * 100
    spin.message(`Building images... ${progress.toFixed(2)}%`)
    i++
  }
  spin.stop()
}

module.exports = { buildImages }
