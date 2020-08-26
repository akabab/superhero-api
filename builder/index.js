const fs = require('fs-extra')
const path = require('path')
const { promisify } = require('util')

const { baseUrl, cdnBaseUrl } = require('./config')

const { buildImages } = require('./builders/images')
const { documentation } = require('./builders/documentation')
const { carecenter } = require('./builders/carecenter')
const { glossary } = require('./builders/glossary')

const readDir = promisify(fs.readdir)
const writeFile = promisify(fs.writeFile)
const rename = promisify(fs.rename)

const imageUrl = (k, slug) => `${cdnBaseUrl}/images/${k}/${slug}.jpg`

const prepareHeroes = heroes => {
  heroes.forEach(async h => {
    const slug = await fs.pathExists(`builder/sources/images/${h.slug}.jpg`)
      ? h.slug
      : 'no-portrait'

    h.images = {
      'xs': imageUrl('xs', slug),
      'sm': imageUrl('sm', slug),
      'md': imageUrl('md', slug),
      'lg': imageUrl('lg', slug)
    }
  })

  return heroes
}

const loadHeroes = dir => readDir(dir)
  .then(files => files.map(file => `./${dir}/${file}`))
  .then(files => Promise.all(files.map(f => fs.readJson(f))))
  .then(heroes => heroes.sort((a, b) => a.id - b.id))
  .then(prepareHeroes)

// Filter only thoses will powerstats non nulls
const filterValidHeroes = heroes => heroes
  .filter(h => !Object.values(h.powerstats).includes(null))

const apiFolderPath = 'api'

const endpoints = [
  { name: 'id', getBody: h => h },
  { name: 'powerstats', getBody: h => h.powerstats },
  { name: 'appearance', getBody: h => h.appearance },
  { name: 'biography', getBody: h => h.biography },
  { name: 'connections', getBody: h => h.connections },
  { name: 'work', getBody: h => h.work },
]

const buildEntries = hero => {
  const filename = `${hero.id}.json`

  endpoints.forEach(({ name, getBody }) => {
    const filepath = path.join(apiFolderPath, name, filename)
    const body = getBody(hero)

    writeFile(filepath, JSON.stringify(body, null, 2))
      .catch(err => console.log(err))
  })
}

const ensureFoldersStructure = async () => {
  await fs.ensureDir(apiFolderPath)
  await fs.emptyDir(apiFolderPath)

  for (const endpoint of endpoints) {
    await fs.ensureDir(path.join(apiFolderPath, endpoint.name))
  }
}

const rebuildImages = async () => {
  await buildImages()

  fs.copy('api/images', '.backup/images')
}

const rebuild = async () => {
  const heroes = await loadHeroes('builder/sources/superheroes')

  const validHeroes = filterValidHeroes(heroes)

  await ensureFoldersStructure()

  fs.copy('.backup/images', 'api/images')

  writeFile('api/readme.md', documentation({ endpoints, heroes: validHeroes }))

  writeFile('api/glossary.md', glossary(validHeroes))

  writeFile('api/carecenter.md', carecenter(heroes))

  writeFile('api/all.json', JSON.stringify(validHeroes, null, 2))

  validHeroes.forEach(buildEntries)

  console.log('build successful')
}

rebuild()
