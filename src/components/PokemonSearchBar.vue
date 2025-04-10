<!-- Componente da barra de pesquisa. | Usuario ira filtrar por nome e ID -->
<template>
  <div class="search-bar mb-4">
    <input type="text" class="form-control" v-model="searchQuery" @input="emitSearch"
      placeholder="Buscar Pokémon pelo nome ou ID" />
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

    return { searchQuery, emitSearch }
  }
}
</script>

<style></style>