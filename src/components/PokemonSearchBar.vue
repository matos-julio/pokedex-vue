<!-- Componente da barra de pesquisa. | Usuario ira filtrar por nome e ID -->
<template>
  <div class="search-bar mb-4 position-relative">
    <input type="text" class="form-control pe-5" v-model="searchQuery" @input="emitSearch"
      placeholder="Buscar Pokémon pelo nome ou ID" />

    <button v-if="searchQuery" @click="clearSearch" type="button"
      class="btn btn-sm btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2" title="Limpar pesquisa">
      &times;
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "PokemonSearchBar",
  emits: ["search"],
  setup(_, { emit }) {
    // recebe o valor entro do input de forma reativa, e armazena
    const searchQuery = ref('')

    const emitSearch = () => {
      emit("search", searchQuery.value)
    }

    const clearSearch = () => {
      searchQuery.value = ""
      emit("search", "")
    }

    return { searchQuery, emitSearch, clearSearch }

  }
}
</script>

<style></style>