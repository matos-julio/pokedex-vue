// arquivo pra fazer o fetch direto da API
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

// funcao pra puxar todos os pokemon da api
export async function fetchPokemon(limit= 6) { //define quantos pokemon a api vai puxar | 6 = padrao
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
  const data = await response.json()  
  return data.results // objeto contendo cada pokemon {name, url}
}

export async function fetchPokemonDetails(url) {
  const response = await fetch(url) // a url do objeto do fetch anterior
  const data = await response.json()
  return data // retorna todos os dados do pokemon
}