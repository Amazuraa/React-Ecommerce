import React, { useEffect, useState } from "react";
import api from "../api/api";

import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import ProductFormEdit from "../components/ProductFormEdit";

const Products = () => {

//#region -- Fetch State --
     const [products, setProducts] = useState([]);

     const getProducts = async () => {
          const res = await api.get("/products");
          return res.data;
     }    

     const getAllProduct = async () => {
          const all = await getProducts();
          setProducts(all);
     }

     useEffect(() => {
          getAllProduct();
     }, [])
//#endregion

//#region -- Comp Interactions --
     const [showForm, setShowForm] = useState(0);
     const [editData, setEditData] = useState({});

     const changeState = (i) => setShowForm(i);
     const changeEditData = (i) => setEditData(products[i]); 
//#endregion

     return (
          <div>
          {
               (() => {
                    switch(showForm) {
                         case 0: { return (<ProductList handleHide={changeState.bind(this)} 
                                                            handleEdit={changeEditData.bind(this)}
                                                            handleFetch={getAllProduct.bind(this)}
                                                            data={products} />) } 
                              break;
                         case 1: { return (<ProductForm handleHide={changeState.bind(this)}
                                                            handleFetch={getAllProduct.bind(this)} />) } 
                              break;
                         case 2: { return (<ProductFormEdit handleHide={changeState.bind(this)}
                                                            handleFetch={getAllProduct.bind(this)}
                                                            data={editData} />) } 
                              break;
                    }
               })()  
          }  
          </div>
     )
}

export default Products