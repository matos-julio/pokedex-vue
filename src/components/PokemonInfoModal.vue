<!-- modal com informacoes detalhadas de cada pokemon -->
<template>
  <div class="modal fade show d-block" tabindex="-1" @click.self="fecharModal" style="background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ pokemon.name }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body text-center">
          <img :src="pokemon.sprites.other['official-artwork'].front_default"  class="img-fluid" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonInfoModal",
  props: {
    pokemon: Object // lido pelo PokemonList
  },
  // define os eventos que devem ser enviados ao pai
  emits: ["close"],
  setup(props, { emit }){
    // fecha o modal ao clicar fora da tela
    const fecharModal = () => {
      emit("close")
    }

    return { fecharModal }
  }

}
</script>

<style>

</style>