<script>
import { ref, onMounted } from 'vue';
import { fetchPokemon, fetchPokemonDetails } from './services/api';
import PokemonCard from './components/pokemonCard.vue';

export default {
  components: {
    PokemonCard
  },
  setup() {
    const pokemons = ref([]); // cria array vazia pra puxar os pokemon na api

    onMounted(async () => {
      const pokemonLista = await fetchPokemon(6)

      const pokemonDetails = await Promise.all( // Promise.all = executa todas as promises ao mesmo tempo, e resolve
        pokemonLista.map(p => fetchPokemonDetails(p.url)) // percorre cada item da lista, e faz fetch na url de cada pokemon (importante conferir o resultado da url)
      )

      pokemons.value = pokemonDetails
    })

    return { pokemons }
  }
}

</script>

<template>
  <h1>Pokedex</h1>

  <ul>
    <li v-for="pokemon in pokemons" :key="pokemon.id">
      <!--cria cada pokemon que vier na resposta do card | :pokemon = prop que o card recebe | "pokemon" resultado do loop -->
      <PokemonCard :pokemon="pokemon"></PokemonCard> 
    </li>
  </ul>
</template>

<style scoped></style>
