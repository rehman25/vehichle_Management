import React from "react";
import Layout from "../constant/Layout";
import chartPlaceholder from "../assets/images/placeholder-chart.svg";

type HomePageProps = {};

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <Layout>
      <div className="p-3">
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <img
              className="w-full h-auto"
              key={index}
              src={chartPlaceholder}
              alt={`chartPlaceholder-${index}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
