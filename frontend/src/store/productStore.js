import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  // setProducts (for loading from API)
  setProducts: (products) => set({ products }),

  // Create Product
  createProduct: async (newProduct) => {
    // Validate
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill all fields." };
    }

    // Send to backend
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    // Add to Zustand store
    set((state) => ({
      products: [...state.products, data.data],
    }));

    return { success: true, message: "Product added!" };
  },

  // Load all products
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    if (data.success) {
      set({ products: data.data });
    }
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`,{
      method:"DELETE"
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    set(state=>({products:state.products.filter(p=>p._id!==pid)}))
    return { success: true, message: data.message };

  },

  updateProduct: async (pid,updateProduct) => {
    const res = await fetch(`/api/products/${pid}`,{
      method:"PUT",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(updateProduct)
    }
  );
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }

    set(state=>({products:state.products.map(product=>product._id===pid?data.data:product)}))
    return { success: true, message: data.message };

  },


}));
