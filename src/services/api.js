// arquivo pra fazer o fetch direto da API
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

// funcao pra puxar todos os pokemon da api
// limit = pokemons por pagina
// offset = comeco da busca na lista
export async function fetchPokemon(limit= 6, offset = 0) { //define quantos pokemon a api vai puxar | 6 = padrao
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  const data = await response.json()  
  return data // objeto contendo cada pokemon {name, url}
}

export async function fetchPokemonDetails(url) {
  const response = await fetch(url) // a url do objeto do fetch anterior
  const data = await response.json()

  // Pega os dados da espécie
  const speciesResponse = await fetch(data.species.url);
  const speciesData = await speciesResponse.json();

  // Pega a cadeia evolutiva
  const evolutionResponse = await fetch(speciesData.evolution_chain.url);
  const evolutionData = await evolutionResponse.json();

  return {
    ...data,
    speciesData,
    evolutionData
  } // retorna todos os dados do pokemon
}