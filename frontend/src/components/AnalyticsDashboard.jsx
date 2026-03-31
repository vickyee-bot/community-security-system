import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // const downloadCSV = () => {
  //   window.open("http://localhost:5000/api/analytics/export/csv");
  // };

  // const downloadPDF = () => {
  //   window.open("http://localhost:5000/api/analytics/export/pdf");
  // };

  const downloadCSV = async () => {
    try {
      const res = await API.get("/analytics/export/csv", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Failed to download CSV");
    }
  };

  const downloadPDF = async () => {
    try {
      const res = await API.get("/analytics/export/pdf", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Failed to download PDF");
    }
  };

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
      <button
        onClick={() => navigate("/analytics")}
        // className="mt-4 px-4 py-2 bg-neonGreen text-black rounded"
        className="bg-gradient-submit py-2 rounded font-bold text-black w-full"
      >
        View Full Analytics
      </button>
      <div className="flex gap-3 mb-4">
        <button
          onClick={downloadCSV}
          // className="px-4 py-2 bg-neonGreen text-black rounded font-bold"
          className="bg-gradient-submit py-2 rounded font-bold text-black w-full mt-4"
        >
          Download CSV
        </button>

        <button
          onClick={downloadPDF}
          // className="px-4 py-2 bg-blue-500 text-white rounded font-bold"
          className="bg-gradient-submit py-2 rounded font-bold text-black w-full mt-4"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
