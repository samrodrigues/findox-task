<script setup>
import { computed } from 'vue';
import { useDealsStore, useDocumentsStore } from '@/stores';
import FDXGrid from "../components/FDXGrid.vue";

const dealsStore = useDealsStore();
const deals = computed(() => dealsStore.dealsWithRelatedData);

const fetchDocumentsForDeal = (dealId) => {
  return documentsStore.getDocumentsByDealId(dealId);
};

const columns = [
  { key: 'Id', label: 'ID', isActive: true, sortOrder: null },
  { key: 'IssuerId', label: 'Issuer', isActive: true, sortOrder: null },
  { key: 'DealName', label: 'Deal Name', isActive: true, sortOrder: null },
  //{ key: '', label: 'Bloomberg ID', isActive: true, sortOrder: null },
  //{ key: '', label: 'ISIN', isActive: true, sortOrder: null },
  { key: 'CustomDealId', label: 'Custom Deal Identifiers', isActive: true, sortOrder: null },
  { key: 'CustomClientIssuersIdentifiers', label: 'Custom Issuer Identifiers', isActive: true, sortOrder: null },
  { key: 'IndustryId', label: 'Industry', isActive: true, sortOrder: null },
  { key: 'AgentId', label: 'Agent', isActive: true, sortOrder: null },
  { key: 'SourceId', label: 'Source', isActive: true, sortOrder: null },
  { key: 'StatusId', label: 'Status', isActive: true, sortOrder: null },
  { key: 'Total', label: 'Total', isActive: true, sortOrder: null },
  { key: 'LastPosted', label: 'Last Posted', isActive: true, sortOrder: null },
  { key: 'LastAccessed', label: 'Last Accessed', isActive: true, sortOrder: null },
  { key: 'AnalystIds', label: 'Analysts', isActive: true, sortOrder: null },
  { key: 'DocCount', label: 'Doc Count', isActive: true, sortOrder: null },
  { key: 'ClientCustomField', label: 'Custom Field', isActive: true, sortOrder: null },
];

</script>

<template>
  <main>
    <FDXGrid :data="deals" :columns="columns" />
  </main>
</template>
