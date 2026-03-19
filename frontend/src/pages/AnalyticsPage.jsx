import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useNavigate } from "react-router-dom";
import IncidentHeatmap from "../components/IncidentHeatmap";

export default function AnalyticsPage() {
  const [typeData, setTypeData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [stats, setStats] = useState({});
  const [incidents, setIncidents] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // if (user?.role !== "ADMIN") {
  //   return <div className="text-white p-10">Access denied</div>;
  // }

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const typeRes = await API.get("/analytics/incidents-by-type");
        const timelineRes = await API.get("/analytics/incidents-by-day");
        const statsRes = await API.get("/analytics/summary");

        setTypeData(
          typeRes.data.map((item) => ({
            type: item.type,
            count: item._count.type,
          })),
        );

        setTimelineData(timelineRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error("Failed to load analytics");
      }
    };

    fetchAnalytics();
  }, []);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await API.get("/incidents"); // fetch all incidents
        setIncidents(res.data);
      } catch (err) {
        console.error("Failed to load incidents");
      }
    };

    fetchIncidents();
  }, []);

  const COLORS = ["#39FF14", "#00FFFF", "#FF007F", "#FFD700"];

  return (
    <div className="p-8 bg-darkBg text-white min-h-screen space-y-10">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 px-4 py-2 border border-neonGreen text-neonGreen rounded hover:bg-neonGreen hover:text-black"
      >
        ← Back to Admin Dashboard
      </button>
      <h1 className="text-2xl font-bold text-neonGreen">Security Analytics</h1>

      <div className="mb-8">
        <IncidentHeatmap incidents={incidents} />
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-900 p-4 rounded border border-neonGreen">
          <h3>Total Incidents</h3>
          <p className="text-2xl">{stats.totalIncidents}</p>
        </div>

        <div className="bg-gray-900 p-4 rounded border border-neonGreen">
          <h3>Resolved</h3>
          <p className="text-2xl">{stats.resolved}</p>
        </div>

        <div className="bg-gray-900 p-4 rounded border border-neonGreen">
          <h3>Pending</h3>
          <p className="text-2xl">{stats.pending}</p>
        </div>
      </div>

      {/* Incidents by type */}
      <div style={{ width: "100%", height: 320 }}>
        <h2 className="mb-4 text-neonGreen">Incidents by Type</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={typeData}>
            <XAxis dataKey="type" stroke="#39FF14" />
            <YAxis stroke="#39FF14" />
            <Tooltip />
            <Bar dataKey="count" fill="#39FF14" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie distribution */}
      <div style={{ width: "100%", height: 320 }}>
        <h2 className="mb-4 text-neonGreen">Incident Distribution</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={typeData}
              dataKey="count"
              nameKey="type"
              outerRadius={120}
            >
              {typeData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Timeline */}
      <div style={{ width: "100%", height: 320 }}>
        <h2 className="mb-4 text-neonGreen">Incidents Over Time</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timelineData}>
            <XAxis dataKey="date" stroke="#39FF14" />
            <YAxis stroke="#39FF14" />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#39FF14" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
