<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  headers: {
    type: Object,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  sortable: {
    type: Boolean,
    default: false,
  },
})

const sortKey = ref(null)
const sortDirection = ref('asc')

const toggleSort = (key) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }
}

const tableHeaders = computed(() => {
  return Object.entries(props.headers).map(([key, label]) => ({
    key,
    label,
  }))
})

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows

  const sorted = [...props.rows]
  sorted.sort((a, b) => {
    const aValue = a[sortKey.value]
    const bValue = b[sortKey.value]

    if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })

  return sorted
})

const hasRows = computed(() => props.rows.length > 0)
</script>

<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
      <tr>
        <th
            v-for="header in tableHeaders"
            :key="header.key"
            :class="{ sortable: props.sortable }"
            @click="props.sortable && toggleSort(header.key)"
            :style="props.sortable ? { cursor: 'pointer' } : {}"
        >
         <div>{{ header.label }}
           <span v-if="props.sortable && sortKey === header.key">
              {{ sortDirection === 'asc' ? '▲' : '▼' }}
            </span>
         </div>

        </th>
      </tr>
      </thead>
      <tbody>
        <tr v-if="!hasRows">
          <td colspan="100%" class="empty-row">
            Нет данных
          </td>
        </tr>
        <template v-else>
          <tr v-for="(row, rowIndex) in sortedRows" :key="rowIndex">
            <td v-for="header in tableHeaders" :key="header.key">
              <div>{{ row[header.key] }}</div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">

</style>
