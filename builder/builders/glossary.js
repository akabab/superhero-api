const { version } = require('../../package.json')

const baseUrl = `https://akabab.github.io/superhero-api/api`
const cdnBaseUrl = `https://cdn.rawgit.com/akabab/superhero-api/${version}/api`

const glossary = heroes => `# Superhero Glossary

|    | id | name | INT | STR | SPD | DUR | POW | CMB |
| -- | -- | ---- | --- | --- | --- | --- | --- | --- |
${heroes
  .map(h =>`| ![](${cdnBaseUrl}/xs/${h.slug}.jpg) | ${h.id} | ${h.name} | ${Object.values(h.powerstats).join(' | ')} |`)
  .join('\n')}
`

module.exports = { glossary }
