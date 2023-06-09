<template>
  <div class="dropdown" :class="{open: isOpen}">
    <div class="column-name">{{ column.label }}</div>
    <button class="light" @click="$emit('sortUpdated', { key: column.key, sortOrder: 1})">Sort A to Z</button>
    <button class="light" @click="$emit('sortUpdated', { key: column.key, sortOrder: -1})">Sort Z to A</button>
    <template v-if="column.isFilterable">
      <hr/>
      <input
          type="text"
          v-model="searchText"
          :placeholder="`Filter ${column.label}`"
          class="search-input"
      />
      <div class="checkbox-list">
        <label
            v-for="(value, index) in filteredValues"
            :key="index"
            class="checkbox-label"
        >
          <input
              type="checkbox"
              :value="value"
              :checked="selectedValues.includes(value)"
              @change="emitFilterChange(value, $event.target.checked)"
          />
          <span>{{ value }}</span>
        </label>
      </div>
    </template>
    <hr/>
    <footer>
      <button v-if="column.isFilterable" class="small primary" @click="clearFilter">Clear Filter</button>
      <button class="default small" @click="closeDropdown">Close</button>
    </footer>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';

const props = defineProps({
  column: Object,
  columnValues: Array,
  appliedFilters: Object,
  isOpen: Boolean,
});
const emit = defineEmits(['closed', 'filterChanged', 'sortUpdated']);

const searchText = ref('');
const filteredValues = computed(() => {
  if (!searchText.value) {
    return props.columnValues;
  }
  return props.columnValues.filter((value) =>
      value.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

const selectedValues = ref([...props.appliedFilters]);

const emitFilterChange = (value, checked) => {
  if (checked) {
    selectedValues.value.push(value);
  } else {
    selectedValues.value = selectedValues.value.filter((v) => v !== value);
  }
  emit('filterChanged', {key: props.column.key, values: selectedValues.value});
};

const clearFilter = () => {
  selectedValues.value = [];
  emit('filterChanged', {key: props.column.key, values: selectedValues.value});
};

const closeDropdown = () => {
  emit('closed');
};
</script>

<style scoped lang="scss">
.dropdown {
  box-sizing: border-box;
  position: absolute;
  background-color: #ffffff;
  box-shadow: 1px 1px 1px 1px #22222233;
  z-index: 3;
  padding: 8px;
  top: 100%;
  right: 0;
  min-width: 140px;
  max-width: 100%;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
  transition: opacity 0.2s ease;
  * {
    font-size: 12px;
  }
  button {
    display: block;
    margin-bottom: 6px;
  }
  input[type=text] {
    width: calc(100% - 6px);
    margin: 9px 0 6px;
  }
}

.dropdown.left {
  right: unset;
  left: 0;
}

.dropdown.open {
  pointer-events: all;
  opacity: 1;
}

.column-name {
  color: #222222;
  text-align: center;
  margin-bottom: 12px;
  font-weight: bold;
}

hr {
  background: #dedede;
  height: 1px;
  border: none;
}

.checkbox-list {
  display: flex;
  gap: 3px;
  flex-direction: column;
  max-width: 100%;
  max-height: 200px;
  overflow: scroll;
}

.checkbox-list label {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  white-space: nowrap;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
}

footer {
  display: flex;
  justify-content: space-between;
}
</style>
