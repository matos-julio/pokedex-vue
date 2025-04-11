// composable | usa as funcoes da api.js pra preparar os dados pro app
import { ref, onMounted } from "vue";
import { fetchPokemon, fetchPokemonDetails } from "./api";

export function usePokemons(limit = 9) {
  const pokemons = ref([]); // cria array vazia pra puxar os pokemon na api
  const totalPokemons = ref(0);
  const offset = ref(0); // estado pra controle da pagina

  // Busca todos os dados detalhados de um Pokémon individual:
  // dados principais, espécie e cadeia evolutiva.
  const getPokemonFullData = async (pokemon) => {
    const pokemonData = await fetchPokemonDetails(pokemon.url); // retorna os detalhes gerais do { pokemon }

    const speciesRes = await fetch(pokemonData.species.url);
    const speciesData = await speciesRes.json(); // retorna { species }

    const evolutionRes = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionRes.json(); // retorna a cadeia evolutiva

    return {
      ...pokemonData,
      speciesData,
      evolutionData,
    };
  };

  // Carrega a lista de Pokémons com base no limite definido,
  // e monta os detalhes completos de cada um (via getPokemonFullData)
  const loadPokemons = async () => {
    const response = await fetchPokemon(limit, offset.value);
    totalPokemons.value = response.count; // retorna o valor que for carregado
    const pokemonLista = response.results; // puxa o numero de pokemons definidos no limite

    const pokemonDetails = await Promise.all(
      pokemonLista.map(getPokemonFullData)
    );
    pokemons.value.push(...pokemonDetails);

    // atualiza o offset pro proximo fetch
    offset.value += limit;
  };

  // carrega automaticamente quando o composable for usado
  onMounted(loadPokemons);

  return {
    pokemons,
    totalPokemons,
    loadPokemons,
  };
}
