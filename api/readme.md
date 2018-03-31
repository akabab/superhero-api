# superhero-api

### base url
`https://akabab.github.io/superhero-api/api/`

### routes
- [`/id`](#id)
- [`/powerstats`](#powerstats)
- [`/appearance`](#appearance)
- [`/biography`](#biography)
- [`/connections`](#connections)
- [`/work`](#work)


##### `/id`

> eg. `/id/1.json`
```
{
  "id": 1,
  "name": "A-Bomb",
  "powerstats": {
    "intelligence": 38,
    "strength": 100,
    "speed": 17,
    "durability": 80,
    "power": 24,
    "combat": 64
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
  "work": {
    "occupation": "Musician, adventurer, author; formerly talk show host",
    "base": "-"
  },
  "connections": {
    "groupAffiliation": "Hulk Family; Excelsior (sponsor), Avengers (honorary member); formerly partner of the Hulk, Captain America and Captain Marvel; Teen Brigade; ally of Rom",
    "relatives": "Marlo Chandler-Jones (wife); Polly (aunt); Mrs. Chandler (mother-in-law); Keith Chandler, Ray Chandler, three unidentified others (brothers-in-law); unidentified father (deceased); Jackie Shorr (alleged mother; unconfirmed)"
  },
  "image": {
    "url": "https://www.superherodb.com/pictures/portraits/a-bomb.jpg"
  }
}
```

##### `/powerstats`

> eg. `/powerstats/1.json`
```
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

> eg. `/appearance/1.json`
```
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

> eg. `/biography/1.json`
```
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

> eg. `/connections/1.json`
```
{
  "groupAffiliation": "Hulk Family; Excelsior (sponsor), Avengers (honorary member); formerly partner of the Hulk, Captain America and Captain Marvel; Teen Brigade; ally of Rom",
  "relatives": "Marlo Chandler-Jones (wife); Polly (aunt); Mrs. Chandler (mother-in-law); Keith Chandler, Ray Chandler, three unidentified others (brothers-in-law); unidentified father (deceased); Jackie Shorr (alleged mother; unconfirmed)"
}
```

##### `/work`

> eg. `/work/1.json`
```
{
  "occupation": "Musician, adventurer, author; formerly talk show host",
  "base": "-"
}
```
