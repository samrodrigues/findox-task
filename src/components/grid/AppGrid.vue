<template>
  <slot name="title"></slot>
  <AppGridControl v-model="searchValue" :columns="columns" />
  <AppGridData
      :data="data"
      :columns="columns"/>
</template>

<script setup>
import AppGridData from "./AppGridData.vue";
import AppGridControl from "./AppGridControl.vue";
import {ref} from "vue";

const props = defineProps({
  data: Object,
  columns: Object,
})

const searchValue = ref("");
</script>
