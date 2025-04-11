<template>
  <h1 class="text-dark-custom fs-h2 text-center m-4 p-4">Sua Pokédex Completa</h1>
  <PokemonList />
</template>

<script>
import PokemonList from './components/PokemonList.vue';


export default {
  components: {
    PokemonList
  }
}

</script>

<style scoped>
</style>
