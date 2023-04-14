// store/deals.js
import { defineStore } from 'pinia';
import dealsDataset from '@/data/deals_dataset.json';
import {getDateInMDY} from "../helpers/datetime";

export const useDealsStore = defineStore({
  id: 'deals',
  state: () => ({
    deals: dealsDataset.data.Holdings,
    agents: dealsDataset.data.Agents,
    sources: dealsDataset.data.Sources,
    industries: dealsDataset.data.Industries,
    issuers: dealsDataset.data.ClientIssuers,
    dealTypes: dealsDataset.data.DealTypes,
    analysts: dealsDataset.data.Analysts,
    assets: dealsDataset.data.Assets,
    columns: [
      {key: 'Id', label: 'ID', isFilterable: false, isActive: true},
      {key: 'issuer', label: 'Issuer', isFilterable: true, isActive: true},
      {key: 'DealName', label: 'Deal', isFilterable: true, isActive: true},
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
    ],
  }),
  getters: {
    getAgentById: (state) => (id) => {
      return state.agents.find((agent) => agent.Id === id);
    },
    getAnalystById: (state) => (id) => {
      return state.analysts.find((analyst) => analyst.UserId === id);
    },
    getAssetById: (state) => (id) => {
      return state.assets.find((asset) => asset.Id === id);
    },
    getDealTypeById: (state) => (id) => {
      return state.dealTypes.find((dealType) => dealType.Id === id);
    },
    getIndustryById: (state) => (id) => {
      return state.industries.find((industry) => industry.Id === id);
    },
    getIssuerById: (state) => (id) => {
      return state.issuers.find((issuer) => issuer.IssuerId === id);
    },
    getSourceById: (state) => (id) => {
      return state.sources.find((source) => source.Id === id);
    },
    dealsWithRelatedData: (state) => {
      return state.deals.map((deal) => {
        const agent = state.getAgentById(deal.AgentId);
        const analysts = (deal.AnalystIds || []).map((analystId) => state.getAnalystById(analystId));
        const dealType = state.getDealTypeById(deal.TypeId);
        const industry = state.getIndustryById(deal.IndustryId);
        const issuer = state.getIssuerById(deal.IssuerId);
        const source = state.getSourceById(deal.SourceId);

        return {
          ...deal,
          agent: agent ? agent.CompanyName : 'N/A',
          analysts: analysts.map((analyst) => analyst.FullName).join(', '),
          dealType: dealType ? dealType.TypeName : 'N/A',
          industry: industry ? industry.IndustryName : 'N/A',
          issuer: issuer ? issuer.IssuerName : 'N/A',
          lastPosted: getDateInMDY(deal.LastPosted),
          lastAccessed: getDateInMDY(deal.LastAccessed),
          source: source ? source.SourceName : 'N/A',
        };
      });
    },
  },
});
