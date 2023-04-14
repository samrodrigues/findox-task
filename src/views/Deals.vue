<template>
  <main>
    <p class="title">Search Deals</p>
    <AppGridControl v-model="searchValue" :columns="columns" />
    <AppGrid
        :data="deals"
        :columns="columns"/>
  </main>
</template>

<script setup>
import {computed} from 'vue';
import {useDealsStore, useDocumentsStore} from '@/stores';
import AppGrid from "../components/grid/AppGrid.vue";
import AppGridControl from "../components/grid/AppGridControl.vue";

const dealsStore = useDealsStore();
const deals = computed(() => dealsStore.dealsWithRelatedData);
const columns = computed(() => dealsStore.columns);

const fetchDocumentsForDeal = (dealId) => {
  return documentsStore.getDocumentsByDealId(dealId);
};

import { ref } from 'vue';
const searchValue = ref("");

</script>

<style>
main {
  margin: 24px;
}
.title {
  margin-bottom: 0;
  font-weight: bold;
}
</style>
