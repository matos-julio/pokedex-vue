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

export default {
  name: "PokemonList", // pra ser chamado no app.vue
  components: {
    PokemonCard,
    PokemonInfoModal,
    PokemonSearchBar
  },
  setup() {
    const { pokemons, totalPokemons } = usePokemons(50) // numero de pokemos que aparecem na tela

    const pokemonSelecionado = ref(null) // verifica o pokemon clicado pra abrir o modal, comeca por padrao com null
    // verifica qual o pokemon(card) foi clicado pra abrir o modal correspondente
    const handleCardClick = (pokemon) => {
      pokemonSelecionado.value = pokemon
    }

    // Filtros barra de pesquisa
    const searchTerm = ref('') // valor recebido na barra de pesquisa
    const noResults = ref(false) // verifica se nao tem resultados

    const pokemonsFiltrados = computed(() => {
      // se a pesquisa estiver vazia, exibe a lista com os pokemons
      if (!searchTerm.value) {
        noResults.value = false
        return pokemons.value

      }

      // verifica se foi digitado um Number, pra buscar o ID
      const searchId = Number(searchTerm.value);
      let filtered = []

      if (!isNaN(searchId)) {
        // verifica se o id esta dentro do intervalo (n. total de pokemons)
        if(searchId < 1 || searchId > totalPokemons.value) {
          noResults.value = true;
          return []
        }
        filtered = pokemons.value.filter(pokemon => pokemon.id === searchId);
      } else { 
        // se for digitado string, faz a busca pelo nome
        filtered = pokemons.value.filter(pokemon =>
          pokemon.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
      }

      noResults.value = filtered.length === 0
      return filtered

    });

    const handleSearch = (term) => {
      searchTerm.value = term
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