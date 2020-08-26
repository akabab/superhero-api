
# API

Multiple universes superheroes open-source REST API

## References
- [glossary](glossary.md)

### base url
`https://akabab.github.io/superhero-api/api`

or cached CDN (faster)
`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api`

see
- [JSDelivr](https://www.jsdelivr.com/)
- [GitHack](https://raw.githack.com/)


### [routes](#routes-1)
- [`/all.json`](#alljson)
- [`/id`](#id)
- [`/powerstats`](#powerstats)
- [`/appearance`](#appearance)
- [`/biography`](#biography)
- [`/connections`](#connections)
- [`/work`](#work)

### [images](#images-1)

----

## Routes

##### `/all.json`
GET all superheroes in a single JSON file

eg. [`/all.json`](https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json)

##### `/id`
GET superhero complete informations by id

eg. [`/id/1.json`](https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/1.json)
```json
{
  "id": 1,
  "name": "A-Bomb",
  "slug": "1-a-bomb",
  "powerstats": {
    "intelligence": 38,
    "strength": 100,
    "speed": 17,
    "durability": 80,
    "power": 24,
    "combat": 64
  },
  "appearance": {
    "gender": "Male",
    "race": "Human",
    "height": [
      "6'8",
      "203 cm"
    ],
    "weight": [
      "980 lb",
      "441 kg"
    ],
    "eyeColor": "Yellow",
    "hairColor": "No Hair"
  },
  "biography": {
    "fullName": "Richard Milhouse Jones",
    "alterEgos": "No alter egos found.",
    "aliases": [
      "Rick Jones"
    ],
    "placeOfBirth": "Scarsdale, Arizona",
    "firstAppearance": "Hulk Vol 2 #2 (April, 2008) (as A-Bomb)",
    "publisher": "Marvel Comics",
    "alignment": "good"
  },
  "work": {
    "occupation": "Musician, adventurer, author; formerly talk show host",
    "base": "-"
  },
  "connections": {
    "groupAffiliation": "Hulk Family; Excelsior (sponsor), Avengers (honorary member); formerly partner of the Hulk, Captain America and Captain Marvel; Teen Brigade; ally of Rom",
    "relatives": "Marlo Chandler-Jones (wife); Polly (aunt); Mrs. Chandler (mother-in-law); Keith Chandler, Ray Chandler, three unidentified others (brothers-in-law); unidentified father (deceased); Jackie Shorr (alleged mother; unconfirmed)"
  },
  "images": {
    "xs": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg",
    "sm": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg",
    "md": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg",
    "lg": "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg"
  }
}
```

##### `/powerstats`
GET superhero powerstats by id

eg. [`/powerstats/1.json`](https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/powerstats/1.json)
```json
{
  "intelligence": 38,
  "strength": 100,
  "speed": 17,
  "durability": 80,
  "power": 24,
  "combat": 64
}
```

##### `/appearance`
GET superhero appearance by id

eg. [`/appearance/1.json`](https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/appearance/1.json)
```json
{
  "gender": "Male",
  "race": "Human",
  "height": [
    "6'8",
    "203 cm"
  ],
  "weight": [
    "980 lb",
    "441 kg"
  ],
  "eyeColor": "Yellow",
  "hairColor": "No Hair"
}
```

##### `/biography`
GET superhero biography by id

eg. [`/biography/1.json`](https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/biography/1.json)
```json
{
  "fullName": "Richard Milhouse Jones",
  "alterEgos": "No alter egos found.",
  "aliases": [
    "Rick Jones"
  ],
  "placeOfBirth": "Scarsdale, Arizona",
  "firstAppearance": "Hulk Vol 2 #2 (April, 2008) (as A-Bomb)",
  "publisher": "Marvel Comics",
  "alignment": "good"
}
```

##### `/connections`
GET superhero connections by id

eg. [`/connections/1.json`](https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/connections/1.json)
```json
{
  "groupAffiliation": "Hulk Family; Excelsior (sponsor), Avengers (honorary member); formerly partner of the Hulk, Captain America and Captain Marvel; Teen Brigade; ally of Rom",
  "relatives": "Marlo Chandler-Jones (wife); Polly (aunt); Mrs. Chandler (mother-in-law); Keith Chandler, Ray Chandler, three unidentified others (brothers-in-law); unidentified father (deceased); Jackie Shorr (alleged mother; unconfirmed)"
}
```

##### `/work`
GET superhero work by id

eg. [`/work/1.json`](https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/work/1.json)
```json
{
  "occupation": "Musician, adventurer, author; formerly talk show host",
  "base": "-"
}
```


## Images
GET superhero image

- Thumb (~32x48)
[`/images/xs/1-a-bomb.jpg`](https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/1-a-bomb.jpg)

- Small (~160x240)
[`/images/sm/1-a-bomb.jpg`](https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/1-a-bomb.jpg)

- Medium (~320x480)
[`/images/md/1-a-bomb.jpg`](https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/1-a-bomb.jpg)

- Large (~480x640)
[`/images/lg/1-a-bomb.jpg`](https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg)
