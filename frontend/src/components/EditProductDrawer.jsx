import React from 'react'

function EditProductDrawer({open, setOpen,selected,changeHandler,handleSave}) {
  return (
    <dialog className={`modal backdrop-blur-xs ${open ? "modal-open" : ""}`}>
    <div className="modal-box w-[380px] p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-xl">Edit Product</h3>
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
          value={selected.name}
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
          value={selected.price}
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
          value={selected.image}
          onChange={changeHandler}
        />
      </div>

      {/* Footer */}
      <div className="modal-action mt-2 flex justify-end gap-2">
        <button className="btn min-w-[90px]" onClick={() => handleSave( selected)}>
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
  )
}

export default EditProductDrawer
