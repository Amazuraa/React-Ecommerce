import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import api from "../api/api";

const ProductFormEdit = ({ handleHide, handleFetch, data }) => {

     const productID = data.id;
     const images = {
          fruits : [
               "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
               "https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
               "https://images.unsplash.com/photo-1586999528871-ded77bc9656c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
               "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
               "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI2fHxmcnVpdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          ],
          snack : [
               "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHNuYWNrfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
               "https://images.unsplash.com/photo-1603423806798-0dd81439e1e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fHNuYWNrfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
               "https://images.unsplash.com/photo-1632687380457-05a1271e873b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25hY2t8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
               "https://images.unsplash.com/photo-1523484812979-8d03369644f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNuYWNrfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
               "https://images.unsplash.com/photo-1612773843298-44dcdd45d865?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
          ],
          fast_food : [
               "https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzdCUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
               "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhc3QlMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
               "https://images.unsplash.com/photo-1598679253544-2c97992403ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZhc3QlMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
               "https://images.unsplash.com/photo-1608142014114-3099960b7e41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGZhc3QlMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
               "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          ],
          no_img : "https://mountainholic.com/data/file/gallery/1794564802_GrmVxJz4_4f69963f2aec263bf84140cbb0de9d5dd61fc60a.png"
     }

     const { register, handleSubmit, reset, formState: {errors} } = useForm();
     const [image, setImage] = useState(data.prod_image);

     useEffect(() => {
          reset({
               prod_name: data.prod_name,
               prod_type: data.prod_type,
               prod_desc: data.prod_desc,
               prod_price: data.prod_price,
          });
     },[])
          
     const onSubmit = async (data) => {
          let expand = {
               prod_image : image
          };

          let merged = {...expand, ...data};

          reset({
               prod_name: "",
               prod_type: "",
               prod_desc: "",
               prod_price: "",
          });

          setImage(images.no_img);

          await api.put("/products/" + productID, merged);

          // update parent state..
          handleHide(0);
          handleFetch();
     };

     const onTypeChange = (val) => {
          let i = Math.floor(Math.random() * images.fruits.length);
          switch (val) {
               case "fruit": setImage(images.fruits[i]); break;
               case "snack": setImage(images.snack[i]); break;
               case "fast_food": setImage(images.fast_food[i]); break;
               default : setImage(images.no_img); break;
          }
     };

     return (
     <div className="flex justify-center">
     <div className="w-full lg:w-9/12 bg-white p-8 mt-16 rounded-lg lg:rounded-l-none">
          <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="block mb-5 text-xl text-gray-700">Edit Product</h4>
          <hr className=" border-dashed" />
          <div className="mb-4 mt-8 md:grid grid-rows-3 grid-flow-col gap-3">
               <div className="mb-4 md:mr-2 md:-mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 text-left" htmlFor="name">
                         Product Name
                    </label>
                    <input
                         {...register("prod_name", { required : "border-red-500" })}
                         className={"w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline " + errors.prod_name?.message}
                         id="name"
                         type="text"
                         placeholder="Lorem"
                    />
               </div>
               <div className="md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700 text-left" htmlFor="desc">
                         Short Desc
                    </label>
                    <textarea
                         {...register("prod_desc", { required : "border-red-500" })}
                         className={"w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline " + errors.prod_desc?.message}
                         id="desc"
                         placeholder="Lorem Ipsum.."
                    />
               </div>
               <div className="md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700 text-left" htmlFor="price">
                         Price
                    </label>
                    <input
                         {...register("prod_price", { required : "border-red-500" })}
                         className={"w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline " + errors.prod_price?.message}
                         id="price"
                         type="number"
                         placeholder="0"
                    />
               </div>
               <div className="mb-4 md:mr-2 md:-mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700 text-left" htmlFor="type">
                         Product Type
                    </label>
                    <select
                         {...register("prod_type", { required : "border-red-500" })}
                         className={"w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline " + errors.prod_type?.message}
                         id="type"
                         onChange={e=>onTypeChange(e.target.value)}
                    >
                         <option value="">- - -</option>
                         <option value="fruit">Fruit</option>
                         <option value="snack">Snack</option>
                         <option value="fast_food">Fast Food</option>
                    </select>
               </div>
               <div className="md:mr-2 md:mb-0 row-span-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700 text-left" htmlFor="name">
                         Product Image
                    </label>
                    <div className="bg-[#f0f8ff] border-2 border-dashed border-[#c7d4df] rounded-xl h-[140px] w-full">
                    <div className="h-full w-full relative ">
                         <img src={image} className="absolute object-cover h-full w-full rounded-xl hover:cursor-pointer" />
                    </div> 
                    </div>
               </div>
          </div>
          <div className="text-left text-sm mt-3">
               <button type="submit" className='px-3 py-2 mr-1 bg-sky-500 rounded-md text-slate-50'>Edit Product</button>
               <button type="button" onClick={() => handleHide(0)} className='px-3 py-2 mr-1 bg-slate-500 rounded-md text-slate-50'>Cancel</button>
          </div>
          </form>
     </div>
     </div>
     )
}

export default ProductFormEdit