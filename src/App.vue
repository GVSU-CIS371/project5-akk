<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar class="bg-blue-darken-4">
      <v-toolbar-title>My Online Store</v-toolbar-title>

      <!-- Navigation Links -->
      <v-btn
        class="mx-5 text-white"
        v-for="link in links"
        :key="link.text"
        :to="link.to"
        text
      >
        <v-icon left>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>

      <!-- Create New Product Button -->
      <v-btn
        color="primary"
        class="ml-auto text-white font-weight-bold"
        elevation="2"
        outlined
        @click="showDialog = true"
      >
        <v-icon left class="text-white">mdi-plus-circle</v-icon>
        <span class="text-white">Create New Product</span>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-blue-lighten-5">
      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <!-- Footer -->
    <v-footer color="primary" app>
      © 2023 My Online Store. All rights reserved.
    </v-footer>





    <!-- Product Form Dialog -->

    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title class="font-weight-bold">Create New Product</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitProduct">
            <v-text-field v-model="newProduct.name" label="Product Name" required></v-text-field>
            <v-textarea v-model="newProduct.description" label="Product Description" required></v-textarea>
            <v-text-field v-model="newProduct.image" label="Image URL" required></v-text-field>
            <v-text-field v-model="newProduct.price" label="Price" type="number" required></v-text-field>

            <v-slider
              v-model="newProduct.rating"
              :min="0"
              :max="5"
              :step="1"
              ticks="always"
              tick-size="4"
              label="Rating (0-5)"
              class="mt-3"
            >
              <template v-slot:append>
                <v-label>{{ newProduct.rating }}</v-label> <!-- This displays the current rating value -->
              </template>
            </v-slider>
            <v-text-field v-model="newProduct.stock" label="Stock" type="number" required></v-text-field>
            <v-btn type="submit" color="success" class="mt-3">Create Product</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>









  </v-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useProductStore } from "./stores/ProductStore";

// Product Store
const productStore = useProductStore();
const showDialog = ref(false);

// New Product Data
const newProduct = ref({
  name: "",
  description: "",
  price: 0,
  rating: 0,
  stock: 0,
  image: "",
  category: "Default Category",
});

// Navigation Links
const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);

// Submit New Product
function submitProduct() {
  if (newProduct.value.name && newProduct.value.description) {
    const newProductDoc = {
      id: Date.now().toString(), // Temporary ID generation
      data: { ...newProduct.value },
    };
    productStore.addProduct(newProductDoc);
    showDialog.value = false;
    resetForm();
  }
}

// Reset Product Form
function resetForm() {
  newProduct.value = {
    name: "",
    description: "",
    price: 0,
    rating: 0,
    stock: 0,
    image: "",
    category: "Default Category",
  };
}
</script>
