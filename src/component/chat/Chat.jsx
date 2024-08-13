import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./chat.css";
const socket = io("http://localhost:5500", {
  withCredentials: true,
});

function Chat({ roomId }) {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    // You can use localStorage or another method to set a unique identifier for the user
    const currentUser = localStorage.getItem("currentUser") || "user";
    setIsCurrentUser(currentUser);

    socket.emit("joinRoom", roomId);

    socket.on("previousMessages", (messages) => {
      setChat(messages);
    });

    socket.on("message", (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    return () => {
      socket.off("previousMessages");
      socket.off("message");
    };
  }, [roomId]);

  const sendMessage = () => {
    socket.emit("message", {
      roomId,
      text: message,
      sender: isCurrentUser ? "user" : "other",
    });
    setMessage("");
  };

  return (
    <div>
      <div className="chat-window overflow-scroll h-[50vh] m-2">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "user" ? "my-message" : "user-message"
            }`}
          >
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center ">
        <input
          className="sm:w-10/12 w-11/12 p-1 focus:outline-none m-2 text-lg border-3 rounded-xl border-orange-500"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
