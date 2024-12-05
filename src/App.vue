<template>
  <v-app>
    <v-app-bar class="bg-blue-darken-4">
      <v-toolbar-title>My Online Store</v-toolbar-title>
      <v-btn class="mx-5" v-for="link in links" :key="link.text" :to="link.to">
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>
      <!-- Add the Create New Product button -->
      <v-btn color="primary" class="ml-auto" @click="showDialog = true">
        Create New Product
      </v-btn>
    </v-app-bar>
    <v-main class="bg-blue-lighten-5">
      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

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
            <v-text-field v-model="newProduct.price" label="Price" type="number" required></v-text-field>
            <v-text-field v-model="newProduct.image" label="Image URL" required></v-text-field>
            <v-text-field v-model="newProduct.rating" label="Rating (0-5)" type="number" min="0" max="5" required></v-text-field>
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

const productStore = useProductStore();
const showDialog = ref(false);

const newProduct = ref({
  name: "",
  description: "",
  price: 0,
  rating: 0,
  stock: 0,
  image: "",
  category: "Default Category",
});

const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);

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
