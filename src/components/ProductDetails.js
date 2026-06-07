import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "./Product.js";
import RecursiveDisplay from "./RecursiveDisplay.js";

function ProductDetails() {
  let params = useParams();
  // console.log("productID params: ", params.ProductId);

  let API_Product_URL = `https://dummyjson.com/products/${params.ProductId}`;

  let [myProduct, setMyProduct] = useState({});

  useEffect(() => {
    async function getProductDetails() {
      const res = await fetch(API_Product_URL);
      const data = await res.json();
      
      if(!res.ok) {
        throw new Error(`Error fetching product details: ${res.status} ${res.statusText}`);
      }
      
      setMyProduct({ ...data});
    }

    getProductDetails();

  }, [API_Product_URL, params.ProductId]);


  if(myProduct === null || Object.keys(myProduct).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Product myObj={myProduct} showButton={false}>
        <ul><RecursiveDisplay myObj={myProduct} /></ul>
    </Product>
  );
}

export default ProductDetails;