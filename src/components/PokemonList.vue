<!-- Aqui cria a lista/grid com todos os cards de pokemon pra exibir na tela inicial -->
<template>
  <div class="container">
    <div class="sticky-top py-2 z-index-fixed">
      <PokemonSearchBar @search="handleSearch" />
    </div>

    <!-- Exibe a mensagem de erro caso não haja resultados -->
    <div v-if="noResults" class="alert alert-light d-flex flex-column justify-content-center" role="alert">
      <span class="text-center">
        Ops... Nenhum Pokémon encontrado. Tente pesquisar novamente.
      </span>
      <img src="../assets/confused-pikachu.png" alt="pikachu confuso" class="img-fluid mx-auto d-block img-error">
    </div>

    <!-- Lista de Pokemons -->
    <div class="row">
      <!-- 1 col mobile, 2 col telas medias, 3 col telas maiores -->
      <div class="col-12 col-sm-6 col-lg-4" v-for="pokemon in pokemonsFiltrados" :key="pokemon.id">
        <PokemonCard :pokemon="pokemon" @cardClick="handleCardClick(pokemon)" />
      </div>
    </div>

    <!-- tela de loading pra otimizar o carregamento da pagina -->
    <div v-if="isLoading" class="text-center my-3">
      <span>Carregando mais Pokémon...</span>
    </div>


  </div>

  <!-- Modal -->
  <PokemonInfoModal v-if="pokemonSelecionado" :pokemon="pokemonSelecionado" @close="pokemonSelecionado = null" />

</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { usePokemons } from '../services/usePokemons'; // api formatada, ja com os pokemons
import PokemonCard from './PokemonCard.vue';
import PokemonInfoModal from './PokemonInfoModal.vue';
import PokemonSearchBar from './PokemonSearchBar.vue';
import { filtrarPokemons } from '@/utils/pokemonFilters';
import { throttleScroll } from '@/utils/throttleScroll';

export default {
  name: "PokemonList", // pra ser chamado no app.vue
  components: {
    PokemonCard,
    PokemonInfoModal,
    PokemonSearchBar
  },
  setup() {
    const { pokemons, totalPokemons, loadPokemons, offset } = usePokemons(24) // numero de pokemos que aparecem na tela

    const pokemonSelecionado = ref(null) // verifica o pokemon clicado pra abrir o modal
    const handleCardClick = (pokemon) => {
      pokemonSelecionado.value = pokemon
    }

    // Filtros barra de pesquisa
    const searchInput = ref(''); // valor recebido na barra de pesquisa
    const noResults = ref(false);

    const pokemonsFiltrados = computed(() => {
      return filtrarPokemons(pokemons.value, searchInput.value);
    })

    const handleSearch = (input) => {
      searchInput.value = input;

      const resultado = filtrarPokemons(pokemons.value, input);
      noResults.value = resultado.length === 0;
    };

    // scroll infinito
    const isLoading = ref(false);

    const handleScroll = async () => {
      console.log("scroll:", {
    isLoading: isLoading.value,
    offset: offset.value,
    total: totalPokemons.value,
  });
      const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 400;

      if (scrollBottom && !isLoading.value) {
        isLoading.value = true;
        await loadPokemons();
        isLoading.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', throttleScroll(handleScroll, 180));
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', throttleScroll(handleScroll, 180));
    });


    return {
      pokemons,
      pokemonSelecionado,
      handleCardClick,
      handleSearch,
      noResults,
      pokemonsFiltrados,
      loadPokemons,
      isLoading
    }
  }

}
</script>

<style scoped>
  .img-error {
    max-width: 300px;
  }
</style>