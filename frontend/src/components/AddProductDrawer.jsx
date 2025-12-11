import { useState } from "react";
import { useProductStore } from "../store/productStore";
import { toast } from "react-toastify";

export default function ProductModal({open,setOpen}) {
  // const [open, setOpen] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  // universal input handler
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async function () {
    const { success, message } =await createProduct(product);
    setProduct({
      name: "",
      price: "",
      image: "",
    })
    if(success){
      setOpen(false);
      toast.success(message)
    }else{
      toast.info(message)
    }

  };

  const { createProduct } = useProductStore();

  return (
  
    

    <dialog className={`modal backdrop-blur-xs ${open ? "modal-open" : ""}  z-[9999]`}>

        <div className="modal-box w-[380px] p-6 rounded-lg z-[10000]">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-xl">Add Product</h3>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Product Name */}
          <div className="form-control mb-6">
            <label className="label pb-1">
              <span className="label-text text-base">Product Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              className="input input-bordered h-11"
              value={product.name}
              onChange={changeHandler}
            />
          </div>

          {/* Price */}
          <div className="form-control mb-6">
            <label className="label pb-1">
              <span className="label-text text-base">Price (₹)</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              className="input input-bordered h-11"
              value={product.price}
              onChange={changeHandler}
            />
          </div>

          {/* Image URL */}
          <div className="form-control mb-6">
            <label className="label pb-1">
              <span className="label-text text-base">Product Image Link</span>
            </label>
            <input
              type="text"
              name="image"
              placeholder="Paste image URL"
              className="input input-bordered h-11"
              value={product.image}
              onChange={changeHandler}
            />
          </div>

          {/* Footer */}
          <div className="modal-action mt-2 flex justify-end gap-2">
            <button className="btn min-w-[90px]" onClick={handleSave}>
              Save
            </button>

            <button
              className="btn btn-ghost min-w-[90px]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
  
  );
}
