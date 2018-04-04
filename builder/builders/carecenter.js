const { version } = require('../../package.json')

const baseUrl = `https://akabab.github.io/superhero-api/api`
const cdnBaseUrl = `https://cdn.rawgit.com/akabab/superhero-api/${version}/api`

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

const healthStatus = hero => {
  if (hero.health.length === 0) return '😎'
  if ([1,2].includes(hero.health.length)) return '🙂'
  if ([3,4].includes(hero.health.length)) return '😰'
  if (hero.health.length > 4) return '🤢'
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

const getHeroHealth = hero => {
  const health = []

  if (hero.images.xs.split('/')[7] === 'no-portrait.jpg') {
    health.push('missing image')
  }

  missingKeys(hero).forEach(k => {
    health.push(`missing ${k}`)
  })

  return health
}

const carecenter = heroes => {
  heroes = heroes.map(h => ({ ...h, health: getHeroHealth(h) }))

  const duplicates = getDuplicates(heroes)

  return `# Superhero Care Center

- **${duplicates.length}** [duplicates](#duplicates)

### Care Center Status
- 😎 **${heroes.filter(h => h.health.length === 0).length}** feeling good!
- 🙂 **${heroes.filter(h => [1,2].includes(h.health.length)).length}** in good shape
- 😰 **${heroes.filter(h => [3,4].includes(h.health.length)).length}** not so well
- 🤢 **${heroes.filter(h => h.health.length > 4).length}** having a bad time

|    |    | id | name | issues |
| -- | -- | -- | ---- | ------ |
${heroes
  .map(h =>`| ${healthStatus(h)} | ![](${cdnBaseUrl}/sm/${h.slug}.jpg) | ${h.id} | ${h.name} | ${h.health.map(h => `- ${h}`).join('<br/>')} |`)
  .join('\n')}


### Duplicates

| name |
| ---- |
${duplicates.map(h => `| ${h} |`).join('\n')}
`
}

module.exports = { carecenter }
