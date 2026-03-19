import { MapContainer, TileLayer } from "react-leaflet";
import IncidentMarkers from "./IncidentMarkers";
import MapLegend from "./MapLegend";

export default function IncidentMap({
  incidents,
  latitude,
  longitude,
  setSelectedIncident,
}) {
  return (
    <div className="flex-1 h-full relative">
      <MapContainer
        center={[latitude || -1.286389, longitude || 36.817223]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <IncidentMarkers
          incidents={incidents}
          setSelectedIncident={setSelectedIncident}
        />
      </MapContainer>

      <MapLegend />
    </div>
  );
}
