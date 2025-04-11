<template>
  <div class="badge-wrapper">
    <span :class="badgeClass" class="badge text-white text-capitalize">
      {{ type }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TypeBadge',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    badgeClass() {
      const typeGroups = {
        gray: ['steel', 'dark', 'rock'],
        green: ['grass', 'bug'],
        lightblue: ['ice', 'water'],
        red: ['fire', 'fighting', 'dragon'],
        blue: ['normal', 'ghost'],
        purple: ['poison', 'psychic', 'fairy'],
        brown: ['ground'],
        yellow: ['electric']
      }

      let group = 'blue' // fallback padrão

      for (const [key, types] of Object.entries(typeGroups)) {
        if (types.includes(this.type)) {
          group = key
          break
        }
      }

      return `bg-type-${group}`
    }
  }
}
</script>

<style scoped>


.badge-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.5rem;
}

.badge-wrapper .badge {
  display: inline-flex; /* garante que fiquem lado a lado */
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
}


</style>