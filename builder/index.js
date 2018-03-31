const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

const heroes = require('./sources/superheroes.json')

const folders = [
  { name: 'id', getter: h => h },
  { name: 'powerstats', getter: h => h.powerstats },
  { name: 'appearance', getter: h => h.appearance },
  { name: 'biography', getter: h => h.biography },
  { name: 'connections', getter: h => h.connections },
  { name: 'work', getter: h => h.work },
]

const apiFolderPath = 'api'

const writeFile = promisify(fs.writeFile)

const buildFolder = ({ name, getter }) => {
  mkdirp(path.join(apiFolderPath, name))

  heroes.forEach(hero => {
    const filepath = path.join(apiFolderPath, name, `${hero.id}.json`)
    const body = getter(hero)

    writeFile(filepath, JSON.stringify(body, null, 2))
      .then(err => console.log(err ? 'Error: ' + err : `${filepath} saved`))
      .catch(err => console.log(err))
  })
}

const buildImages = () => {}

const clean = () => rimraf(apiFolderPath, _ => _)

const rebuild = () => {
  // clean()

  mkdirp(apiFolderPath)

  writeFile(path.join(apiFolderPath, 'all.json'), JSON.stringify(heroes, null, 2))

  folders.map(buildFolder)
}

rebuild()
