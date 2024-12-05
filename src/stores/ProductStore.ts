import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { collection, getDocs, setDoc, doc, addDoc, deleteDoc, Firestore, getFirestore } from "firebase/firestore";
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
    async addProduct(newProduct: ProductDoc) {
      const productsCollection = collection(db, "products");
      const docRef = await addDoc(productsCollection, newProduct.data);
      this.products.push({ id: docRef.id, data: newProduct.data });
      this.filteredProducts = this.products;
    },
    async init() {
      const productsCollection = collection(db, "products");
      const snapshot = await getDocs(productsCollection)
        .catch((error) => {
          console.error("Error fetching products from Firestore:", error);
          return null;
        });

      if (!snapshot || snapshot.empty) {
        console.log("Firestore is empty. Initializing with local data.");
      } else {
        console.log("Products loaded from Firestore.");
        this.products = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })) as ProductDoc[];
      }

      this.filteredProducts = this.products;
    },
    async deleteProduct(productId: string) {
      const productDoc = doc(db, "products", productId);
      if (window.confirm("Are you sure you want to delete this item?")) {
        await deleteDoc(productDoc);
        this.products = this.products.filter((product) => product.id !== productId);
        this.filteredProducts = this.products;
      }
    },
  },
});
