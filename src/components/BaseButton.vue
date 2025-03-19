<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  type: {
    type: String,
    default: 'button'
  },
  disabled: Boolean,
  loading: Boolean,
  size: {
    type: String,
    default: 'medium'
  },
  variant: {
    type: String,
    default: 'default'
  }
})

const emit = defineEmits(['click'])

const classes = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  { 'base-button--disabled': props.disabled, 'base-button--loading': props.loading }
])
</script>

<template>
  <button
      :class="classes"
      :type="props.type"
      :disabled="props.disabled || props.loading"
      :aria-disabled="props.disabled"
      :aria-busy="props.loading"
      :aria-label="props.label || 'Button'"
      role="button"
      tabindex="0"
      @click="emit('click')"
  >
    <span v-if="props.loading" class="loader" aria-hidden="true"></span>
    <span v-else>{{ props.label }}</span>
  </button>
</template>

<style scoped lang="scss">

</style>