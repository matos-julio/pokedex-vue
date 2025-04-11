<!-- aqui vao entrar os detalhes pra criacao de cada card individualmente -->
<!-- Nome, ID, IMG, Tipo, Especie -->

<template>
  <div
    class="pokemon-card d-flex justify-content-between align-items-stretch gap-3 p-3 mb-3 rounded-4 shadow-sm"
    @click="emitCardClick">
    <div class="d-flex flex-column justify-content-between flex-grow-1">
      <div>
        <h2 class="m-0 fs-3 fw-bold text-capitalize">{{ pokemon.name }}</h2>
        <h5 class="m-0 fs-6 text-muted">#{{ pokemon.id }}</h5>
      </div>

      <div class="d-flex flex-wrap gap-2 mt-2 align-items-end">
        <TypeBadge
          v-for="(typeObj, index) in pokemon.types"
          :key="index"
          :type="typeObj.type.name"
        />
      </div>
    </div>

    <div class="card-image d-flex justify-content-center align-items-center rounded-4 px-2">
      <img
        :src="pokemon.sprites.other['official-artwork'].front_default"
        :alt="pokemon.name"
        class="img-fluid"
        style="max-height: 120px"
      />
    </div>
  </div>

</template>

<script>
import TypeBadge from './TypeBadge.vue'

export default {
  name: "PokemonCard",
  components: {
    TypeBadge
  },
  props: {
    pokemon: Object // recebe o valor da array Pokemons, dentro do PokemonList
  },
  emits: ["cardClick"], // evento personalizado
  setup(props, { emit }) {
    const emitCardClick = () => {
      emit("cardClick", props.pokemon)
    }

  console.log("pokemon recebido:", props.pokemon)

    // retorno de setup e objeto
    return { emitCardClick }
  }
}
</script>

<style scoped>
/* Ajuste de estilos customizados */
.pokemon-card {
  cursor: pointer;
}
.pokemon-card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: #f5f5f5;

}

.card-image img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}
</style>
