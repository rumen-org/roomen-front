<template>
  <div class="optionSelects">
    <label :for="`shippingSelect-`">{{ props.selector.label }}</label>
    <select
      :id="props.selector.id"
      v-model="selectedValue"
      class="productOption"
      title="배송비"
      @change="handleChange(selectedValue)"
    >
      <option v-for="(option, idx) in props.selector.options" :key="idx" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue'

interface SelectorType {
  label: string
  id: string
  options: { label: string; value: string | '' }[]
}
// const isInit = defineModel('IsInit');
const props = defineProps<{ selector: SelectorType }>()
const emit = defineEmits(['change'])
const selectedValue = ref<string>('')

const onInit = () => {
  // if (isInit) {
  selectedValue.value = props.selector.options[0].value
  fetchInit()
  // }
}

const fetchInit = () => {
  if (props.selector.options.length > 0) {
    const temp = props.selector.options.find((option) => option.value === '')
    if (temp) {
      selectedValue.value = props.selector.options[0].value
      // isInit.value = false;
    }
  }
}
const handleChange = (newValue: string) => {
  emit('change', newValue, props.selector.id)
}

onMounted(() => {
  onInit()
})
</script>

<style scoped lang="scss"></style>
