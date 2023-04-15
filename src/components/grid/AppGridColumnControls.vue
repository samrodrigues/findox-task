<template>
  <div class="dropdown" :class="{open: isOpen}">
      <div class="checkbox-list">
        <label
            v-for="(column, index) in columns"
            :key="index"
            class="checkbox-label"
        >
          <input
              type="checkbox"
              :value="column.key"
              :checked="column.isActive"
              @change="updateActiveColumn(column.key, $event.target.checked)"
          />
          <span>{{ column.label }}</span>
        </label>
      </div>

    <footer>
      <button disabled class="secondary" @click="saveColumns">Save</button>
      <button class="secondary" @click="closeDropdown">Close</button>
      <button class="secondary" @click="resetColumns">Reset</button>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  columns: Array,
  isOpen: Boolean,
});
const emit = defineEmits(['closed', 'columnsUpdated']);

const updatedColumns = ref([...props.columns]);

const updateActiveColumn = (key, isActive) => {
  const column = updatedColumns.value.find((column) => column.key === key);
  if (column) {
    column.isActive = isActive;
  }
};

const closeDropdown = () => {
  emit('closed');
};

const resetColumns = () => {
  updatedColumns.value.forEach(column => column.isActive = true);
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
  z-index: 5;
  padding: 8px;
  top: 100%;
  right: 0;
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
  overflow: scroll;
}

.checkbox-list label {
  border-bottom: solid 1px #dedede;
  padding: 4px 0;
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
  margin-top: 8px;
  display: flex;
  gap: 3px;
  justify-content: space-between;
}
</style>
