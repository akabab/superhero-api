const fs = require('fs-extra')
const path = require('path')
const { promisify } = require('util')

const writeFile = promisify(fs.writeFile)

const heroes = require('./sources/superheroes.json')

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

const buildImages = () => {}

const buildGlossary = heroes => {
  const glossary = `# Superheroes glossary

|    | id | name | INT | STR | SPD | DUR | POW | CMB |
| -- | -- | ---- | --- | --- | --- | --- | --- | --- |
${heroes
  .map(h =>`| ![](${h.images.thumb.split('/api/')[1]}) | ${h.id} | ${h.name} | ${Object.values(h.powerstats).join(' | ')} |`)
  .join('\n')}
`
  writeFile('api/glossary.md', glossary)
}

const isObject = o => o && typeof o === 'object' && !Array.isArray(o)
const missingKeys = (object, keys = [], k = '') => {
  for (const [key, value] of Object.entries(object)) {
    const rest = k.length ? '.' + key : key

    if (isObject(value)) {
      missingKeys(value, keys, k + rest)
      continue
    }

    if ([undefined, null, '', '-', ' - '].includes(value)) {
      keys.push(k + rest)
    }
  }

  return keys
}

const getHeroHealth = hero => {
  const health = []

  // if (Object.values(hero.powerstats).includes(null)) {
  //   health.push('missing powerstats values')
  // }

  if (hero.images.thumb.split('/')[7] === 'no-portrait.jpg') {
    health.push('missing image')
  }

  missingKeys(hero).forEach(k => {
    health.push(`missing ${k}`)
  })

  return health
}

const getDuplicates = heroes => {
  const duplicates = []

  heroes.forEach((hero, i, heroes) => {
    if (heroes.map(h => h.name).indexOf(hero.name) !== i
      && !duplicates.includes(hero.name)) {
      duplicates.push(hero.name)
    }
  })

  return duplicates
}

const buildGlossaryX = heroes => {
  const glossary = `# Superheroes glossaryX

|    |    | id | name | issues |
| -- | -- | -- | ---- | ------ |
${heroes
  .map(h =>`| ${getHeroHealth(h).length ? '😰' : '😀'} | ![](${h.images.small.split('/api/')[1]}) | ${h.id} | ${h.name} | ${getHeroHealth(h).map(h => `- ${h}`).join('<br/>')} |`)
  .join('\n')}


### Duplicates

| name |
| ---- |
${getDuplicates(heroes).map(h => `| ${h} |`).join('\n')}
`
  writeFile('api/glossaryX.md', glossary)
}

const ensureFoldersStructure = async () => {
  await fs.ensureDir(apiFolderPath)
  await fs.emptyDir(apiFolderPath)

  for (const endpoint of endpoints) {
    await fs.ensureDir(path.join(apiFolderPath, endpoint.name))
  }
}

// Filter only thoses will powerstats non nulls
const filterValidHeroes = heroes => heroes
  .filter(h => !Object.values(h.powerstats).includes(null))

const rebuild = async () => {
  await ensureFoldersStructure()

  await fs.copy('.backup/images', 'api/images')
  await fs.copy('builder/sources/documentation.md', 'api/readme.md')

  buildGlossaryX(heroes)

  const validHeroes = filterValidHeroes(heroes)

  buildGlossary(validHeroes)

  writeFile('api/all.json', JSON.stringify(validHeroes, null, 2))

  validHeroes.forEach(buildEntries)

  console.log('build successful')
}

rebuild()
