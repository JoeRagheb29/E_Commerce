import { useState, useEffect } from "react";
import Product from "./Product.js";
import './product.css'

function ProductList() {
  // for Storing the Products and Categories in states
  let [ProductList, setProductList] = useState([]);
  let [CategoriesList, setCategoriesList] = useState([]);
  let API_URL1 = "https://dummyjson.com/products";

  const getAllProductsFromAPI = async () => {
    const res = await fetch(API_URL1);
    const data = await res.json();
    
    if(!res.ok) {
      throw new Error(`Error fetching products: ${res.status} ${res.statusText}`);
    }
    setProductList(data.products);
  }


  const getCategoriesFromAPI = async () => {
    const res = await fetch(`${API_URL1}/categories/`);
    const categories = await res.json();
    
    if(!res.ok) {
      throw new Error(`Error fetching categories: ${res.status} ${res.statusText}`);
    }
    setCategoriesList(categories);
  }

  async function getProductsByCategory(category) {
    const res = await fetch(`${API_URL1}/category/${category}`);
    const { products } = await res.json();
    
    if(!res.ok) {
      throw new Error(`Error fetching products by category: ${res.status} ${res.statusText}`);
    }
    setProductList(products);
  }

  useEffect(() => {
    getAllProductsFromAPI();
    getCategoriesFromAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let [activeAll, setActiveAll] = useState(false);
  let [activeCategory, setActiveCategory] = useState(null);

  function handleActiveAll() {
    setActiveAll(!activeAll);
    setActiveCategory(null); // Reset active category
    activeAll ? getAllProductsFromAPI() : setProductList([]);
  }
  
  function handleActive(cate) {
    if (activeCategory === cate.name) {
      setActiveCategory(null);
      getAllProductsFromAPI();
    } else {
      setActiveAll(null); // Reset active all products
      setActiveCategory(cate.name); // تعيين الفئة النشطة 
      getProductsByCategory(cate.name);
    }
  };
  
  return (
    <div className="container ">
      <h2 className="text-center p-5 ">Our Products</h2>
      <div className="container d-flex flex-wrap justify-content-center gap-2 my-3 ">
        <button
          className={`btn ${activeAll ? "blue" : "btn-outline-primary"}`}
          onClick={handleActiveAll}
        >
          All
        </button>
        {CategoriesList.map((cate) => {
          return (
            <button
              key={`${cate.name}`}
              className={`btn ${
                activeCategory === cate.name ? "blue" : "btn-outline-primary"
              }`}
              onClick={() =>
                handleActive(cate)
              }
            >
              {cate.name}
            </button>
          );
        })}
      </div>
      <div
        className="container d-grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}
      >
        {ProductList.map((product) => (
          <Product
            key={`${product.id}`}
            myObj={product}
            showButton={true}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;