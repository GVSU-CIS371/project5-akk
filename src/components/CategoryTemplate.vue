<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in categoryProducts"
        :key="product.id"
        cols="12"
        md="4"
      >
        <StoreItem :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import { useProductStore } from "../stores/ProductStore";
  import StoreItem from "./StoreItem.vue";

  const props = defineProps<{
    category: string;
  }>();

  const productStore = useProductStore();

  onMounted(() => {
    productStore.init();
  });

  const categoryProducts = computed(() => 
    productStore.products.filter(product => product.data.category === props.category)
  );
</script>

