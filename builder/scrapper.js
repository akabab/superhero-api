const request = require('request')
const fs = require('fs')

const token = '10155418148196149'

const heroes = require('./heroes.json')

const getHero = id => {
  if (id > 731) return

  const url = `http://superheroapi.com/api/${token}/${id}`

  return fetch(url)
    .then(res => heroes.push(res.json()))
    .catch(() => getHero(id))
    .then(() => getHero(id + 1))
}


const ids = [ ...Array(5).keys() ].slice(1)

const getHeroes = () => {
  Promise.all(ids.map(getHero))
    .then(heroes => console.log(heroes))
}

const fetchAndSaveFile = (url, filename) => {
  request(url, { encoding: 'binary' }, (error, response, body) => {
    fs.writeFile(filename, body, 'binary', err => console.log(err))
  })
}

const getImage = index => {
  if (!heroes[index]) return

  const url = heroes[index].image.url
  const filename = url.split('/')[5]

  request(url, { encoding: 'binary' }, (error, response, body) => {
    fs.writeFile('images/' + filename, body, 'binary', err => {
      getImage(index + 1)
      console.log(err ? 'Error: ' + err : `${filename} saved`)
    })
  })
}

// getImage(0)

const toKebabCase = string => string.replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/\s+/g, '-').toLowerCase()

// sourceHeroes.forEach(hero => {
//   const imageFileName = hero.images.thumb.split('/thumbs/')[1] // .split('.jpg')[0]
//   const slug = `${hero.id}-${toKebabCase(hero.name)}`

//   hero = {
//     id: hero.id,
//     name: hero.name,
//     slug,
//     powerstats: hero.powerstats,
//     appearance: hero.appearance,
//     biography: hero.biography,
//     work: hero.work,
//     connections: hero.connections,
//   }

//   const filepath = `builder/sources/superheroes/${hero.slug}.json`

//   // if (imageFileName !== 'no-portrait.jpg') {
//   //   rename(`builder/sources/imgs/${imageFileName}`, `builder/sources/imgs/${hero.slug}.jpg`)
//   //     .catch(err => console.log(err))
//   // }

//   writeFile(filepath, JSON.stringify(hero, null, 2))
// })
