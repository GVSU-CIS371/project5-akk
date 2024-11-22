import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[],
    filteredProducts: [] as ProductDoc[],
  }),
  actions: {
    init() {
      this.products = initProducts();
      this.filteredProducts = this.products;
    },
    filterByCategory(category: string) {
      this.filteredProducts = this.products.filter(
        (product) => product.data.category === category
      );
    },
    filterByRating(minRating: number) {
      this.filteredProducts = this.products.filter(
        (product) => product.data.rating >= minRating
      );
    },
  },
});

