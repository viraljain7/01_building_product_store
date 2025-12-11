import React, { useState, useEffect } from "react";
import AddProductDrawer from "./AddProductDrawer";
import { DAISY_THEMES } from "../constants/themes";
import { IoAddCircleOutline } from "react-icons/io5";

function Header() {
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(false);

  // apply theme on change
  const changeTheme = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);

    // Apply DaisyUI theme
    document.documentElement.setAttribute("data-theme", newTheme);

    // Save to localStorage
    localStorage.setItem("app-theme", newTheme);
  };

  // load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (<>

    <div className="navbar bg-base-100 shadow-sm sticky z-[50]">
      <div className="flex flex-1">
        <img
          src="https://res.cloudinary.com/dltj8bim0/image/upload/v1761060580/logo_kukwt0.png"
          width={40}
          height={40}
          alt="logo"
        />
        <a className="btn btn-ghost text-xl">My Store</a>
      </div>

      <div className="flex gap-3 items-center flex-none">
        {/* THEME SELECTOR */}
        <div className="dropdown">
          <select
            value={theme}
            onChange={changeTheme}
            className="select select-bordered w-full"
          >
            {DAISY_THEMES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Add Product Drawer */}

        <div className="dropdown dropdown-end">
          {/* Open Button */}
          <button className="btn btn-primary" onClick={() => setOpen(true)}>
            <IoAddCircleOutline /> Add Product
          </button>
        </div>
      </div>

    </div>
      <AddProductDrawer open={open} setOpen={setOpen} />
  </>

  );
}

export default Header;
