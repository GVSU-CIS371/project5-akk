<template>
  <CategoryTemplate :category="category" />
</template>

<script setup lang="ts">
  import CategoryTemplate from './CategoryTemplate.vue';
  const category = 'Groceries';
</script>

