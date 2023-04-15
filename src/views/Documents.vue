<template>
  <main>
    <p v-if="dealId">Displaying documents for Deal id = <strong>{{ dealId }}</strong>.
      <button class="light" @click="clearDealId">Clear</button>
    </p>
    <AppGrid :data="filteredDocuments" :columns="columns">
      <template #title>
        <p class="title">Search Documents</p>
      </template>
    </AppGrid>
  </main>
</template>

<script setup>
import {computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useDocumentsStore} from '@/stores';
import AppGrid from "../components/grid/AppGrid.vue";

const columns = computed(() => documentsStore.columns);
const documents = computed(() => documentsStore.documents);
const documentsStore = useDocumentsStore();

const route = useRoute();
const router = useRouter();

const dealId = computed(() => parseInt(route.query.dealId || 0));
const clearDealId = () => {
  router.replace({query: {}});
}

const filteredDocuments = computed(() => {
  if (dealId.value) {
    return documents.value.filter(doc => doc.deal_id === dealId.value);
  }
  return documents.value;
});

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
