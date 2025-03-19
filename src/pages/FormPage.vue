<script setup>
import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.js'
import BaseButton from '@/components/BaseButton.vue'
import GroupInput from '@/components/GroupInput.vue'
import { useFormStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'

const formStore = useFormStore();
const { formConfig, isFormValid, isLoading } = storeToRefs(formStore);

useLifecycleLogger({ name: 'FormPage' })
</script>

<template>
  <div class="w-100 flex justify-content-center" style="margin-top: 2rem;">
    <form class="w-33 flex flex-col">
      <GroupInput  id="name"
                   v-model="formConfig.name"
                   label="ФИО"
                   placeholder="Введите фамилию, имя и отчество"
                   :error="formStore.formErrors.name"
      />
      <GroupInput  id="birthday"
                   v-model="formConfig.birthday"
                   label="Дата Рождения"
                   placeholder="Введите дату рождения"
                   :error="formStore.formErrors.birthday"
      />
      <GroupInput  id="phone"
                   v-model="formConfig.phone"
                   label="Номер Телефона"
                   placeholder="Введите номер телефона"
                   :error="formStore.formErrors.phone"
      />
      <GroupInput  id="email"
                   v-model="formConfig.email"
                   label="Электронная почта"
                   placeholder="Введите Email"
                   :error="formStore.formErrors.email"
      />

      <BaseButton
          label="Отправить"
          :disabled="!isFormValid"
          :loading="isLoading"
          @click="formStore.submitForm"
      />
    </form>
  </div>
</template>

<style scoped lang="scss">
form {
  gap: 1rem;
}
</style>
