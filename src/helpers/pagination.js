import { computed } from "vue";

export function usePagination(data, currentPage, perPage) {
  const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * perPage.value;
    const endIndex = startIndex + perPage.value;
    return data.value.slice(startIndex, endIndex);
  });

  return {
    paginatedData,
  };
}
