<!-- Aqui cria a lista/grid com todos os cards de pokemon pra exibir na tela inicial -->
<template>
  <div class="container">
  <div class="row">
    <!-- 1 col mobile, 2 col telas medias, 3 col telas maiores -->
    <div class="col-12 col-sm-6 col-lg-4" v-for="pokemon in pokemons" :key="pokemon.id">
      <!--cria cada pokemon que vier na resposta do card | :pokemon = prop que o card recebe | "pokemon" resultado do loop -->
      <PokemonCard :pokemon="pokemon" @cardClick="handleCardClick(pokemon)"/>
    </div>
  </div>
</div>

<PokemonInfoModal v-if="pokemonSelecionado" :pokemon="pokemonSelecionado" @close="pokemonSelecionado = null" />

</template>

<script>
import PokemonCard from './PokemonCard.vue';
import { usePokemons } from '../services/usePokemons';
import { ref } from 'vue';
import PokemonInfoModal from './PokemonInfoModal.vue';

export default {
  name: "PokemonList", // pra ser chamado no app.vue
  components: {
    PokemonCard,
    PokemonInfoModal 
  },
  setup() {
    const { pokemons } = usePokemons()
    console.log(pokemons)
    console.log("Pokemons dentro da lista: ", pokemons.value)


    const pokemonSelecionado = ref(null) 
    // verifica qual o pokemon(card) foi clicado pra abrir o modal correspondente
    const handleCardClick = (pokemon) => {
      pokemonSelecionado.value = pokemon
      console.log(pokemon.name)
    }


    return { pokemons, pokemonSelecionado, handleCardClick }

  }
}
</script>