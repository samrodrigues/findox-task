<template>
  <main>
    <AppGrid
        :data="deals"
        :columns="columns"
        @row-selected="onRowSelected">
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

import { useRouter } from 'vue-router';

const router = useRouter();

const onRowSelected = (row) => {
  router.push({ name: 'documents', query: { dealId: row.DealId } });
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
