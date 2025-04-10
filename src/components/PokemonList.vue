<!-- Aqui cria a lista/grid com todos os cards de pokemon pra exibir na tela inicial -->
<script>
import PokemonCard from './PokemonCard.vue';
import { usePokemons } from '../services/usePokemons';

export default {
  name: "PokemonList", // pra ser chamado no app.vue
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
  <div class="container">
  <div class="row">
    <!-- 1 col mobile, 2 col telas medias, 3 col telas maiores -->
    <div class="col-12 col-sm-6 col-lg-4" v-for="pokemon in pokemons" :key="pokemon.id">
      <!--cria cada pokemon que vier na resposta do card | :pokemon = prop que o card recebe | "pokemon" resultado do loop -->
      <PokemonCard :pokemon="pokemon" />
    </div>
  </div>
</div>

</template>