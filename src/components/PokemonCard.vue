<!-- aqui vao entrar os detalhes pra criacao de cada card individualmente -->
<!-- Nome, ID, IMG, Tipo, Especie -->

<template>
  <div class="pokemon-card d-flex justify-content-between align-items-center p-3 mb-3 rounded shadow" @click="emitCardClick">
    <div class="card-info">
      <h2 class="pokemon-name">{{ pokemon.name }}</h2>
      <h5 class="pokemon-id">#{{ pokemon.id }}</h5>
      <p class="pokemon-especies">Especie: {{ pokemon.speciesData.name }}</p>
      <p>Evolução inicial: {{ pokemon.evolutionData.chain.species.name }}</p>


      <!-- tipo / especie -->
      <div class="badges mt-2">
        <span class="badge type-badge">{{ pokemon.types[0].type.name }}</span>
        <span class="badge species-badge">{{ pokemon.species.name }}</span>
      </div>
    </div>

    <div class="card-image">
      <img :src="pokemon.sprites.other['official-artwork'].front_default" :alt="pokemon.name" />
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    pokemon: Object // recebe o valor da array Pokemons, dentro do PokemonList
  },
  emits:["cardClick"], // evento personalizado
  setup(props, { emit }) {
    const emitCardClick = () => {
      emit("cardClick", props.pokemon)
    }

    // retorno de setup e objeto
    return { emitCardClick }
  }
}
</script>

<style scoped>
/* Ajuste de estilos customizados */

.pokemon-card {
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  display: flex;
  gap: 20px;
  max-width: 600px;
  min-height: 180px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
/* resposta visual pra mostar que usuario pode clicar no card */
.pokemon-card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: #f5f5f5;

}

.card-info {
  flex-grow: 1;
}

.pokemon-name {
  margin: 0;
  font-size: 1.75rem;
  font-weight: bold;
  text-transform: capitalize;
}

.pokemon-id {
  margin: 0;
  font-size: 1rem;
  color: #777;
}

.badges {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.badge {
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
}

.type-badge {
  background-color: #4caf50; /* verde como placeholder */
}

.species-badge {
  background-color: #2196f3; /* azul como placeholder */
}

.card-image img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}
</style>

