import { useState } from "react";
import API from "../api/axios";
import AnalyticsDashboard from "./AnalyticsDashboard";

export default function AdminPanel({ incidents, setIncidents }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetAudience, setTargetAudience] = useState("ALL");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSendAlert = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.post("/alerts", {
        title,
        message,
        targetAudience,
      });

      setSuccess("Alert sent successfully!");
      setTitle("");
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send alert");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/incidents/${id}`);

      // remove from UI
      setIncidents((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Failed to delete incident");
    }
  };

  return (
    <div className="p-6 text-white bg-darkBg h-full overflow-y-auto">
      <h2 className="text-xl font-bold text-neonGreen mb-4">
        Admin Control Panel
      </h2>

      {/* ALERT FORM */}
      <form onSubmit={handleSendAlert} className="space-y-4 mb-8">
        <input
          className="w-full p-2 bg-gray-900 border border-neonGreen rounded"
          placeholder="Alert title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full p-2 bg-gray-900 border border-neonGreen rounded"
          placeholder="Alert message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <select
          className="w-full p-2 bg-gray-900 border border-neonGreen rounded"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
        >
          <option value="ALL">All Users</option>
          <option value="RESIDENT">Residents</option>
          <option value="OFFICER">Officers</option>
        </select>

        <button
          type="submit"
          className="bg-gradient-submit py-2 rounded font-bold text-black w-full"
        >
          Send Alert
        </button>

        {success && <p className="text-green-400">{success}</p>}
        {error && <p className="text-red-400">{error}</p>}
      </form>

      {/* INCIDENT MANAGEMENT */}
      <h3 className="text-lg font-bold text-neonGreen mb-3">
        Manage Incidents
      </h3>

      <div className="space-y-3">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="p-3 bg-gray-900 border border-neonGreen rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{incident.title}</p>
              <p className="text-sm text-gray-400">{incident.type}</p>
            </div>

            <button
              onClick={() => handleDelete(incident.id)}
              className="text-red-400 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
