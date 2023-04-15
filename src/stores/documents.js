import docsData from '@/data/docs_dataset.json';
import { defineStore } from 'pinia';

export const useDocumentsStore = defineStore({
  id: 'documents',
  state: () => ({
    documents: docsData.data.docs,
    columns: [
      {key: 'id', label: 'ID', isFilterable: false, isActive: true},
      {key: 'system_folder_name', label: 'Tag', isFilterable: true, isActive: true},
      {key: 'deal_id', label: 'Deal ID', isFilterable: true, isActive: true},
      {key: 'deal_doc_id', label: 'Deal Doc ID', isFilterable: false, isActive: true},
      {key: 'holding_id', label: 'Holding ID', isFilterable: true, isActive: true},
      {key: 'division_id', label: 'Division ID', isFilterable: true, isActive: true},
      {key: 'created', label: 'Created', isFilterable: false, isActive: true},
      {key: 'modified', label: 'Modified', isFilterable: false, isActive: true},
      {key: 'posted', label: 'Posted', isFilterable: false, isActive: true},
      {key: 'last_accessed', label: 'Last Accessed', isFilterable: false, isActive: true},
      {key: 'name', label: 'Name', isFilterable: true, isActive: true},
      {key: 'original_filename', label: 'Original Filename', isFilterable: true, isActive: true},
      {key: 'original_path', label: 'Original Path', isFilterable: false, isActive: true},
      {key: 'folder_path', label: 'Folder Path', isFilterable: false, isActive: true},
      {key: 'status_id', label: 'Status ID', isFilterable: true, isActive: true},
      {key: 'status_name', label: 'Status Name', isFilterable: true, isActive: true},
      {key: 'size', label: 'Size', isFilterable: false, isActive: true},
      {key: 'irm_type_id', label: 'IRM Type ID', isFilterable: true, isActive: true},
      {key: 'is_declassified', label: 'Declassified', isFilterable: true, isActive: true},
      {key: 'is_private', label: 'Private', isFilterable: true, isActive: true},
      {key: 'excluded_from_restricted_list', label: 'Excluded from Restricted List', isFilterable: true, isActive: true},
    ],
  }),
  getters: {
    getDocumentsByDealId: (state) => (dealId) => {
      return state.documents.filter(document => document.deal_id === dealId);
    },
  },
});
