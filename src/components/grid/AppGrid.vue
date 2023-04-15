<template>
  <slot name="title"></slot>
  <AppGridControl
      v-model="searchValue"
      :columns="columns"
      @export-requested="exportToXLSX"
  />
  <AppGridData
      :applied-filters="appliedFilters"
      :columns="columns"
      :data="sortedData"
      :raw-data="data"
      :open-header="openHeader"
      @header-toggled="toggleHeader"
      @header-closed="openHeader = null"
      @filter-changed="onFilterChanged"
      @sort-updated="onSortUpdated"
  />
</template>

<script setup>
import AppGridData from "./AppGridData.vue";
import AppGridControl from "./AppGridControl.vue";
import {computed, ref} from "vue";
import { utils, writeFile } from 'xlsx';


const props = defineProps({
  data: Object,
  columns: Object,
})

// Initialize vars
const appliedFilters = ref(
    props.columns.reduce((acc, column) => ({...acc, [column.key]: []}), {})
);
const searchValue = ref("");
const openHeader = ref(null);
const sortColumn = ref(null);
const sortDirection = ref(1);



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
const exportToXLSX = () => {
  const workbook = utils.book_new();

  const tableData = [
    props.columns
        .filter(column => column.isActive)
        .map(column => column.label),
    ...sortedData.value.map(row =>
        props.columns
            .filter(column => column.isActive)
            .map(column => row[column.key])
    ),
  ];

  const worksheet = utils.aoa_to_sheet(tableData);
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  writeFile(workbook, 'grid_data.xlsx');
};


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

const matchedData = computed(() => {
  if (!props.query) return filteredData.value;

  return filteredData.value.filter(row => {
    return props.columns.some(column => {
      const cellValue = String(row[column.key]).toLowerCase();
      return cellValue.includes(props.query.toLowerCase());
    });
  });
});

const sortedData = computed(() => {
  if (sortColumn.value !== null) {
    return matchedData.value.sort((a, b) => {
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
  return matchedData.value;
});
</script>
