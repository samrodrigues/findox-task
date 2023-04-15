<template>
  <div class="dropdown" :class="{open: isOpen}">
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

    <footer>
      <button class="secondary" @click="saveColumns">Save</button>
      <button class="secondary" @click="closeDropdown">Cancel</button>
      <button class="secondary" @click="resetColumns">Reset</button>
    </footer>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';

const props = defineProps({
  columns: Object,
  isOpen: Boolean,
});
const emit = defineEmits(['closed','columnsUpdated']);

const closeDropdown = () => {
  emit('closed');
};
</script>

<style scoped lang="scss">
.dropdown {
  box-sizing: border-box;
  * {
    font-size: 12px;
  }
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
}

.dropdown.open {
  pointer-events: all;
  opacity: 1;
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
