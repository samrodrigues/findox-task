<template>
  <slot name="title"></slot>
  <AppGridControl
      v-model="searchValue"
      :columns="columns"
      @export-requested="exportToXLSX"
      @filters-reset="onFiltersReset"
  />
  <AppGridData
      :applied-filters="appliedFilters"
      :columns="columns"
      :data="sortedData"
      :raw-data="data"
      :open-header="openHeader"
      @filter-changed="onFilterChanged"
      @header-toggled="toggleHeader"
      @header-closed="openHeader = null"
      @row-selected="onRowSelected"
      @sort-updated="onSortUpdated"
  />
</template>

<script setup>
import {computed, ref, watch} from "vue";
import { useRoute, useRouter } from 'vue-router';
import { utils, writeFile } from 'xlsx';
import AppGridData from "./AppGridData.vue";
import AppGridControl from "./AppGridControl.vue";

const props = defineProps({
  data: Object,
  columns: Object,
})

const emits = defineEmits(['rowSelected'])

// Initialize vars
const appliedFilters = ref(
    props.columns.reduce((acc, column) => ({...acc, [column.key]: []}), {})
);
const searchValue = ref("");
const openHeader = ref(null);
const sortColumn = ref(null);
const sortDirection = ref(1);

const route = useRoute();
const router = useRouter();
const routeQuery = computed(() => route.query);

watch(routeQuery, () => {
  const filtersFromQuery = JSON.parse(routeQuery.value.filters || '{}');
  for (const key in appliedFilters.value) {
    if (filtersFromQuery[key]) {
      appliedFilters.value[key] = filtersFromQuery[key];
    } else {
      appliedFilters.value[key] = [];
    }
  }
}, { immediate: true });


// Handlers
const onFilterChanged = ({key, values}) => {
  const column = props.columns.find(column => column.key === key);
  if (values.length > 0 && column.isActive) {
    appliedFilters.value[key] = values;
  } else {
    delete appliedFilters.value[key];
  }

  const filtersQuery = JSON.stringify(appliedFilters.value);
  const updatedQuery = { ...route.query, filters: filtersQuery };

  if (filtersQuery === '{}') {
    delete updatedQuery.filters;
  }

  router.replace({ query: updatedQuery });
}
const onFiltersReset = () => {
  for (const key in appliedFilters.value) {
    appliedFilters.value[key] = [];
  }
  const filtersQuery = JSON.stringify(appliedFilters.value);
  router.replace({ query: { ...route.query, filters: filtersQuery } });
};
const onRowSelected = (row) => {
  emit('row-selected', row)
}
const onSortUpdated = ({key, sortOrder}) => {
  sortColumn.value = key;
  sortDirection.value = sortOrder;
  openHeader.value = null;
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


// Filtering and sorting data
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
  if (!searchValue.value) return filteredData.value;

  return filteredData.value.filter(row => {
    return props.columns.some(column => {
      const cellValue = String(row[column.key]).toLowerCase();
      return cellValue.includes(searchValue.value.toLowerCase());
    });
  });
});

const sortedData = computed(() => {
  if (sortColumn.value !== null) {
    return matchedData.value.sort((a, b) => {
      const valueA = String(a[sortColumn.value]);
      const valueB = String(b[sortColumn.value]);
      return valueA.localeCompare(valueB, undefined, { sensitivity: 'base' }) * sortDirection.value;
    });
  }
  return matchedData.value;
});
</script>
