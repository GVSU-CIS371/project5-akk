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

    <!-- Actions -->
    <v-card-actions class="justify-space-between mt-4">
      <v-btn color="primary" @click="modifyProduct">Modify</v-btn>
      <v-btn color="red" @click="deleteProduct">Delete</v-btn>
    </v-card-actions>

    <!-- Product Form Dialog -->
    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title class="font-weight-bold">
          {{ isEditing ? "Modify Product" : "Create New Product" }}
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitProduct">
            <v-text-field v-model="newProduct.name" label="Product Name" required></v-text-field>
            <v-textarea v-model="newProduct.description" label="Product Description" required></v-textarea>
            <v-text-field v-model="newProduct.price" label="Price" type="number" required></v-text-field>
            <v-text-field v-model="newProduct.image" label="Image URL" required></v-text-field>
            <v-text-field v-model="newProduct.rating" label="Rating (0-5)" type="number" min="0" max="5" required></v-text-field>
            <v-text-field v-model="newProduct.stock" label="Stock" type="number" required></v-text-field>
            <v-btn type="submit" color="success" class="mt-3">
              {{ isEditing ? "Save Changes" : "Create Product" }}
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useProductStore } from "../stores/ProductStore";
import { ProductDoc } from "../types/product";

// Product Store
const productStore = useProductStore();

// Props
const { product } = defineProps<{ product: ProductDoc }>();

// State
const showDialog = ref(false);
const isEditing = ref(false);
const newProduct = ref({
  name: "",
  description: "",
  price: 0,
  rating: 0,
  stock: 0,
  image: "",
  category: "Default Category",
});

// Open Modify Dialog
function modifyProduct() {
  isEditing.value = true;
  showDialog.value = true;

  // Load existing product data into form
  newProduct.value = { ...product.data };
}

// Submit Product (Create or Modify)
function submitProduct() {
  if (isEditing.value) {
    // Update existing product
    productStore.updateProduct({
      id: product.id,
      data: { ...newProduct.value },
    });
  } else {
    // Create new product (if needed elsewhere)
    const newProductDoc = {
      id: Date.now().toString(),
      data: { ...newProduct.value },
    };
    productStore.addProduct(newProductDoc);
  }

  // Reset dialog and form
  resetForm();
  showDialog.value = false;
}

// Delete Product
function deleteProduct() {
  productStore.deleteProduct(product.id);
}

// Reset Form
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
  isEditing.value = false;
}
</script>
