import React, {Component} from "react";
import { Bar } from "react-chartjs-2";
import {
     Chart as ChartJS,
     CategoryScale,
     LinearScale,
     BarElement,
     Title,
     Tooltip,
     Legend,
} from 'chart.js';

const TransactionsChart = ({ datas }) => {

     const transactions = datas;

     ChartJS.register(
          CategoryScale,
          LinearScale,
          BarElement,
          Title,
          Tooltip,
          Legend
     );
     
     const options = {
          responsive: true,
          plugins: {
               legend: {
                    position: 'top',
               },
               title: {
                    display: true,
                    text: 'Transactions Summary ( Past 2 days - Now )',
               },
          },
     };

     const labels = ['Fruit', 'Snack', 'Fast Food']

     const data = {
          labels,
          datasets: transactions,
          // datasets: [
          //      {
          //           label: 'Sat',
          //           data: [5, 2, 3],
          //           backgroundColor: '#B5EAEA',
          //      },
          //      {
          //           label: 'Sun',
          //           data: [2, 4, 2],
          //           backgroundColor: '#F4DFD0',
          //      },
          //      {
          //           label: 'Mon',
          //           data: [6, 2, 3],
          //           backgroundColor: '#F6AE99',
          //      },
          // ],
     };

     // console.log(transactions);

     return (
          <div className="flex items-center justify-center w-screen p-8">
               <Bar options={options} data={data} />
          </div>
     );
}

export default TransactionsChart