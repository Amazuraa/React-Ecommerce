import React, { useState } from "react";
import api from "../api/api";


const ShopDetail = ({ data, handleHide }) => {

     const product = data;

     const [modalControl, setModalControl] = useState("hidden");
     const [qty, setQty] = useState(1);
     const [price, setPrice] = useState(product.prod_price);
     
     const buyClick = async () => {
          let rand = Math.floor(100000 + Math.random() * 900000);
          let weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
          const d = new Date();

          let data = {
               id : "TRN_" + rand,
               prod_name : product.prod_name,
               tran_date : weekday[d.getDay()] + " " + d.getDate(),
               tran_type : product.prod_type,
               tran_qty: qty,
               tran_total: price
          };

          await api.post("/transactions", data);

          setModalControl("");
          setQty(1);
          setPrice(product.prod_price);
     }

     const plus = () => {
          setPrice(product.prod_price * (qty + 1));
          setQty(qty + 1);
     }

     const min = () => {
          setPrice(product.prod_price * (qty - 1));
          setQty(qty - 1);
     }

     return (
          <div className="text-left mt-16">
               <section className="text-gray-700 body-font overflow-hidden bg-white">
                    <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                         <img alt="ecommerce" className="lg:w-1/2 w-full h-96 object-cover object-center rounded border border-gray-200" 
                              src={product.prod_image} />
                         <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                         <div className="flex">
                              <span className="title-font font-medium text-2xl text-gray-900">{product.prod_name}</span><br/>
                              <button onClick={() => { handleHide() }} className="flex ml-auto text-white bg-slate-400 border-0 py-2 px-6 focus:outline-none hover:bg-red-200 rounded">Back</button>
                         </div>
                         <h3 className="font-medium text-base text-gray-500 capitalize">{product.prod_type}</h3>

                         <div className="flex mt-2 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>

                         <p className="leading-relaxed">{product.prod_desc}</p>
                         <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>

                         <div className="flex">
                              <span className="title-font font-medium text-2xl text-gray-900">Rp {price}</span>
                              <button onClick={() => buyClick()} className="flex ml-auto text-white bg-green-500 border-0 mr-2 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">Buy</button>
                              <div className="flex flex-row border h-10 w-24 rounded-lg relative">
                                   <button onClick={() => min()} className="font-semibold border-r bg-slate-400 hover:bg-sky-600 text-white h-full w-20 flex rounded-l-md focus:outline-none cursor-pointer" disabled={((qty == 1) ? true : false)}>
                                        <span className="m-auto">-</span>
                                   </button>
                                   <input
                                        className="md:p-2 p-1 text-xs w-10 md:text-base border-gray-400 focus:outline-none text-center"
                                        readOnly
                                        type="number"
                                        value={qty} min="1"
                                   />
                                   <button onClick={() => plus()} className="font-semibold border-l  bg-slate-400 hover:bg-sky-600 text-white h-full w-20 flex rounded-r-md focus:outline-none cursor-pointer">
                                        <span className="m-auto">+</span>
                                   </button>
                              </div>
                         </div>
                         </div>
                    </div>
                    </div>
               </section>
               
               {/* -- Modal -- */}
               <div className={"w-full h-full bg-black/50 backdrop-blur-md place-content-center fixed top-0 left-0 right-0 z-11 " + modalControl }>
                    <div id="modal-bg" className="w-full h-full bg-slate-50 top-20 absolute hidden"></div>
                    <div id="modal-box" className=" sm:min-w-[30vw] min-w-[80vw] flex flex-col items-center gap-2 -translate-y-1/2 p-6 bg-[#FFFFEB] rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute">
                         <svg xmlns="http://www.w3.org/2000/svg" className="text-[#059669] mx-auto h-11 rounded-full bg-[#D1FAE5] w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7" />
                         </svg>
                         <span className="text-2xl font-medium text-center">Payment Successful</span>
                         <button onClick={() => setModalControl("hidden")} className='px-3 py-2 mr-2 bg-slate-400 rounded-md text-white text-sm mt-5 float-right font-semibold '>
                              Close
                         </button>
                    </div>
               </div>
          </div>
     )
}

export default ShopDetail