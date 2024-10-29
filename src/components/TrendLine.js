// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale
// } from 'chart.js';
// import 'chartjs-adapter-date-fns'; // Import date adapter

// // Register scales and elements, including TimeScale
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale // Register TimeScale
// );

// function TrendLine({ data }) {
//   // Function to generate daily task counts
//   const generateDailyData = () => {
//     const dailyCounts = {};
    
//     // Iterate over each task to populate daily task counts
//     data.forEach(task => {
//       const createdAt = new Date(task.createdAt);
//       const completedAt = new Date(task.completedAt);
      
//       // Create a date range from creation to completion
//       let currentDate = createdAt;
//       while (currentDate <= completedAt) {
//         const dateString = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
//         dailyCounts[dateString] = (dailyCounts[dateString] || 0) + 1; // Increment task count for that date
//         currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
//       }
//     });

//     // Convert the daily counts object into an array suitable for the chart
//     return Object.keys(dailyCounts).map(date => ({
//       date,
//       count: dailyCounts[date],
//     }));
//   };

//   const dailyData = generateDailyData();

//   const chartData = {
//     labels: dailyData.map(d => d.date), // Dates on x-axis
//     datasets: [
//       {
//         label: 'Concurrent Tasks Worked Upon Each Day',
//         data: dailyData.map(d => d.count), // Task counts on y-axis
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         fill: true,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         type: 'time', // Set scale type to 'time' for date handling
//         time: {
//           unit: 'day', // Set time unit to 'day'
//           displayFormats: {
//             day: 'MMM dd', // Format for date display
//           },
//         },
//         title: {
//           display: true,
//           text: 'Date',
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Number of Concurrent Tasks',
//         },
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div style={{ height: '300px' }}>
//       <Line data={chartData} options={chartOptions} />
//     </div>
//   );
// }

// export default TrendLine;
