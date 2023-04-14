<script setup>
import {computed, reactive} from 'vue';
import {useDealsStore, useDocumentsStore} from '@/stores';
import AppGrid from "../components/grid/AppGrid.vue";

const dealsStore = useDealsStore();
const deals = computed(() => dealsStore.dealsWithRelatedData);

const fetchDocumentsForDeal = (dealId) => {
  return documentsStore.getDocumentsByDealId(dealId);
};

const columns = reactive([
  {key: 'Id', label: 'ID', isFilterable: false, isActive: true},
  {key: 'issuer', label: 'Issuer', isFilterable: true, isActive: true},
  {key: 'DealName', label: 'Deal', isFilterable: true, isActive: true},
  //{ key: '', label: 'Bloomberg ID', isActive: true },
  //{ key: '', label: 'ISIN', isActive: true },
  {key: 'CustomDealId', label: 'Custom Deal Identifiers', isFilterable: false, isActive: true},
  {
    key: 'CustomClientIssuersIdentifiers',
    label: 'Custom Issuer Identifiers',
    isFilterable: false,
    isActive: true,
  },
  {key: 'industry', label: 'Industry', isFilterable: true, isActive: true},
  {key: 'agent', label: 'Agent', isFilterable: true, isActive: true},
  {key: 'source', label: 'Source', isFilterable: true, isActive: true},
  {key: 'StatusId', label: 'Status', isFilterable: true, isActive: true},
  {key: 'Total', label: 'Total', isFilterable: false, isActive: true},
  {key: 'lastPosted', label: 'Last Posted', isFilterable: false, isActive: true},
  {key: 'lastAccessed', label: 'Last Accessed', isFilterable: false, isActive: true},
  {key: 'analysts', label: 'Analysts', isFilterable: true, isActive: true},
  {key: 'DocCount', label: 'Doc Count', isFilterable: true, isActive: true},
  {key: 'ClientCustomField', label: 'Custom Field', isFilterable: false, isActive: true},
]);

</script>

<template>
  <AppGrid
      :data="deals"
      :columns="columns"/>
</template>
