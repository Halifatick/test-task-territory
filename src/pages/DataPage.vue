<script setup>
import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.js'
import BaseTable from '@/components/BaseTable.vue'
import { storeToRefs } from 'pinia'
import { useFormStore } from '@/stores/index.js'

useLifecycleLogger({ name: 'FormPage' })

const formStore = useFormStore();
const { usersConfig } = storeToRefs(formStore);

const tableFields = {
  name: 'ФИО',
  birthday: 'Дата Рождения',
  phone: 'Номер Телефона',
  email: 'Электронная почта',
};
</script>

<template>
  <div class="w-100">
    <BaseTable :headers="tableFields" :rows="usersConfig" :sortable="true" />
  </div>
</template>

<style scoped lang="scss">

</style>