import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

function HeatLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;

    const heatPoints = points.map((i) => [i.latitude, i.longitude, 1]); // 1 = intensity
    const heat = L.heatLayer(heatPoints, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [points, map]);

  return null;
}

export default function IncidentHeatmap({ incidents }) {
  return (
    <MapContainer
      center={[-1.286389, 36.817223]} // default to Nairobi
      zoom={13}
      className="h-96 w-full rounded"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <HeatLayer points={incidents} />
    </MapContainer>
  );
}
