import React, { useEffect, useState } from "react";
import { getStats, getCategoryStats } from "../services/dashboardService";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    loadStats();
    loadCategories();
  }, []);

  const loadStats = async () => {
    const data = await getStats();
    setStats(data);
  };

  const loadCategories = async () => {
    const data = await getCategoryStats();

    const labels = Object.keys(data);
    const values = Object.values(data);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Ideas by Category",
          data: values,
          backgroundColor: "#8b5cf6",
          borderRadius: 6,
          barThickness: 40,
        },
      ],
    });
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(10, 10, 11, 0.9)",
        titleColor: "#e4e4e7",
        bodyColor: "#e4e4e7",
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: "#a1a1aa" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      x: {
        ticks: { color: "#a1a1aa" },
        grid: { display: false },
      }
    },
  };

  return (
    <div className="container fade-in">
      <h2 className="page-title" style={{ marginBottom: "30px" }}>Platform Analytics</h2>

      {/* STAT CARDS */}
      <div className="dashboard-cards">
        <div className="card stat-card">
          <h3>{stats.totalIdeas ?? 0}</h3>
          <p>Total Ideas</p>
        </div>

        <div className="card stat-card">
          <h3>{stats.totalComments ?? 0}</h3>
          <p>Total Comments</p>
        </div>

        <div className="card stat-card">
          <h3>{stats.totalVotes ?? 0}</h3>
          <p>Total Votes</p>
        </div>
      </div>

      {/* CHART */}
      <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h3 style={{ marginBottom: "24px" }}>Ideas by Category</h3>

        {chartData ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p style={{ color: "var(--text-secondary)" }}>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
