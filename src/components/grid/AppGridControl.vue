<template>
  <div class="grid-control">
    <input
        type="text"
        placeholder="Search"
        v-model="searchValue"
        @input="updateSearchValue"
    />
    <button class="default" @click.self="isOpen = !isOpen">
      Columns
      <AppGridColumnControls :columns="columns" :is-open="isOpen" @closed="isOpen = false"/>
    </button>
    <button class="default" @click="$emit('export-requested')">Export</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppGridColumnControls from "./AppGridColumnControls.vue";

const props = defineProps({
  columns: Array,
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(['update:modelValue']);

const searchValue = ref(props.modelValue);
const isOpen = ref(false);

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
  overflow: visible;
  z-index: 10;

  input[type=text] {
    margin: 9px 0 6px;
    width: 240px;
  }

  button:first-of-type {
    margin-left: auto;
    position: relative;
    z-index: 11;
  }
}

</style>
