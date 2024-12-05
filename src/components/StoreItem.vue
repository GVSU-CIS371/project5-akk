<template>
  <v-card height="100%" class="pa-4">
    <!-- Product Details -->
    <v-card-title class="text-subtitle-1 font-weight-bold text-center mb-4">
      {{ product.data.name }}
    </v-card-title>

    <v-card-text class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <v-icon color="orange" class="mr-1">mdi-star</v-icon>
        {{ product.data.rating }} / 5
      </div>
      <div class="d-flex align-center">
        <v-icon color="green" class="mr-1">mdi-currency-usd</v-icon>
        {{ product.data.price }}
      </div>
      <div class="d-flex align-center">
        <v-icon color="blue" class="mr-1">mdi-cube-outline</v-icon>
        {{ product.data.stock }}
      </div>
    </v-card-text>

    <v-img
      :src="product.data.image"
      :alt="product.data.name"
      height="150"
      max-height="150"
      contain
      class="mx-auto my-4"
    ></v-img>

    <v-card-text class="mt-4">
      <p class="mb-0" style="white-space: normal;">
        {{ product.data.description }}
      </p>
    </v-card-text>

    <v-card-actions class="justify-space-between mt-4">
      <v-btn color="primary">Add to Cart</v-btn>
      <v-btn color="red" @click="deleteProduct">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { useProductStore } from "../stores/ProductStore";
import { ProductDoc } from "../types/product";

const productStore = useProductStore();
const { product } = defineProps<{ product: ProductDoc }>();

function deleteProduct() {
  productStore.deleteProduct(product.id);
}
</script>
