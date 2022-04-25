import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {

     const [mobMenu, setMobMenu] = useState("hidden");
     const menuClick = () => { 
          if (mobMenu != "") setMobMenu(""); 
          else setMobMenu("hidden"); 
     }

     return (
     <div className="flex flex-col">
          <nav className="flex justify-around py-4 bg-white/50 backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-10">

            <div className="flex items-center">
               <Link to="/">
                <span className="cursor-pointer">
                    <h3 className="text-2xl font-medium text-blue-500">
                        Amazura
                    </h3>
                </span>
               </Link>
            </div>

            <div className="items-center hidden w-96 sm:w-80 lg:flex sm:flex"></div>

            <div className="hidden md:flex items-center space-x-6 text-lg">
               

               {/* <div className="w-80 md:block md:w-auto grid grid-cols-4 gap-4" id="mobile-menu"> */}
                    <Link to="/">
                    <span className="flex text-gray-600 hover:text-blue-500
                         cursor-pointer transition-colors duration-300 text-base">
                         Shop
                    </span>
                    </Link>
                    <Link to="/products">
                    <span className="flex text-gray-600 hover:text-blue-500
                         cursor-pointer transition-colors duration-300 text-base">
                         Products Data
                    </span>
                    </Link>
                    <Link to="/transactions">
                    <span className="flex text-gray-600 hover:text-blue-500
                         cursor-pointer transition-colors duration-300 text-base">
                         Transactions
                    </span>
                    </Link>
               {/* </div> */}

            </div>
            <div className="flex md:hidden items-center space-x-6 text-lg">
               <div className="relative">
                    <button data-collapse-toggle="mobile-menu" onClick={menuClick} type="button" className="inline-flex items-center p-2 ml-20 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
                         <span className="sr-only">Open main menu</span>
                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                         <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    
                    <input type="checkbox" name="show_more" id="show_more" className="hidden peer"/>
                    <div className={'absolute w-[150px] -left-7 rounded shadow bg-white overflow-hidden peer:flex flex-col mt-1 border border-gray-200 ' + mobMenu}>
                         <div className="cursor-pointer group">
                              <Link to="/">
                              <span className="block p-2 border-transparent border-l-4 group-hover:border-teal-500 group-hover:bg-gray-100 text-base">
                                   Shop
                              </span>
                              </Link>
                         </div>
                         <div className="cursor-pointer group border-t">
                              <Link to="/products">
                              <span className="block p-2 border-transparent border-l-4 group-hover:border-teal-500 group-hover:bg-gray-100 text-base">
                                   Products Data
                              </span>
                              </Link>
                         </div>
                         <div className="cursor-pointer group border-t">
                              <Link to="/transactions">
                              <span className="block p-2 border-transparent border-l-4 group-hover:border-teal-500 group-hover:bg-gray-100 text-base">
                                   Transaction
                              </span>
                              </Link>
                         </div>
                    </div>
               </div>
            </div>
          </nav>
     </div>
     )
}

export default Header
