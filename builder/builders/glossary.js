const { baseUrl, cdnBaseUrl } = require('../config')

const glossary = heroes => `# Superhero Glossary

|    | id | name | INT | STR | SPD | DUR | POW | CMB |
| -- | -- | ---- | --- | --- | --- | --- | --- | --- |
${heroes
  .map(h =>`| ![](${h.images.xs}) | ${h.id} | ${h.name} | ${Object.values(h.powerstats).join(' | ')} |`)
  .join('\n')}
`

module.exports = { glossary }
