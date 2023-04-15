<template>
  <div class="grid-control">
    <input
        type="text"
        placeholder="Search"
        v-model="searchValue"
        @input="updateSearchValue"
    />
    <button class="default" @click="handleColumns">Columns</button>
    <button class="default" @click="exportData">Export</button>
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

  input[type=text] {
    margin: 9px 0 6px;
    width: 240px;
  }

  button:first-of-type {
    margin-left: auto;
  }
}

</style>
