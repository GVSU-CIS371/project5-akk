import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { collection, getDocs, setDoc, doc, Firestore, getFirestore } from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbZn61IWuuVRTRRHMCSD0U2qrkN_i_TNs",
  authDomain: "akk-project-371.firebaseapp.com",
  projectId: "akk-project-371",
  storageBucket: "akk-project-371.firebasestorage.app",
  messagingSenderId: "669536435000",
  appId: "1:669536435000:web:9d30653c23075360641fcd",
  measurementId: "G-C0KW20Q7ZL"
};

// Initialize Firebase app and Firestore
const myapp: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(myapp);

export { db };

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[],
    filteredProducts: [] as ProductDoc[],
  }),
  actions: {
    async init() {
      const productsCollection = collection(db, "products");
      const snapshot = await getDocs(productsCollection)
        .catch((error) => {
          console.error("Error fetching products from Firestore:", error);
          return null;
        });

      if (!snapshot || snapshot.empty) {
        console.log("Firestore is empty. Initializing with local data.");
        const products = initProducts(); // Local initialization data

        await Promise.all(products.map((product) => 
          setDoc(doc(productsCollection, product.id), product.data)
        ));

        console.log("Firestore initialized with products.");
        this.products = products; // Update state with local data
      } else {
        console.log("Products loaded from Firestore.");
        this.products = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })) as ProductDoc[];
      }

      // Sync filteredProducts with loaded data
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
