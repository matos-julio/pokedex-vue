// composable | usa as funcoes da api.js pra preparar os dados pro app
import { ref, onMounted } from 'vue';
import { fetchPokemon, fetchPokemonDetails } from './api';

export function usePokemons(limit = 9) {
  const pokemons = ref([]); // cria array vazia pra puxar os pokemon na api

  const loadPokemons = async() => {
    const pokemonLista = await fetchPokemon(limit); // puxa o numero de pokemons definidos no limite
    const pokemonDetails = await Promise.all( // Promise.all = executa todas as promises ao mesmo tempo, e resolve
      pokemonLista.map(p => fetchPokemonDetails(p.url)) // percorre cada item da lista, e faz fetch na url de cada pokemon (importante conferir o resultado da url)
    );

    pokemons.value = pokemonDetails; // traz os detalhes de cada pokemon puxado na api
  }
  // carrega automaticamente quando o composable for usado
  onMounted(() => {
    loadPokemons();
  });

  // *desestruturar o obj na hora de chamar a composable
  return {
    pokemons,
    loadPokemons
  };
}