<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const routes = computed(() => {
  return router.options.routes.filter(routeItem => routeItem.name)
})

const isActive = (routeName) => route.name === routeName
</script>

<template>
  <nav class="base-nav">
    <ul class="nav-list">
      <li
          v-for="routeItem in routes"
          :key="routeItem.name"
          :class="['nav-item', { active: isActive(routeItem.name) }]"
      >
        <router-link :to="routeItem.path" class="nav-link">
          {{ routeItem.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">

</style>
