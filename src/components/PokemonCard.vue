<!-- aqui vao entrar os detalhes pra criacao de cada card individualmente -->
<!-- Nome, ID, IMG, Tipo? Especie? -->

<script>
export default {
  name: "PokemonCard",
  props: {
    pokemon: Object // recebe o valor da array Pokemons, dentro do app.vue
  }
}
</script>

<template>

  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img :src="pokemon.sprites.front_default" class="img-fluid rounded-start" :alt="pokemon.name">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title"> {{ pokemon.name }} </h5>
          <p class="card-text"><small class="text-body-secondary"> {{ pokemon.id }} </small></p>
        </div>
      </div>
    </div>
  </div>
</template>