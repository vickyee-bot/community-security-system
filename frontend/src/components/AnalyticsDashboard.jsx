import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/analytics/incidents-by-type");

        const formatted = res.data.map((item) => ({
          type: item.type,
          count: item._count.type,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Failed to load analytics");
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-6 bg-darkBg text-white">
      <h2 className="text-lg font-bold text-neonGreen mb-4">
        Incidents by Type
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="type" stroke="#39FF14" />
            <YAxis stroke="#39FF14" />
            <Tooltip />
            <Bar dataKey="count" fill="#39FF14" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
