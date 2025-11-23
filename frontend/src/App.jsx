import React from "react";
import Header from "./components/Header";
import ProductModal from "./components/AddProductDrawer";
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <div  className="w-full">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
