import React, { useState } from "react";
import api from "../api/api";

const Shop = ({ data, handleDetail, handleHide }) => {

     const products = data;
     
     const buyClick = async (_name, _type, _qty, _price) => {
          let rand = Math.floor(100000 + Math.random() * 900000);
          let weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
          const d = new Date();

          let data = {
               id : "TRN_" + rand,
               prod_name : _name,
               tran_date : weekday[d.getDay()] + " " + d.getDate(),
               tran_type : _type,
               tran_qty: _qty,
               tran_total: parseInt(_qty) * parseInt(_price)
          };

          // console.log(data);

          await api.post("/transactions", data);
     }

     const detailClick = (i) => {
          handleDetail(i);
          handleHide();
     }

     return (
     <section className="h-screen w-screen p-8 mt-10">
          <div className="grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7 my-10">
               { products.map((val, idx) => {
                    return (
                    <div key={idx} className="bg-white rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden">
                         <img className="h-56 lg:h-60 w-full object-cover" 
                              src={val.prod_image} alt="" />
                         <div className="p-3">
                              <div className="flex">
                                   <span className="title-font text-center ml-2 font-medium text-2xl text-gray-900">{val.prod_name}</span>
                                   <span className="flex ml-auto py-2 pl-6 mr-2 font-medium text-green-700 float-right">Rp {val.prod_price}</span>
                                   {/* <span className="flex ml-auto text-white bg-green-500 border-0 mr-2 py-2 px-6">Buy</span> */}
                              </div>
                              <p className="paragraph-normal text-gray-600 px-3 mt-3">
                                   {val.prod_desc}
                              </p>
                              {/* <button onClick={() => { buyClick(val.prod_name, val.prod_type, 1, val.prod_price) }} className="px-4 py-2 mt-5 w-full block text-gray-700 bg-gray-200 rounded-md hover:bg-teal-400 hover:text-white">
                                   Buy
                              </button> */}

                              

                              <button onClick={() => { detailClick(idx) }} className="px-4 py-2 mt-5 w-full block text-gray-700 bg-gray-200 rounded-md hover:bg-teal-400 hover:text-white">
                                   Buy
                              </button>
                         </div>
                    </div>
                    )
               }) }
          </div>
     </section>
     )
}

export default Shop