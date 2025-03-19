<script setup>
import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.js'

useLifecycleLogger({ name: 'AppLayoutDefault' })
</script>

<template>
  <main class="flex flex-auto">
    <slot />
  </main>
</template>

<style scoped lang="scss">

</style>
