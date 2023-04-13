// store/deals.js
import { defineStore } from 'pinia';
import dealsDataset from '@/data/deals_dataset.json';

export const useDealsStore = defineStore({
  id: 'deals',
  state: () => ({
    deals: dealsDataset.data.Holdings,
    agents: dealsDataset.data.Agents,
    sources: dealsDataset.data.Sources,
    dealTypes: dealsDataset.data.DealTypes,
    analysts: dealsDataset.data.Analysts,
    assets: dealsDataset.data.Assets,
  }),
  getters: {
    getAgentById: (state) => (id) => {
      return state.agents.find((agent) => agent.Id === id);
    },
    getSourceById: (state) => (id) => {
      return state.sources.find((source) => source.Id === id);
    },
    getDealTypeById: (state) => (id) => {
      return state.dealTypes.find((dealType) => dealType.Id === id);
    },
    getAnalystById: (state) => (id) => {
      return state.analysts.find((analyst) => analyst.UserId === id);
    },
    getAssetById: (state) => (id) => {
      return state.assets.find((asset) => asset.Id === id);
    },
    dealsWithRelatedData: (state) => {
      return state.deals.map((deal) => {
        const agent = state.getAgentById(deal.AgentId);
        const source = state.getSourceById(deal.SourceId);
        const dealType = state.getDealTypeById(deal.TypeId);
        const analysts = (deal.AnalystIds || []).map((analystId) => state.getAnalystById(analystId));

        return {
          ...deal,
          agent: agent ? agent.CompanyName : 'N/A',
          source: source ? source.SourceName : 'N/A',
          dealType: dealType ? dealType.TypeName : 'N/A',
          analysts: analysts.map((analyst) => analyst.FullName),
        };

      });
    },
  },
});
