<template>
  <div class="option option-top">
    <p>{{ props.pallete.title[props.pallete.type - 1] }}</p>
    <!-- checkbox-wrap -->
    <div class="checkbox-wrap">
      <span
        v-for="(item, idx) in props.pallete.radios"
        :key="idx"
        :style="{
          color: `#${item.color}`,
          border: item.color.startsWith('ff') ? '1px solid #191919' : ''
        }"
        :class="{
          curr: selectedValue === item.value && props.pallete.type === 1,
          curr2: selectedValue === item.value && props.pallete.type === 2
        }"
        class="checkbox"
      >
        <input
          :id="`${props.pallete.id[props?.pallete?.type - 1]}-${idx}`"
          v-model="selectedValue"
          type="radio"
          :name="props.pallete.name[props?.pallete?.type - 1]"
          :value="item.value"
          class="blind"
          :checked="idx === 0"
          @change="handleChange(item.value)"
        />
        <label
          :for="`${props.pallete.id[props?.pallete?.type - 1]}-${idx}`"
          :style="[
            {
              backgroundColor: item.color !== 'ImageWood' ? `#${item.color}` : ''
            },
            {
              backgroundImage: item.color === 'ImageWood' ? `url(${imageWood})` : ''
            }
          ]"
          class="checkbox-shape"
        >
          <span class="blind">{{ item.label }}</span>
        </label>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue'

interface LabelValueType {
  label: string
  value: string
  color: string
}
const imageWood = new URL('@/assets/images/img-wood.png', import.meta.url).href

interface PalleteType {
  title: string[]
  radios: LabelValueType[]
  id: string[]
  name: string[]
  type: number
}
// const isInit = defineModel('IsInit')

const props = defineProps<{ pallete: PalleteType }>()

const emit = defineEmits(['change'])

const selectedValue = ref<string | null>(null)

const handleChange = (newValue: string) => {
  selectedValue.value = newValue
  const currentId = props.pallete.id[props.pallete.type - 1]
  emit('change', newValue, currentId)
}
const initInput = () => {
  selectedValue.value = props.pallete?.radios[0].value
  handleChange(selectedValue.value)
}
onMounted(() => {
  initInput()
})
</script>
<style scoped lang="scss"></style>
