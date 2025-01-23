<template>
  <div class="option optionTop">
    <p>{{ props.pallete.title[props.pallete.type - 1] }}</p>
    <!-- checkboxWrap -->
    <div class="checkboxWrap">
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
          class="checkboxShape"
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
<style scoped lang="scss">
.blind {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.option.optionTop {
  margin-top: 40px;
  @media (max-width: 1160px) {
    margin-top:20px;
  }
  p {
    font-size: 16px;
    color: #191919;
    @media (max-width: 1160px) {
      text-indent: -40px;
      padding-left: 40px;
      font-size: 14px;
    }
  }

}
.checkboxWrap {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 12px -20px 0;
  padding: 0 20px;
  @media (max-width: 1160px) {
    flex-wrap:wrap;
    gap: 12px;
  }
  .checkbox {
    margin: 0;
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    box-sizing: border-box;
    @media (max-width: 1160px) {
      width: 16px;
      height: 16px; 
    }
    input[type='radio'].blind {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
    input[type='radio'] + label.checkboxShape {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-image: none;
      background-size: auto auto;
    }
    &.curr {
      width: 25px;
      height: 25px;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.5);
      @media (max-width: 1160px) {
        width: 20px;
        height: 20px;
      }
    }
    &.curr2 {
      width: 25px;
      height: 25px;
      // box-shadow: 0 0 5px 1px #00000026;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.5);
      @media (max-width: 1160px) {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
