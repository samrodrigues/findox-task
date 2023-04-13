import docsData from '@/data/docs_dataset.json';
import { defineStore } from 'pinia';

export const useDocumentsStore = defineStore({
  id: 'documents',
  state: () => ({
    documents: docsData.data.docs,
  }),
  getters: {
    getDocumentsByDealId: (state) => (dealId) => {
      return state.documents.filter(document => document.deal_id === dealId);
    },
  },
});
