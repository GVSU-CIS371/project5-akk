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

    <!-- Actions -->
    <v-card-actions class="justify-space-between mt-4">
      <v-btn color="primary">Add to Cart</v-btn>
      <v-btn color="red" @click="deleteProduct">Delete</v-btn>
    </v-card-actions>

    <!-- Create Product Button -->
    <v-btn color="primary" @click="showDialog = true">Create New Product</v-btn>

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
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ProductDoc } from "../types/product";
import { useProductStore } from "../stores/ProductStore";

// Initialize the product store
const productStore = useProductStore();

// Define props for the component
const { product } = defineProps<{
  product: ProductDoc;
}>();

// State for showing the dialog and form data
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

// Method to submit the product and close the dialog
function submitProduct() {
  if (newProduct.value.name && newProduct.value.description) {
    const newProductDoc: ProductDoc = {
      id: Date.now().toString(), // Temporary ID generation
      data: {
        name: newProduct.value.name,
        description: newProduct.value.description,
        price: newProduct.value.price,
        rating: newProduct.value.rating,
        stock: newProduct.value.stock,
        image: newProduct.value.image,
        category: newProduct.value.category,
      },
    };

    productStore.addProduct(newProductDoc);
    showDialog.value = false; // Close the dialog
    resetForm(); // Reset form data
  }
}

// Method to reset form data
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

// Function to delete a product
function deleteProduct() {
  productStore.deleteProduct(product.id);
}
</script>

