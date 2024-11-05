<template>
  <div class="checkInput">
    <input type="text" />
    <span></span>
  </div>
</template>

<style scoped>
.checkInput {
  display: block;
  border: none;

  input {
    border-bottom: 1px solid #191919;
  }

  &.red input {
    border-color: #ff0000;
  }

  span {
    display: block;
    padding-top: 5px;
    line-height: 16px;
    white-space: inherit;
  }
}
</style>
