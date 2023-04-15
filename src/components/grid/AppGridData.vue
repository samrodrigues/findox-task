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
            @click.self="$emit('header-toggled', columnIndex)"
        >
          {{ column.label }}
          <AppGridFilterControls
              :class="{left: columnIndex <= 1}"
              :applied-filters="appliedFilters[column.key]"
              :column="column"
              :column-values="columnValues(column.key)"
              :is-open="openHeader === columnIndex"
              @closed="$emit('header-closed')"
              @filter-changed="$emit('filter-changed', $event)"
              @sort-updated="$emit('sort-updated', $event)"
          />
        </div>
      </template>
      <div class="row-info">
        Showing <strong>{{ data.length }} {{pluralize('row', data.length)}}.</strong>
      </div>
      <div
          v-for="(row, rowIndex) in data"
          :data-even="rowIndex%2"
          :key="rowIndex"
          class="grid-row"
          role="row"
          @click="$emit('row-selected', row)"
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
import {computed} from 'vue';
import {pluralize, sortLowerCase} from "../../helpers/string";
import AppGridFilterControls from "./AppGridFilterControls.vue";

const props = defineProps({
  appliedFilters: Object,
  columns: Array,
  data: Array,
  rawData: Array,
  openHeader: Number,
});

// UI
const gridTemplateColumns = computed(() => {
  const activeColumns = props.columns.filter((column) => column.isActive);
  return `repeat(${activeColumns.length}, minmax(min-content, 200px))`;
});

const columnValues = (key) => Array.from(new Set(props.rawData.map(row => row[key]))).sort(sortLowerCase);

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
  &[data-even="1"] .grid-cell {
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
