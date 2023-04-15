<template>
  <main>
    <AppGrid :data="deals" :columns="columns">
      <template #title>
        <p class="title">Search Deals</p>
      </template>
    </AppGrid>
  </main>
</template>

<script setup>
import AppGrid from "../components/grid/AppGrid.vue";
import {computed} from 'vue';
import {useDealsStore, useDocumentsStore} from '@/stores';

const dealsStore = useDealsStore();
const deals = computed(() => dealsStore.dealsWithRelatedData);
const columns = computed(() => dealsStore.columns);

const fetchDocumentsForDeal = (dealId) => {
  return documentsStore.getDocumentsByDealId(dealId);
};
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
