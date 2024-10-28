<template>
  <div :class="props.inputStyle">
    <div v-for="(checkbox, index) in props.checkboxes" :key="index">
      <input
        :id="checkbox.value"
        type="checkbox"
        :name="props.checkboxName"
        :value="checkbox.value"
        :checked="isChecked(checkbox.value)"
        :required="props.required"
        @change="handleChange(checkbox.value, $event.target.checked)"
      />
      <label :for="checkbox.value" :class="props.labelStyle">{{ checkbox.label }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InputCheckboxModel } from '@/type/input'
import { ref } from 'vue'

const props = withDefaults(defineProps<InputCheckboxModel>(), {
  value: () => ref([]),
  labelStyle: '',
  required: false,
  inputStyle: '',
  checkboxName: '',
  checkboxes: () => ref([])
})

const emit = defineEmits(['update:value'])

const isChecked = (value: string) => {
  return props.value?.value.includes(value)
}

const handleChange = (value: string, checked: boolean) => {
  const newValue = checked
    ? [...props.value.value, value]
    : props.value.value.filter((item: string) => item !== value)
  emit('update:value', newValue)
}
</script>
