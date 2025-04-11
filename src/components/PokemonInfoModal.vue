<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog" @click.self="fecharModal">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-capitalize">{{ pokemon.name }}</h5>
          <button type="button" class="btn-close" @click="fecharModal"></button>
        </div>
        <div class="modal-body">
          <!-- Sprites Carousel -->
          <div v-if="spriteList.length > 0" id="spriteCarousel" class="carousel slide mb-4" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item" v-for="(sprite, index) in spriteList" :class="{ active: index === 0 }"
                :key="index">
                <img :src="sprite" class="d-block mx-auto" style="max-height: 200px;" />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#spriteCarousel" data-bs-slide="prev">
              <span class="fs-2 text-dark" aria-hidden="true">&lsaquo;</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#spriteCarousel" data-bs-slide="next">
              <span class="fs-2 text-dark" aria-hidden="true">&rsaquo;</span>

            </button>
          </div>
          <div v-else class="text-center py-3 text-muted">
            Nenhuma sprite disponível.
          </div>

          <div class="row mb-4">
            <!-- Moves -->
            <div class="col-md-6">
              <h6>Movimentos de Ataque</h6>
              <div style="max-height: 200px; overflow-y: auto" class="border rounded p-2">
                <ul class="list-group">
                  <li v-for="move in pokemon.moves" :key="move.move.name" class="list-group-item text-capitalize">
                    {{ move.move.name }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Games -->
            <div class="col-md-6">
              <h6>Games em que aparece</h6>
              <div class="d-flex flex-wrap gap-2 border rounded p-2" style="max-height: 200px; overflow-y: auto">
                <span v-for="game in pokemon.game_indices" :key="game.version.name"
                  class="badge bg-primary text-capitalize">
                  {{ game.version.name }}
                </span>
              </div>
            </div>
          </div>

          <!-- Evolução -->
          <div class="mt-4">
            <h6>Linha Evolutiva</h6>
            <div v-if="evolutionLoading" class="text-center py-3">
              Carregando linha evolutiva...
            </div>
            <div v-else-if="evolutionChain.length"
              class="d-flex justify-content-center align-items-center gap-4 flex-wrap">
              <div v-for="evo in evolutionChain" :key="evo.name" class="text-center">
                <img :src="evo.sprite" :alt="evo.name" class="img-fluid" style="width: 120px;" />
                <p class="mb-0 text-capitalize">{{ evo.name }}</p>
              </div>
            </div>
            <div v-else class="text-center py-3 text-muted">
              Nenhuma evolução encontrada.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "PokemonInfoModal",
  props: {
    pokemon: Object
  },
  emits: ["close"],
  setup(props, { emit }) {
    const spriteList = ref([]);
    const evolutionChain = ref([]);
    const evolutionLoading = ref(false);

    const fecharModal = () => {
      emit("close");
    };

    const getAllSpriteUrls = (sprites) => {
      const urls = new Set();
      const collect = (obj) => {
        for (const key in obj) {
          const val = obj[key];
          if (typeof val === "string" && val) {
            urls.add(val);
          } else if (typeof val === "object" && val !== null) {
            collect(val);
          }
        }
      };
      collect(sprites);
      return [...urls];
    };

    const extractEvolutionChainWithSprites = async (chain) => {
      const queue = [chain];
      const chainList = [];
      evolutionLoading.value = true;

      try {
        while (queue.length > 0) {
          const current = queue.shift();
          const name = current.species.name;

          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const data = await res.json();
          chainList.push({
            name,
            sprite: data.sprites.other["official-artwork"].front_default || data.sprites.front_default
          });

          if (current.evolves_to?.length) {
            queue.push(...current.evolves_to);
          }
        }
        evolutionChain.value = chainList;
      } catch (err) {
        console.error("Erro ao buscar sprite da evolução:", err);
      } finally {
        evolutionLoading.value = false;
      }
    };

    onMounted(() => {
      if (props.pokemon?.sprites) {
        const spriteUrls = getAllSpriteUrls(props.pokemon.sprites);
        spriteList.value = spriteUrls;
      }

      if (props.pokemon?.evolutionData?.chain) {
        extractEvolutionChainWithSprites(props.pokemon.evolutionData.chain);
      }
    });

    return {
      fecharModal,
      spriteList,
      evolutionChain,
      evolutionLoading
    };
  }
};
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
}

.modal-dialog {
  max-width: 800px;
}

@media (max-width: 768px) {
  .modal-dialog {
    margin: 1rem;
    max-width: 100%;
  }
}
</style>
