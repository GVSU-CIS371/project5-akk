<template>
  <v-card height="100%" class="pa-4">
    <!-- Product Name -->
    <v-card-title class="text-subtitle-1 font-weight-bold text-center mb-4">
      {{ product.data.name }}
    </v-card-title>

    <!-- Product Details: Icons Side by Side -->
    <v-card-text class="d-flex justify-space-between align-center">
      <!-- Rating with Stars -->
      <div class="d-flex align-center">
        <v-icon color="orange" class="mr-1">mdi-star</v-icon>
        {{ product.data.rating }} / 5
      </div>

      <!-- Price with Dollar Icon -->
      <div class="d-flex align-center">
        <v-icon color="green" class="mr-1">mdi-currency-usd</v-icon>
        {{ product.data.price }}
      </div>

      <!-- Stock Availability with Cube Icon -->
      <div class="d-flex align-center">
        <v-icon color="blue" class="mr-1">mdi-cube-outline</v-icon>
        {{ product.data.stock }}
      </div>
    </v-card-text>

    <!-- Product Image -->
    <v-img
      :src="product.data.image"
      :alt="product.data.name"
      height="150"
      max-height="150"
      contain
      class="mx-auto my-4"
    ></v-img>

    <!-- Product Description -->
    <v-card-text class="mt-4">
      <p class="mb-0" style="white-space: normal;">
        {{ product.data.description }}
      </p>
    </v-card-text>

    <!-- Add to Cart Button -->
    <v-card-actions class="justify-center mt-4">
      <v-btn color="primary">Add to Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { ProductDoc } from "../types/product";

// Accepting product prop
defineProps<{
  product: ProductDoc;
}>();
</script>
