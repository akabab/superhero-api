const { version } = require('../package.json')

const baseUrl = `https://akabab.github.io/superhero-api/api`
const cdnBaseUrl = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@${version}/api`

// switch to githack if jsdelivr dies
// const cdnBaseUrl = `https://rawcdn.githack.com/akabab/superhero-api/${version}/api`

module.exports = { baseUrl, cdnBaseUrl }