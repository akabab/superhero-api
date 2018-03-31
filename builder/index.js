const request = require('request')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const source = require('./source.json')

const folders = [
  { key: 'id', getter: h => h },
  { key: 'powerstats', getter: h => h.powerstats },
  { key: 'appearance', getter: h => h.appearance },
  { key: 'biography', getter: h => h.biography },
  { key: 'connections', getter: h => h.connections },
  { key: 'work', getter: h => h.work },
]

const apiFolderPath = 'api'

const writeFile = promisify(fs.writeFile)

const build = ({ key, getter }) => {
  // if folder 'key' doesn't exists -> mkdir

  source.forEach(hero => {
    const filepath = path.join(apiFolderPath, key, `${hero.id}.json`)
    const body = getter(hero)

    writeFile(filepath, JSON.stringify(body, null, 2))
      .then(err => console.log(err ? 'Error: ' + err : `${filepath} saved`))
      .catch(err => console.log(err))
  })
}

folders.map(build)
