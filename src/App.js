import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router";
import Navbar from "./components/Navbar.js";
import Slider from "./components/Slider.js";
import  Main  from "./components/Main.js";
import  About from "./components/About.js";
import ProductList from "./components/ProductList.js";
import ProductDetails from "./components/ProductDetails.js";

import img6 from './Imgs/slider-homepage3-img1.webp';
import img7 from './Imgs/slider-homepage3-img2.webp';
import img8 from './Imgs/slider_01_2e4b77f0-6708-4280-aef2-b558c8e9d233.webp';
function App() {

  let mainImgs = [img6, img7, img8];
  // new page == new route (بأختصار كده)

  return (
    <div className="App bg-light ">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <><Slider Imgs={mainImgs}/>
          <Main />
          <ProductList />
          </>
        } />
        <Route path="/About" element={<About />} />
        <Route path="/ProductDetails/:APInum/:ProductId" element={<ProductDetails />}/>
      </Routes>
    </div>
  );
} 

export default App;