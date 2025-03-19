<script setup>
import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.js'
import BaseNav from '@/components/BaseNav.vue'

useLifecycleLogger({ name: 'AppLayoutDefault' })
</script>

<template>
  <BaseNav/>
  <main class="flex">
      <slot />
  </main>
</template>

<style scoped lang="scss">

</style>
