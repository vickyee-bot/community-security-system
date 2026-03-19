import { useEffect, useState } from "react";
import socket from "../socket";
import API from "../api/axios";

export default function ChatPanel({ role, incidentId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [receiverId, setReceiverId] = useState(null);

  useEffect(() => {
    const findReceiver = async () => {
      try {
        const targetRole = role === "RESIDENT" ? "OFFICER" : "RESIDENT";

        const res = await API.get(`/users/role/${targetRole}`);

        setReceiverId(res.data.id);
      } catch (err) {
        console.error("Failed to find receiver");
      }
    };

    findReceiver();
  }, [role]);

  useEffect(() => {
    if (!receiverId || !incidentId) return;

    const loadMessages = async () => {
      try {
        const res = await API.get(`/messages/incident/${incidentId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages");
      }
    };

    loadMessages();

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("newMessage");
  }, [receiverId]);

  const sendMessage = async () => {
    if (!text.trim() || !receiverId) return;

    try {
      const res = await API.post("/messages", {
        content: text,
        receiverId,
        incidentId,
      });

      socket.emit("sendMessage", res.data);

      setText("");
    } catch (err) {
      console.error("Message failed");
    }
  };

  return (
    <div className="flex flex-col h-full bg-darkBg text-white p-4">
      <h2 className="text-lg font-bold text-neonGreen mb-4">Community Chat</h2>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-gray-900 p-2 rounded border border-neonGreen"
          >
            <p className="text-sm text-gray-400">
              {msg.sender?.name} (
              <span
                className={
                  msg.sender?.role === "OFFICER"
                    ? "text-blue-400"
                    : "text-green-400"
                }
              >
                {msg.sender?.role}
              </span>
              )
            </p>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 bg-gray-900 border border-neonGreen rounded"
          placeholder="Type message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-gradient-submit py-2 rounded font-bold text-black w-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
