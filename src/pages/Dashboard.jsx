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
          backgroundColor: "#6366f1",
          borderRadius: 6,
          barThickness: 40,
        },
      ],
    });
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "30px" }}>Platform Analytics</h2>

      {/* STAT CARDS */}

      <div style={statsGrid}>
        <div style={card}>
          <h3 style={statNumber}>{stats.totalIdeas ?? 0}</h3>
          <p>Total Ideas</p>
        </div>

        <div style={card}>
          <h3 style={statNumber}>{stats.totalComments ?? 0}</h3>
          <p>Total Comments</p>
        </div>

        <div style={card}>
          <h3 style={statNumber}>{stats.totalVotes ?? 0}</h3>
          <p>Total Votes</p>
        </div>
      </div>

      {/* CHART */}

      <div style={chartContainer}>
        <h3 style={{ marginBottom: "20px" }}>Ideas by Category</h3>

        {chartData && (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { stepSize: 1 },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

/* ---------- STYLES ---------- */

const statsGrid = {
  display: "flex",
  gap: "20px",
  marginBottom: "40px",
};

const card = {
  flex: 1,
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  textAlign: "center",
  border: "1px solid #e5e7eb",
};

const statNumber = {
  fontSize: "32px",
  color: "#6366f1",
};

const chartContainer = {
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  maxWidth: "700px",
};
