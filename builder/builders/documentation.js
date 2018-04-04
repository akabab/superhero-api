const { version } = require('../../package.json')

const baseUrl = `https://akabab.github.io/superhero-api/api`
const cdnBaseUrl = `https://cdn.rawgit.com/akabab/superhero-api/${version}/api`

const documentation = ({ endpoints, heroes }) => `
# API

Multiple universes superheroes open-source REST API

## References
- [glossary](glossary.md)

### base url
\`${baseUrl}\`

or cached CDN (faster)

\`${cdnBaseUrl}\`


### [routes](#routes-1)
- [\`/all.json\`](#alljson)
${endpoints.map(e => `- [\`/${e.name}\`](#${e.name})`).join('\n')}

### [images](#images-1)

----

## Routes

##### \`/all.json\`
GET all superheroes in a single JSON file

eg. [\`/all.json\`](${cdnBaseUrl}/all.json)

##### \`/id\`
GET superhero complete informations by id

eg. [\`/id/1.json\`](${cdnBaseUrl}/id/1.json)
\`\`\`json
${JSON.stringify(heroes[0], null, 2)}
\`\`\`

##### \`/powerstats\`
GET superhero powerstats by id

eg. [\`/powerstats/1.json\`](${cdnBaseUrl}/powerstats/1.json)
\`\`\`json
${JSON.stringify(heroes[0].powerstats, null, 2)}
\`\`\`

##### \`/appearance\`
GET superhero appearance by id

eg. [\`/appearance/1.json\`](${cdnBaseUrl}/appearance/1.json)
\`\`\`json
${JSON.stringify(heroes[0].appearance, null, 2)}
\`\`\`

##### \`/biography\`
GET superhero biography by id

eg. [\`/biography/1.json\`](${cdnBaseUrl}/biography/1.json)
\`\`\`json
${JSON.stringify(heroes[0].biography, null, 2)}
\`\`\`

##### \`/connections\`
GET superhero connections by id

eg. [\`/connections/1.json\`](${cdnBaseUrl}/connections/1.json)
\`\`\`json
${JSON.stringify(heroes[0].connections, null, 2)}
\`\`\`

##### \`/work\`
GET superhero work by id

eg. [\`/work/1.json\`](${cdnBaseUrl}/work/1.json)
\`\`\`json
${JSON.stringify(heroes[0].work, null, 2)}
\`\`\`


## Images
GET superhero image

- Thumb (~32x48)
[\`/images/thumbs/a-bomb.jpg\`](${cdnBaseUrl}/images/thumbs/a-bomb.jpg)

- Small (~165x240)
[\`/images/sm/a-bomb.jpg\`](${cdnBaseUrl}/images/sm/a-bomb.jpg)

- Medium (~240x320)
[\`/images/md/a-bomb.jpg\`](${cdnBaseUrl}/images/md/a-bomb.jpg)

- Large (~480x640)
[\`/images/lg/a-bomb.jpg\`](${cdnBaseUrl}/images/lg/a-bomb.jpg)
`

module.exports = { documentation }
