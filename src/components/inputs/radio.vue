<template>
  <div :class="props.inputStyle">
    <div v-for="radio in props.radios.value" :key="radio.value">
      <input
          type="radio"
          :id="radio.value"
          :name="props.radioName"
          :value="radio.value"
          :checked="radio.value === props.value.value"
          :required="props.required"
          @change="handleChange(radio.value)"
      />
      <label :for="radio.value" :class="props.labelStyle">{{ radio.label }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InputRadioModel } from '@/type/input'
import { ref } from 'vue';
const props = withDefaults(defineProps<InputRadioModel>(), {
  value: () => ref(''),
  label: '',
  labelStyle: '',
  required: false,
  inputStyle: '',
  radioName: '',
  radios: () => ref([]),
});
const emit = defineEmits(['update:value']);

const handleChange = (newValue: string) => {
  emit('update:value', newValue);
};

</script>
