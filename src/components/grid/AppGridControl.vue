<template>
  <div class="grid-control">
    <input
        type="text"
        class="grid-control-input"
        placeholder="Search"
        v-model="searchValue"
        @input="updateSearchValue"
    />
    <button class="grid-control-button" @click="handleColumns">Columns</button>
    <button class="grid-control-button" @click="exportData">Export</button>
  </div>

</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const searchValue = ref(props.modelValue);

const updateSearchValue = () => {
  emit("update:modelValue", searchValue.value);
};
</script>

<style scoped lang="scss">
.grid-control {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
}
.grid-control-input {
  border: solid 1px #dedede;
  margin: 9px 0 6px;
  line-height: 1.5;
}
.grid-control-button {
  border: solid 1px #dedede;
  background-color: #ffffff;
  height: 24px;
  &:first-of-type {
    margin-left: auto;
  }
}
</style>
