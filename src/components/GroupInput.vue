<script setup>
import { computed } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import {useFormStore} from "@/stores/index.js";

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
  label: {
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
    type: Array,
    default: () => [],
  },
  helpText: {
    type: String,
    default: 'Пожалуйста, заполните данные',
  }
})

const modelValue = defineModel({
  default: '',
  required: true,
  type: String,
})

const formStore = useFormStore()

const errorMessages = computed(() => props.error || [])
const isError = computed(() => errorMessages.value.length > 0)

const handleBlur = () => {
  formStore.formTouched[props.id] = true
}

const inputClasses = computed(() => ({
  'base-input': true,
  [`base-input--${props.variant}`]: true,
  [`base-input--${props.size}`]: true,
  'base-input--error': (isError.value && formStore.formTouched[props.id]) || (modelValue.value.length > 0 && !formStore.formTouched[props.id] && isError.value),
}))
</script>

<template>
  <div class="input-group">
    <label :for="props.id" v-if="props.label">{{ props.label }}</label>

    <BaseInput
        :id="props.id"
        :type="props.type"
        v-model="modelValue"
        :placeholder="props.placeholder"
        :required="props.required"
        :autofocus="props.autofocus"
        :maxlength="props.maxlength"
        @blur="handleBlur"
        :class="inputClasses"
        :aria-describedby="props['aria-describedby']"
        :autocomplete="props.autocomplete"
        :aria-invalid="isError"
    />

    <div v-if="(isError && formStore.formTouched[props.id]) || (modelValue.length > 0 && !formStore.formTouched[props.id] && isError)" class="error-text">
      <p v-for="(error, index) in errorMessages" :key="index" class="error-message">{{ error }}</p>
    </div>

    <p v-if="!isError || (!modelValue && isError && !formStore.formTouched[props.id]) || (modelValue.length > 0 && !isError && formStore.formTouched[props.id])" class="help-text">{{ props.helpText }}</p>
  </div>
</template>

<style scoped lang="scss">

</style>
