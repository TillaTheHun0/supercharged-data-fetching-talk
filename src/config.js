export const config = {
  hyper: process.env.HYPER,
  pokeClient: {
    baseUrl: 'https://pokeapi.co/api/v2'
  }
}

export const addConfigContext = (context) => ({ ...context, config })
