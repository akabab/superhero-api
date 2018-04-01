const fs = require('fs-extra')
const path = require('path')
const { promisify } = require('util')

const heroes = require('./sources/superheroes.json')
  .filter(h => !Object.values(h.powerstats).includes(null))

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

const buildFolder = async ({ name, getter }) => {
  await fs.ensureDir(path.join(apiFolderPath, name))

  heroes.forEach(hero => {
    const filepath = path.join(apiFolderPath, name, `${hero.id}.json`)
    const body = getter(hero)

    writeFile(filepath, JSON.stringify(body, null, 2))
      .then(err => console.log(err ? 'Error: ' + err : `${filepath} saved`))
      .catch(err => console.log(err))
  })
}

const buildImages = () => {}

const buildIndex = heroes => {
  const index = `# Superheroes index

| id | name |
| -- | ---- |
${heroes.map(h => `| ${h.id} | ${h.name} |`).join('\n')}
`
  writeFile(path.join(apiFolderPath, 'readme.md'), index)
}

const rebuild = async () => {
  await fs.ensureDir(apiFolderPath)
  await fs.emptyDir(apiFolderPath)
  await fs.copy('.backup/images', 'api/images')

  buildIndex(heroes)

  writeFile(path.join(apiFolderPath, 'all.json'), JSON.stringify(heroes, null, 2))

  folders.map(buildFolder)
}

rebuild()
