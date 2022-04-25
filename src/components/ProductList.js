import React, { useEffect, useState } from "react";
import api from "../api/api";

const ProductList = ({ handleHide, handleEdit, handleFetch, data }) => {

     const products = data;

     const onDelete = async (id) => {
          // console.log(id);
          await api.delete('/products/' + id);
          handleFetch();

          // const newProducts = products.filter((product) => {
          //      return product.id !== id;
          // });

          // setProducts(newProducts);
     }
       
     return (
     <div className="flex items-center justify-center w-screen p-8 mt-10">
          <div className="container">
               <button onClick={() => { handleHide(1) }} className='px-3 py-2 bg-sky-500 rounded-md text-white text-sm my-5 float-right font-semibold '>
                    Add Product
               </button>
               <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg">
               <thead className="text-white">
                    { products.map((val, idx) => {
                         return (
                         <tr key={idx} className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                              <th className="p-3 text-center w-12">#</th>
                              <th className="p-3 text-center">Image</th>
                              <th className="p-3 text-center">Prod Name</th>
                              {/* <th className="p-3 text-center">Short Desc</th> */}
                              <th className="p-3 text-center">Price</th>
                              <th className="p-3 text-center w-36">Actions</th>
                         </tr>
                         )
                    }) }
               </thead>
               <tbody className="flex-1 sm:flex-none">
                    { products.map((val, idx) => {
                         return (
                         <tr key={idx} className="flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                              <td className="border-grey-light border hover:bg-gray-100 p-3">{idx+1}</td>
                              <td className="border-grey-light border hover:bg-gray-100 text-left">
                                   <img className=" h-12 lg:h-10 w-full object-cover" src={val.prod_image} alt="" />
                              </td>
                              <td className="border-grey-light border hover:bg-gray-100 p-3 text-center">{val.prod_name}</td>
                              <td className="border-grey-light border hover:bg-gray-100 p-3 text-center">Rp {val.prod_price}</td>
                              <td className="border-grey-light border hover:bg-gray-100 text-center">
                                   <button onClick={() => { handleEdit(idx), handleHide(2) }} className='px-3 py-1 mr-1 text-gray-700 bg-gray-200 rounded-md hover:bg-teal-300 hover:text-white'>Edit</button>
                                   <button onClick={() => { onDelete(val.id) }} className='px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-red-500 hover:text-white'>Del</button>
                              </td>
                         </tr>
                         )
                    }) }
               </tbody>
               </table>
          </div>
     </div> 
     );
}

export default ProductList