import React from "react";
import Layout from "../constant/Layout";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

type HomePageProps = {};

const HomePage: React.FC<HomePageProps> = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Product A",
        data: [0.2, 0.3, 0.4, 0.3, 0.5, 0.4, 0.6, 0.7],
        backgroundColor: "#0D47A1", // Dark blue
        borderWidth: 1,
      },
      {
        label: "Product B",
        data: [0.4, 0.2, 0.3, 0.3, 0.2, 0.4, 0.2, 0.1],
        backgroundColor: "#1E88E5", // Light blue
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Income Sale Wise",
        font: {
          size: 16,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Sales",
        },
        grid: {
          drawBorder: false,
          color: "#e5e7eb",
        },
      },
      y: {
        title: {
          display: true,
          text: "Months",
        },
        grid: {
          drawBorder: false,
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <Layout>
      <div className="p-3">
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="w-full h-auto" key={index}>
              <Bar data={data} options={options} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
