<!-- Aqui cria a lista/grid com todos os cards de pokemon pra exibir na tela inicial -->
<template>
  <div class="container">
    <PokemonSearchBar @search="handleSearch" />
    
    <!-- Exibe a mensagem de erro caso não haja resultados -->
    <div v-if="noResults" class="alert alert-warning" role="alert">
      Nenhum Pokémon encontrado. Tente um nome ou ID válido.
    </div>

    <!-- Lista de Pokemons -->
    <div class="row">
      <!-- 1 col mobile, 2 col telas medias, 3 col telas maiores -->
      <div class="col-12 col-sm-6 col-lg-4" v-for="pokemon in pokemonsFiltrados" :key="pokemon.id">
        <!--cria cada pokemon que vier na resposta do card | :pokemon = prop que o card recebe | "pokemon" resultado do loop -->
        <PokemonCard :pokemon="pokemon" @cardClick="handleCardClick(pokemon)" />
      </div>
    </div>
  </div>

  <!-- Modal -->
  <PokemonInfoModal v-if="pokemonSelecionado" :pokemon="pokemonSelecionado" @close="pokemonSelecionado = null" />

</template>

<script>
import { ref, computed } from 'vue';
import { usePokemons } from '../services/usePokemons'; // api formatada, ja com os pokemons
import PokemonCard from './PokemonCard.vue';
import PokemonInfoModal from './PokemonInfoModal.vue';
import PokemonSearchBar from './PokemonSearchBar.vue';
import { filtrarPokemons } from '@/utils/pokemonFilters';

export default {
  name: "PokemonList", // pra ser chamado no app.vue
  components: {
    PokemonCard,
    PokemonInfoModal,
    PokemonSearchBar
  },
  setup() {
    const { pokemons, totalPokemons } = usePokemons(51) // numero de pokemos que aparecem na tela

    const pokemonSelecionado = ref(null) // verifica o pokemon clicado pra abrir o modal
    const handleCardClick = (pokemon) => {
      pokemonSelecionado.value = pokemon
    }

    // Filtros barra de pesquisa
    const searchInput = ref('') // valor recebido na barra de pesquisa
    const noResults = ref(false);

    const pokemonsFiltrados = computed(() => {
      return filtrarPokemons(pokemons.value, searchInput.value, noResults);
    })


    const handleSearch = (input) => {
      searchInput.value = input
    }


    return {
      pokemons,
      pokemonSelecionado,
      handleCardClick,
      handleSearch,
      noResults,
      pokemonsFiltrados
    }

  }
}
</script>