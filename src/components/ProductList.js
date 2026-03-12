import { useState, useEffect } from "react";
import Product from "./Product.js";
import './product.css'
function ProductList() {
  // for Storing the Products and Categories in states
  let [ProductList, setProductList] = useState([]);
  let [CategoriesList, setCategoriesList] = useState([]);
  let API_URL1 = "https://dummyjson.com/products";
  // let API_URL2 = "https://fakestoreapi.com/products";


  const getAllProductsFromAPI = () => {
    fetch(API_URL1)
    .then((res) => res.json())
    .then(({ products }) => {
      setProductList(products);
    }).catch((err) => console.log(err));
  }



  const getCategoriesFromAPI = () => {
    fetch(`${API_URL1}/categories/`).then((res) => res.json()).then(({ categories }) => {
      setCategoriesList(categories);
    }).catch((err) => console.log(err));
  }


  function getProductsByCategory(category) {
    fetch(`${API_URL1}/category/${category}`)
      .then((res) => res.json())
      .then(({ products }) => {
        setProductList(products);
      }).catch((err) => console.log(err));
  }

  // //deepseek code
  // const getAllProductsFromAPI = () => {
  //   fetch(API_URL1)
  //     .then((res) => res.json())
  //     .then(({ products: api1Products }) => {
  //       const processedApi1 = api1Products.map((p) => ({...p,isFromAPI1: true}));
  //       // fetch(API_URL2)
  //       //   .then((res) => res.json())
  //       //   .then((api2Products) => {
  //       //     const processedApi2 = api2Products.map((p) => ({...p,isFromAPI1: false}));
  //       //     setProductList([...processedApi1, ...processedApi2]);
  //       //   });
  //     });
  // };

  // //deepseek
  // const getCategoriesFromAPI = () => { 
  //   fetch(`${API_URL1}/categories`)
  //     .then((res) => res.json())
  //     .then((api1Categories) => {
  //     //   fetch(`${API_URL2}/categories`)
  //     //     .then((res) => res.json())
  //     //     .then((api2Categories) => {
  //           const processedCategories = [
  //             ...api1Categories.map((c) => ({name: c.name,isFromAPI1: true})), // استخراج name من الـ object
  //     //         ...api2Categories.map((c) => ({ name: c, isFromAPI1: false })), // الـ API2 بيكون strings
  //           ];
  //           console.log(processedCategories);
  //     //       setCategoriesList(processedCategories);
  //     //     });
  //     });
  // };

  // //deepseek
  // function getProductsByCategory(category) {
  //   fetch(`${API_URL1}/category/${category}`)
  //     .then((res) => res.json())
  //     // destructuring for get the products form the API1 directly
  //     .then(({ products: api1Products }) => {
  //       // fetch(`${API_URL2}/category/${category}`)
  //         // .then((res) => res.json())
  //         // .then((api2Products) => {
  //           const merged = [
  //             ...api1Products.map((p) => ({ ...p, isFromAPI1: true })),
  //             // ...api2Products.map((p) => ({ ...p, isFromAPI1: false }))
  //           ];
  //           console.log(merged);
  //           setProductList(merged);
  //         });
  //     // });
  // };

  // call the APIs and get return the results in stateHooks only once
  useEffect(() => {
    getAllProductsFromAPI();
    getCategoriesFromAPI();
  }, []);

  let [activeAll, setActiveAll] = useState(false);
  let [activeCategory, setActiveCategory] = useState(null);

    function handleActiveAll() {
      setActiveAll(!activeAll);
      setActiveCategory(null); // Reset active category
      activeAll ? getAllProductsFromAPI() : setProductList([]);
    }

    // دالة لتحديد الفئة النشطة وجلب المنتجات الخاصة بها
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
          console.log(cate.name);
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
            key={`${product.isFromAPI1}-${product.id}`}
            myObj={product}
            showButton={true}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;