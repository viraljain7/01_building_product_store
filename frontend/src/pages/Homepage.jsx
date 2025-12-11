import React, { useState } from "react";
import { useEffect } from "react";
import { useProductStore } from "../store/productStore";
import ProductCard from "../components/ProductCard";
import EditProductDrawer from "../components/EditProductDrawer";
import { toast } from "react-toastify";

function Homepage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [deleteOpen, setDeleteOpen] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSelected((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = async function ( editProduct) {
    const { success, message } = await updateProduct(
      editProduct._id,
      editProduct,
    );
    if (success) {
      toast.success(message);
      setOpen(false);
    }
  };

  // const [productList,setProductList]=useState([]);
  const { fetchProducts, products, updateProduct } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [products]);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      {/* Header */}
      

      {/* Product Grid */}

      {products.length === 0 ? (
        <div className="flex h-[60vh] flex-col items-center justify-center text-center">
          <div className="text-6xl opacity-40">📦</div>
          <h2 className="mt-4 text-xl font-semibold">No products found</h2>
          <p className="mt-1 text-sm text-base-content/70">
            Start by adding your first product.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              product={product}
              setOpen={setOpen}
              setSelected={setSelected}
            />
          ))}
        </div>
      )}

      <EditProductDrawer
        open={open}
        setOpen={setOpen}
        selected={selected}
        changeHandler={changeHandler}
        handleSave={handleSave}
      />

      {deleteOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setDeleteOpen(false)}
          ></div>

          {/* Modal Box */}
          <div className="relative w-[360px] rounded-xl bg-base-100 p-6 shadow-2xl">
            {/* Header */}
            <h3 className="text-xl font-semibold text-error">
              Confirm Deletion
            </h3>

            <p className="mt-3 text-sm text-base-content/70">
              Are you sure you want to delete
              <span className="font-semibold text-base-content">
                {" "}
                {selected?.name}
              </span>
              ?
            </p>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                className="btn btn-ghost w-1/2"
                onClick={() => setDeleteOpen(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error w-1/2"
                onClick={() => {
                  // await deleteProduct(selected.id)
                  setDeleteOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
