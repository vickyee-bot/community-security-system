import { useEffect, useState } from "react";
import API from "../api/axios";
import socket from "../socket";

export default function IncidentManagementPanel({ incidents, setIncidents }) {
  // const [incidents, setIncidents] = useState([]);
  const [filter, setFilter] = useState("ALL"); // ALL, PENDING, VERIFIED, RESOLVED
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   fetchIncidents();

  //   // Real-time update for new incidents
  //   socket.on("newIncident", (incident) => {
  //     setIncidents((prev) => [incident, ...prev]);
  //   });

  //   return () => socket.off("newIncident");
  // }, []);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const res = await API.get("/incidents");
      setIncidents(res.data);
    } catch (err) {
      setError("Failed to fetch incidents");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.patch(`/incidents/${id}/status`, { status: newStatus });
      setIncidents((prev) =>
        prev.map((incident) =>
          incident.id === id ? { ...incident, status: newStatus } : incident,
        ),
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update status");
    }
  };

  const filteredIncidents =
    filter === "ALL"
      ? incidents
      : incidents.filter((incident) => incident.status === filter);

  return (
    <div className="p-6 bg-[#1C1F2B] text-white h-full overflow-y-auto">
      <h2 className="text-neonGreen text-2xl font-bold mb-4">
        Security Officer Panel
      </h2>

      <div className="mb-4">
        <label className="mr-2">Filter by status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded bg-[#262B3C] text-white"
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="VERIFIED">Verified</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </div>

      {loading && <p>Loading incidents...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col gap-4">
        {filteredIncidents.map((incident) => (
          <div
            key={incident.id}
            className="border border-neonGreen p-4 rounded bg-[#262B3C]"
          >
            <h3 className="font-bold text-lg">{incident.title}</h3>
            <p>{incident.description}</p>
            <p>Type: {incident.type}</p>
            <p>
              Status:{" "}
              <select
                value={incident.status}
                onChange={(e) =>
                  handleStatusChange(incident.id, e.target.value)
                }
                className="p-1 rounded bg-[#1C1F2B] text-white"
              >
                <option value="PENDING">Pending</option>
                <option value="VERIFIED">Verified</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
