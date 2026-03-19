// import L from "leaflet";

// const theftIcon = new L.Icon({
//   iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
//   iconSize: [32, 32],
// });

// const fireIcon = new L.Icon({
//   iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
//   iconSize: [32, 32],
// });

// const vandalismIcon = new L.Icon({
//   iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
//   iconSize: [32, 32],
// });

// const accidentIcon = new L.Icon({
//   iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//   iconSize: [32, 32],
// });

// export const getMarkerIcon = (type) => {
//   switch (type) {
//     case "THEFT":
//       return theftIcon;
//     case "FIRE":
//       return fireIcon;
//     case "VANDALISM":
//       return vandalismIcon;
//     case "ACCIDENT":
//       return accidentIcon;
//     default:
//       return theftIcon;
//   }
// };

import L from "leaflet";

const pendingIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const verifiedIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const resolvedIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const getMarkerIcon = (status) => {
  switch (status) {
    case "VERIFIED":
      return verifiedIcon;
    case "RESOLVED":
      return resolvedIcon;
    default:
      return pendingIcon;
  }
};
