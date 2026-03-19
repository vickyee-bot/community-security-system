import { useEffect, useState } from "react";
import API from "../api/axios";
import socket from "../socket";

import IncidentForm from "../components/IncidentForm";
import IncidentMap from "../components/IncidentMap";
import IncidentManagementPanel from "../components/IncidentManagementPanel";
import { jwtDecode } from "jwt-decode";
import AlertNotification from "../components/AlertNotification";
import AdminPanel from "../components/AdminPanel";
import ChatPanel from "../components/ChatPanel";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [incidents, setIncidents] = useState([]);
  const [role, setRole] = useState("");
  const [selectedIncident, setSelectedIncident] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "THEFT",
    image: null,
    latitude: 0,
    longitude: 0,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }
    // Load incidents
    API.get("/incidents").then((res) => setIncidents(res.data));

    // Real-time incidents
    socket.on("newIncident", (incident) => {
      setIncidents((prev) => [incident, ...prev]);
    });

    // Get user location
    navigator.geolocation.getCurrentPosition((pos) => {
      setForm((prev) => ({
        ...prev,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }));
    });

    return () => socket.off("newIncident");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await API.post("/incidents", formData);

      setSuccess("Incident reported successfully!");

      setForm((prev) => ({
        ...prev,
        title: "",
        description: "",
        image: null,
      }));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to report incident");
    }
  };

  const filteredIncidents =
    typeFilter === "ALL"
      ? incidents
      : incidents.filter((i) => i.type === typeFilter);

  return (
    <div className="h-screen bg-darkBg flex">
      {/* 🔔 Global alert notification */}
      <AlertNotification />
      {/* Residents can report incidents */}
      {role === "RESIDENT" && (
        <IncidentForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          error={error}
          success={success}
        />
      )}

      <div className="flex flex-1 h-full">
        {/* Map visible to everyone */}
        <div className="flex-1 h-full flex flex-col">
          {/* FILTER BAR */}
          <div className="bg-darkBg border-b border-neonGreen p-3 flex gap-3">
            <button
              onClick={() => setTypeFilter("ALL")}
              className="px-3 py-1 border border-neonGreen text-neonGreen rounded hover:bg-neonGreen hover:text-black"
            >
              ALL
            </button>
            <button
              onClick={() => setTypeFilter("THEFT")}
              className="px-3 py-1 border border-neonGreen text-neonGreen rounded hover:bg-neonGreen hover:text-black"
            >
              THEFT
            </button>
            <button
              onClick={() => setTypeFilter("ASSAULT")}
              className="px-3 py-1 border border-neonGreen text-neonGreen rounded hover:bg-neonGreen hover:text-black"
            >
              ASSAULT
            </button>
            <button
              onClick={() => setTypeFilter("VANDALISM")}
              className="px-3 py-1 border border-neonGreen text-neonGreen rounded hover:bg-neonGreen hover:text-black"
            >
              VANDALISM
            </button>
          </div>

          <IncidentMap
            incidents={filteredIncidents}
            latitude={form.latitude}
            longitude={form.longitude}
            setSelectedIncident={setSelectedIncident}
          />
        </div>

        {/* Only officers see the management panel */}
        {role === "OFFICER" && (
          <div className="w-96 border-l border-neonGreen">
            <IncidentManagementPanel
              incidents={incidents}
              setIncidents={setIncidents}
            />
          </div>
        )}

        {role === "RESIDENT" || role === "OFFICER" ? (
          <div className="w-96 border-l border-neonGreen">
            {selectedIncident && (
              <ChatPanel role={user.role} incidentId={selectedIncident.id} />
            )}
          </div>
        ) : null}

        {role === "ADMIN" && (
          <div className="w-96 border-l border-neonGreen">
            <AdminPanel incidents={incidents} setIncidents={setIncidents} />
          </div>
        )}
      </div>
    </div>
  );
}
