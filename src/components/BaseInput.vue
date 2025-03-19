<script setup>
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: '',
  },
  'aria-describedby': {
    type: String,
    default: '',
  },
  maxlength: {
    type: Number,
    default: 255,
  },
  variant: {
    type: String,
    default: 'default',
  },
  size: {
    type: String,
    default: 'medium',
  },
  error: {
    type: Boolean,
    default: false,
  },
})

const modelValue = defineModel({
  default: '',
  required: true,
  type: String,
})

const inputClasses = computed(() => ({
  'base-input': true,
  [`base-input--${props.variant}`]: true,
  [`base-input--${props.size}`]: true,
  'base-input--error': props.error,
}))
</script>

<template>
  <input
      :id="props.id"
      :type="props.type"
      v-model="modelValue"
      :placeholder="props.placeholder"
      :required="props.required"
      :autofocus="props.autofocus"
      :maxlength="props.maxlength"
      @blur="$emit('blur', $event)"
      :class="inputClasses"
      :aria-describedby="props['aria-describedby']"
      :autocomplete="props.autocomplete"
      :aria-invalid="props.error"
  />
</template>

<style scoped lang="scss">

</style>