import React, { useEffect, useState } from "react";
import api from "../api/api";

import Shop from "../components/Shop";
import ShopDetail from "../components/ShopDetail";

const Home = () => {
     const [products, setProducts] = useState([]);
     const [detail, setDetail] = useState([]);

     const getProducts = async () => {
          const res = await api.get("/products");
          return res.data;
     }    

     useEffect(() => {
          const getAllProduct = async () => {
            const all = await getProducts();
            setProducts(all);
          }
      
          getAllProduct();
     }, [])

     const [showDetail, setShowDetail] = useState(false);

     const sDetail = () => setShowDetail(true);
     const hDetail = () => setShowDetail(false);
     const setProduct = (i) => setDetail(products[i]);

     return (
          <div>
               {
                    showDetail ? 
                    <ShopDetail data = {detail}
                                handleHide = {hDetail.bind(this)} /> :
                    <Shop data = {products} 
                          handleDetail = {setProduct.bind(this)}
                          handleHide = {sDetail.bind(this)} />
               }
          </div>
     )
}

export default Home