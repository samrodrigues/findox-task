<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <table>
    <thead>
    <tr>
      <th
          v-for="(column, index) in columns"
          :key="index"
          @click="sortColumn(column)"
      >
        {{ column.label }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, rowIndex) in data" :key="rowIndex">
      <td v-for="(column, colIndex) in columns" :key="colIndex">
        {{ row[column.key] }}
      </td>
    </tr>
    </tbody>
  </table>
</template>



<style scoped>

</style>
