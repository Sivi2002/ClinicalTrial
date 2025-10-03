import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDemographics } from "../redux/analyticsSlice";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function DemographicsChart() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((s) => s.analytics.demographics);

  useEffect(() => {
    dispatch(fetchDemographics());
  }, [dispatch]);

  if (loading) return <div>Loading demographics...</div>;
  if (error) return <div>Error loading demographics: {error}</div>;
  if (!data) return null;

  const sexData = data.sexDistribution.map((s) => ({
    name: s.label,
    value: s.count,
  }));
  const ageData = data.ageDistribution.map((a) => ({
    bucket: a.bucket,
    count: a.count,
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        background: "#f9fafb",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {/* Sex Distribution */}
      <div style={{ flex: 1, height: 320 }}>
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          Sex Distribution
        </h3>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={sexData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {sexData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(val, name) => [`${val} participants`, name]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Age Distribution */}
      <div style={{ flex: 1, height: 320 }}>
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          Age Buckets (approx)
        </h3>
        <ResponsiveContainer>
          <BarChart
            data={ageData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="bucket" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(val) => [`${val} participants`, "Count"]}
            />
            <Bar
              dataKey="count"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
