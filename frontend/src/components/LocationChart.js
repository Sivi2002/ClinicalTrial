import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLocations } from "../redux/analyticsSlice";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function LocationChart() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((s) => s.analytics.locations);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  if (loading) return <div>Loading locations...</div>;
  if (error) return <div>Error loading locations: {error}</div>;

  const chartData = data
    .map((item) => ({
      country: item.country || "Unknown",
      count: item.count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        background: "#f9fafb",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "16px" }}>
        Top 10 Countries by Trial Facilities
      </h3>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="country"
            angle={-30}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
            formatter={(value) => [`${value} facilities`, "Count"]}
          />
          <Legend />
          <Bar
            dataKey="count"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
