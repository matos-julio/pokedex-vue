// composable | usa as funcoes da api.js pra preparar os dados pro app
import { ref, onMounted } from "vue";
import { fetchPokemon, fetchPokemonDetails } from "./api";

export function usePokemons(limit = 9) {
  const pokemons = ref([]); // cria array vazia pra puxar os pokemon na api
  const totalPokemons = ref(0);

  const loadPokemons = async () => {
    const response = await fetchPokemon(limit);
    totalPokemons.value = response.count; // retorna o valor que for carregado

    const pokemonLista = response.results; // puxa o numero de pokemons definidos no limite

    const pokemonDetails = await Promise.all(
      // Promise.all = executa todas as promises ao mesmo tempo, e resolve
      pokemonLista.map(async (p) => {
        const pokemonData = await fetchPokemonDetails(p.url); // retorna os detalhes gerais do { pokemon }

        const speciesRes = await fetch(pokemonData.species.url);
        const speciesData = await speciesRes.json(); // retorna { species }

        const evolutionRes = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionRes.json(); // retorna a cadeia evolutiva

        return {
          ...pokemonData,
          speciesData,
          evolutionData,
        };
      }) // percorre cada item da lista, e faz fetch na url de cada pokemon (importante conferir o resultado da url)
    );

    pokemons.value = pokemonDetails; // traz os detalhes de cada pokemon puxado na api
  };
  // carrega automaticamente quando o composable for usado
  onMounted(() => {
    loadPokemons();
  });

  // *desestruturar o obj na hora de chamar a composable
  return {
    pokemons,
    totalPokemons, // retorna o total de pokemons que tiver sendo carregado
    loadPokemons,
  };
}
