import { Marker, Popup } from "react-leaflet";
import { getMarkerIcon } from "../utils/markerIcons";

export default function IncidentMarkers({ incidents }) {
  return (
    <>
      {incidents.map((incident) => (
        <Marker
          key={incident.id}
          position={[incident.latitude, incident.longitude]}
          icon={getMarkerIcon(incident.type)}
        >
          <Popup>
            <strong>{incident.title}</strong>
            <p>{incident.description}</p>
            <p>Type: {incident.type}</p>

            {incident.imageUrl && (
              <img
                src={`http://localhost:5000${incident.imageUrl}`}
                style={{ width: "150px", borderRadius: "8px" }}
              />
            )}
          </Popup>
        </Marker>
      ))}
    </>
  );
}
