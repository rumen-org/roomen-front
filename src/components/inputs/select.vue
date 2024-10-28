<template>
  <select
    :id="props.id"
    :required="props.required"
    :value="props.value.value"
    :class="props.style"
    @change="handleChange"
  >
    <option v-for="option in props.options.value" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { InputSelectModel } from '@/type/input'
import { LabelValueType } from '@/type/values'
const props = withDefaults(defineProps<InputSelectModel>(), {
  id: '',
  required: false,
  value: () => ref(''),
  style: '',
  options: () => ref([] as LabelValueType[])
})
const emit = defineEmits(['update:value'])

const handleChange = (e: Event) => {
  const newValue = (e.target as HTMLSelectElement).value
  emit('update:value', newValue)
}
</script>
