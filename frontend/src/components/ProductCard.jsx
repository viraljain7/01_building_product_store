import React from "react";
import { useProductStore } from "../store/productStore";
import { toast } from "react-toastify";

function ProductCard({ product, setOpen, setSelected }) {
  const { deleteProduct } = useProductStore();

  const deleteHandler = async (ID) => {
    setSelected(product);
    const { success, message } = await deleteProduct(ID);

    if (success) {
      toast.success(message);
      // setDeleteOpen(true);
    }
  };
  return (
    <div key={product._id} className="card bg-base-100 shadow-xl">
      <figure className="px-4 pt-4">
        {" "}
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full rounded-xl object-cover"
        />{" "}
      </figure>
      <div className="card-body">
        {" "}
        <h2 className="card-title">{product.name}</h2>{" "}
        <p className="text-lg font-semibold text-primary"> ₹{product.price} </p>{" "}
        <div className="card-actions justify-end gap-2">
          {" "}
          <button
            className="btn btn-warning btn-sm"
            onClick={() => {
              setOpen(true);
              setSelected(product);
            }}
          >
            Edit
          </button>{" "}
          <button
            className="btn btn-error btn-sm"
            onClick={() => deleteHandler(product._id)}
          >
            Delete
          </button>{" "}
        </div>{" "}
      </div>
    </div>
  );
}

export default ProductCard;
