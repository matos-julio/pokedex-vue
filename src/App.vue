<script>
import PokemonCard from './components/pokemonCard.vue';
import { usePokemons } from './services/usePokemons';

export default {
  components: {
    PokemonCard
  },
  setup() {
    const { pokemons } = usePokemons()
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
