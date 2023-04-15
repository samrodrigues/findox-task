<template>
  <main>
    <AppGrid :data="documents" :columns="columns">
      <template #title>
        <p class="title">Search Documents</p>
      </template>
    </AppGrid>
  </main>
</template>

<script setup>
import AppGrid from "../components/grid/AppGrid.vue";
import {computed} from 'vue';
import {useDealsStore, useDocumentsStore} from '@/stores';

const documentsStore = useDocumentsStore();
const documents = computed(() => documentsStore.documents);
const columns = computed(() => documentsStore.columns);

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
