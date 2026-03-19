import { useEffect, useState } from "react";
import socket from "../socket";

export default function AlertNotification() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    socket.on("newAlert", (data) => {
      setAlert(data);

      setTimeout(() => {
        setAlert(null);
      }, 8000);
    });

    return () => socket.off("newAlert");
  }, []);

  if (!alert) return null;

  return (
    <div className="fixed top-6 right-6 bg-red-600 text-white p-4 rounded shadow-lg z-50 w-80">
      <h3 className="font-bold">{alert.title}</h3>
      <p>{alert.message}</p>
    </div>
  );
}
