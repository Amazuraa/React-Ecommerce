import React, { useEffect, useState } from "react";
import api from "../api/api";

import TransactionChart from '../components/TransactionChart';
import TransactionList from '../components/TransactionList';

const Transactions = () => {

//#region -- Fectch State --
     const [transactions, setTransactions] = useState([]);

     const getTransactions = async () => {
          const res = await api.get("/transactions");
          return res.data;
     }

     const getAllTransactions = async () => {
          const all = await getTransactions();
          setTransactions(all);
     }
//#endregion

//#region -- Chart Datasets --
     const [chartDataset, setChartDataset] = useState([]);

     const groupObj = (list, key) => {
          return list.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
          }, {});
     };

     const chartTransactions = async () => {
          // setup dates..
          let weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
          const d = new Date();
          let d3 = weekday[d.getDay()] + " " + d.getDate();
          
          const yesterday = new Date(d);
          yesterday.setDate(yesterday.getDate() - 1);
          let d2 = weekday[yesterday.getDay()] + " " + yesterday.getDate();

          const pastday = new Date(d);
          pastday.setDate(pastday.getDate() - 2);
          let d1 = weekday[pastday.getDay()] + " " + pastday.getDate();

          // transaction list..
          const all = await getTransactions();

          // group by date..
          let obj1 = all.filter(o => o.tran_date ===  d1);
          let obj2 = all.filter(o => o.tran_date ===  d2);
          let obj3 = all.filter(o => o.tran_date ===  d3);
          
          let merged = [...obj1, ...obj2, ...obj3];

          // group by type & date..
          let final = groupObj(merged, 'tran_type');
          let fruitFinal = groupObj(final.fruit, 'tran_date');
          let snackFinal = groupObj(final.snack, 'tran_date');
          let foodFinal = groupObj(final.fast_food, 'tran_date');

          let day = [d1, d2, d3];
          let arrFruitNew = [0, 0, 0];
          let arrSnackNew = [0, 0, 0];
          let arrFoodNew = [0, 0, 0];

          // eleminate for used data only..
          const Minimized = (key, val, arr) => {
               let idx = day.indexOf(key);

               if (val.length != 0) {
                    let count = 0;
                    Object.entries(val).forEach(([i, j]) => {
                         count += parseInt(j.tran_qty);     // value of the current key..
                    })
                    arr[idx] = count;
               }
          }

          // loop each group..
          Object.entries(fruitFinal).forEach(([key, val]) => {
               Minimized(key, val, arrFruitNew);
          });
          Object.entries(snackFinal).forEach(([key, val]) => {
               Minimized(key, val, arrSnackNew);
          });
          Object.entries(foodFinal).forEach(([key, val]) => {
               Minimized(key, val, arrFoodNew);
          });

          // merge to one..
          let preOutput = [arrFruitNew, arrSnackNew, arrFoodNew];

          // transpose array for dataset..
          let output = preOutput[0].map((_, colIndex) => preOutput.map(row => row[colIndex]));

          // console.log(preDataset);
          // console.log(output);
     
          // assign..
          const datasets = [
               {
                    label: weekday[pastday.getDay()],
                    data: output[0],
                    backgroundColor: '#B5EAEA',
               },
               {
                    label: weekday[yesterday.getDay()],
                    data: output[1],
                    backgroundColor: '#F4DFD0',
               },
               {
                    label: weekday[d.getDay()],
                    data: output[2],
                    backgroundColor: '#F6AE99',
               },
          ]

          setChartDataset(datasets);
     }
//#endregion

     useEffect(() => {     
          getAllTransactions();
          chartTransactions();
     }, [])

     const [showChart, setShowChart] = useState(false);

     return (
          <div>
               <div className="mt-10 p-8">
                    <button onClick={() => { setShowChart(true) }} className='px-3 py-2 bg-slate-400 rounded-md text-white text-sm mt-5 float-right font-semibold '>
                         Chart
                    </button>
                    <button onClick={() => { setShowChart(false) }} className='px-3 py-2 mr-2 bg-sky-500 rounded-md text-white text-sm mt-5 float-right font-semibold '>
                         List
                    </button>
               </div>
               {
                    showChart ? 
                    <TransactionChart datas={chartDataset} /> :
                    <TransactionList handleFetch={getAllTransactions.bind(this)} 
                                     data={transactions} />
               }
          </div>
     )
}

export default Transactions