<template>
  <input
      :id="props.id"
      type="text"
      :placeholder="props.placeholder"
      :required="props.required"
      :value="props.value.value"
      :class="props.style"
      :readonly="props.readonly"
      @input="handleInput"
  />
  <slot name="addItem"></slot>
</template>
<script setup lang="ts">
import { InputTextModel } from '@/type/input'
import {ref} from "vue";
const props = withDefaults(defineProps<InputTextModel>(), {
  id: '',
  placeholder: '',
  required: false,
  value: () => ref(''),
  style: '',
  readonly: false,
})
const emit = defineEmits(['input']);

const handleInput = (e: Event) => {
  emit('input', (e.target as HTMLInputElement).value);
};
</script>