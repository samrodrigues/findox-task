<template>
  <div class="table-container">
    <div
        class="grid-container"
        :style="{ gridTemplateColumns: gridTemplateColumns }"
        role="table"
    >
      <template v-for="(column, columnIndex) in columns">
        <div
            v-if="column.isActive"
            :key="columnIndex"
            class="grid-header-cell grid-header"
            role="columnheader"
            @click.self="toggleHeader(columnIndex)"
        >
          {{ column.label }}
          <AppGridFilterControls
              :class="{left: columnIndex <= 1}"
              :applied-filters="appliedFilters[column.key]"
              :column="column"
              :column-values="columnValues(column.key)"
              :is-open="openHeader === columnIndex"
              @closed="onClosed"
              @filter-changed="onFilterChanged"
              @sort-updated="onSortUpdated"
          />
        </div>
      </template>
      <div class="row-info">
        Showing <strong>{{ sortedData.length }} {{pluralize('row', sortedData.length)}}.</strong>
      </div>
      <div
          v-for="(row, rowIndex) in sortedData"
          :key="rowIndex"
          class="grid-row"
          role="row"
      >
        <template v-for="(column, cellIndex) in columns">
          <div
              v-if="column.isActive"
              :key="cellIndex"
              class="grid-cell"
              role="cell"
          >
            {{ row[column.key] }}
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {sortLowerCase, pluralize} from "../../helpers/string";
import AppGridFilterControls from "./AppGridFilterControls.vue";

const props = defineProps({
  columns: Array,
  data: Array,
});

// UI
const gridTemplateColumns = computed(() => {
  const activeColumns = props.columns.filter((column) => column.isActive);
  return `repeat(${activeColumns.length}, minmax(min-content, 200px))`;
});

// Initialize vars
const columnValues = (key) => Array.from(new Set(props.data.map(row => row[key]))).sort(sortLowerCase);
const appliedFilters = ref(
    props.columns.reduce((acc, column) => ({...acc, [column.key]: []}), {})
);
const openHeader = ref(null);
const sortColumn = ref(null);
const sortDirection = ref(1);

// Computed
const filteredData = computed(() => {
  return props.data.filter(row => {
    return Object.keys(appliedFilters.value).every(key => {
      const filterValues = appliedFilters.value[key];
      if (filterValues.length === 0) {
        return true;
      }
      return filterValues.includes(row[key]);
    });
  });
});

const sortedData = computed(() => {
  if (sortColumn.value !== null) {
    return filteredData.sort((a, b) => {
      const valueA = a[sortColumn.value];
      const valueB = b[sortColumn.value];
      if (valueA < valueB) {
        return -1 * sortDirection.value;
      } else if (valueA > valueB) {
        return 1 * sortDirection.value;
      } else {
        return 0;
      }
    });
  }
  return filteredData.value;
});

// Handlers
const onClosed = () => {
  openHeader.value = null;
}
const onFilterChanged = ({key, values}) => {
  appliedFilters.value[key] = values;
}
const onSortUpdated = ({key, sortOrder}) => {
  sortColumn.value = key;
  sortDirection.value = sortOrder;
}
const toggleHeader = (index) => {
  if (openHeader.value === index) {
    openHeader.value = null
  } else {
    openHeader.value = index
  }
};

</script>
<style scoped lang="scss">
@import "@/assets/main";

$maxCellWidth: 250px;
$cellPadding: 8px;

.table-container {
  background-color: #ffffff;
  min-height: 450px;
  position: relative;
  z-index: 1;
  max-width: 100%;
  overflow-x: auto;
}

.grid-container {
  display: grid;
}

.grid-header {
  background-color: #e7ecf0;
  color: #679fbb;
  position: relative;
}

.grid-header-cell {
  z-index: 2;
  cursor: pointer;
  position: relative;
  max-width: $maxCellWidth;
  padding: $cellPadding;
  font-weight: normal;
  white-space: nowrap;
  overflow: visible;
  text-overflow: ellipsis;

  &:not(:first-child) {
    border-left: solid 1px #dedede;
  }
}

.row-info {
  grid-column: 1 / -1;
  background-color: #f5f5f5;
  padding: $cellPadding;
  color: #222;
}

.grid-row {
  display: contents;
  cursor: pointer;
  .grid-cell {
    background-color: #ffffff;
  }
  &:nth-child(even) .grid-cell {
    background-color: #fcfcfc;
  }
  &:hover .grid-cell {
    background-color: #fcfcf2;
  }
}

.grid-cell {
  z-index: 1;
  max-width: $maxCellWidth;
  padding: $cellPadding;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
