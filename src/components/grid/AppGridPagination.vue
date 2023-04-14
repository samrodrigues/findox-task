<template>
  <div class="pagination">
    <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} of {{ pageCount }}</span>
    <button @click="nextPage" :disabled="currentPage === pageCount">Next</button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: Number,
  pageCount: Number,
});

const emit = defineEmits(['pageUpdated']);

const nextPage = () => {
  if (props.currentPage < props.pageCount) {
    emit('pageUpdated', props.currentPage + 1);
  }
};

const previousPage = () => {
  if (props.currentPage > 1) {
    emit('pageUpdated', props.currentPage - 1);
  }
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin: 12px 0;

  button {
    line-height: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:disabled {
      color: #e0e0e0;
      cursor: not-allowed;
    }
  }
}
</style>
