import 'dotenv/config'
import cuid from 'cuid'
import { connect } from 'hyper-connect'

if (!process.env.HYPER) {
  throw new Error('HYPER connection string must be defined')
}

const hyper = connect(process.env.HYPER)

const ashId = cuid()
const brockId = cuid()
const mistyId = cuid()

const ashPokemon1 = {
  _id: cuid(),
  type: 'pokemon',
  name: 'Bulbasaur',
  parent: ashId,
  moves: [
    { name: 'vine-whip' },
    { name: 'solar-beam', pp: 11 },
    { name: 'sleep-powder' },
    { name: 'poison-powder' }
  ]
}

const ashPokemon2 = {
  _id: cuid(),
  type: 'pokemon',
  name: 'Squirtle',
  parent: ashId,
  moves: [
    { name: 'tackle' },
    { name: 'hydro-pump', pp: 7 },
    { name: 'bubble' },
    { name: 'withdraw' }
  ]
}

const ashPokemon3 = {
  _id: cuid(),
  type: 'pokemon',
  name: 'Charizard',
  parent: ashId,
  moves: [
    { name: 'strength' },
    { name: 'fire-blast', pp: 7 },
    { name: 'ember' },
    { name: 'slash' }
  ]
}

const ashPokemon4 = {
  _id: cuid(),
  type: 'pokemon',
  name: 'Pikachu',
  parent: ashId,
  moves: [
    { name: 'double-kick' },
    { name: 'thunder', pp: 12 },
    { name: 'thunder-wave' },
    { name: 'swift' }
  ]
}

const ashPokemon5 = {
  _id: cuid(),
  type: 'pokemon',
  name: 'Butterfree',
  parent: ashId,
  moves: [
    { name: 'cut' },
    { name: 'razor-leaf' },
    { name: 'poison-powder' },
    { name: 'sleep-powder' }
  ]
}

const ashPokemon6 = {
  _id: cuid(),
  type: 'pokemon',
  name: 'Pidgeotto',
  parent: ashId,
  moves: [
    { name: 'quick-attack' },
    { name: 'gust' },
    { name: 'tackle' },
    { name: 'fly' }
  ]
}

const ash = {
  _id: ashId,
  type: 'trainer',
  name: 'Ash'
}

const brockPokemon1 = {
  _id: cuid(),
  type: 'pokemon',
  name: 'Geodude',
  parent: brockId,
  moves: [
    { name: 'tackle' },
    { name: 'rock-throw' },
    { name: 'rock-smash' },
    { name: 'dig' }
  ]
}

const brockPokemon2 = {
  _id: cuid(),
  type: 'pokemon',
  name: 'Onix',
  parent: brockId,
  moves: [
    { name: 'tackle' },
    { name: 'bind' },
    { name: 'sandstorm' },
    { name: 'bide' }
  ]
}

const brock = {
  _id: brockId,
  type: 'trainer',
  name: 'Brock'
}

const mistyPokemon1 = {
  _id: cuid(),
  type: 'pokemon',
  name: 'Staryu',
  parent: mistyId,
  moves: [
    { name: 'bubble' },
    { name: 'bubble-beam' },
    { name: 'water-gun' },
    { name: 'confuse-ray' }
  ]
}

const mistyPokemon2 = {
  _id: cuid(),
  type: 'pokemon',
  name: 'Starmie',
  parent: mistyId,
  moves: [
    { name: 'hydro-pump', pp: 8 },
    { name: 'slam' },
    { name: 'water-gun' },
    { name: 'psychic' }
  ]
}

const mistyPokemon3 = {
  _id: cuid(),
  type: 'pokemon',
  name: 'Togepi',
  parent: mistyId,
  moves: [
    { name: 'metronome' }
  ]
}

const misty = {
  _id: mistyId,
  type: 'trainer',
  name: 'Misty'
}

const seed = [
  ash,
  ashPokemon1,
  ashPokemon2,
  ashPokemon3,
  ashPokemon4,
  ashPokemon5,
  ashPokemon6,
  brock,
  brockPokemon1,
  brockPokemon2,
  misty,
  mistyPokemon1,
  mistyPokemon2,
  mistyPokemon3
]

async function main () {
  await hyper.data.bulk(seed).then(console.log)
}

main()
