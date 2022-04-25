import React from "react";
import api from "../api/api";

const TransactionList = ({ handleFetch, data }) => {

     const transactions = data;

     const onDelete = async (id) => {
          await api.delete('/transactions/' + id);
          handleFetch();
     }

     return (
     <div>
          <div className="flex items-center justify-center w-screen px-8 ">
               <div className="container">
                    <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
                    <thead className="text-white">
                         { transactions.map((val, idx) => {
                              return (
                              <tr key={idx} className=" bg-lime-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                                   <th className="p-3 text-center w-12">#</th>
                                   <th className="p-3 text-center">ID</th>
                                   <th className="p-3 text-center">Prod Name</th>
                                   <th className="p-3 text-center">Date</th>
                                   <th className="p-3 text-center">Quantity</th>
                                   <th className="p-3 text-center">Total</th>
                                   <th className="p-3 text-center">Actions</th>
                              </tr>
                              )
                         }) }
                    </thead>
                    <tbody className="flex-1 sm:flex-none">
                         { transactions.map((val, idx) => {
                              return (
                              <tr key={idx} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                                   <td className="border-grey-light border hover:bg-gray-100 p-3 text-center">{idx+1}</td>
                                   <td className="border-grey-light border hover:bg-gray-100 p-3 text-center">{val.id}</td>
                                   <td className="border-grey-light border hover:bg-gray-100 p-3 text-center">{val.prod_name}</td>
                                   <td className="border-grey-light border hover:bg-gray-100 p-3 text-center">{val.tran_date}</td>
                                   <td className="border-grey-light border hover:bg-gray-100 p-3 text-center">{val.tran_qty}</td>
                                   <td className="border-grey-light border hover:bg-gray-100 p-3 text-center">Rp {val.tran_total}</td>
                                   <td className="border-grey-light border hover:bg-gray-100 text-center">
                                        <button onClick={() => { onDelete(val.id) }} className='px-3 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-red-500 hover:text-white'>Del</button>
                                   </td>
                              </tr>
                              )
                         }) }
                    </tbody>
                    </table>
               </div>
          </div>
     </div>
     );
}

export default TransactionList