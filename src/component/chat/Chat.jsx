import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./chat.css";
import { useSelector } from "react-redux";
const socket = io("http://localhost:5500", {
  withCredentials: true,
});

function Chat({ roomId }) {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.user);
  console.log(user, "user");

  useEffect(() => {
    // Fetch the current user ID from localStorage or some other source
    // const currentUserId = localStorage.getItem("currentUserId") || "defaultUserId";

    // Join the room
    socket.emit("joinRoom", roomId);

    // Listen for previous messages
    socket.on("previousMessages", (messages) => {
      setChat(messages);
    });

    // Listen for new messages
    socket.on("message", (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    // Clean up on component unmount
    return () => {
      socket.off("previousMessages");
      socket.off("message");
    };
  }, [roomId]);

  const sendMessage = () => {
    // Emit the message with the sender ID
    socket.emit("message", {
      roomId,
      text: message,
      senderId:user._id, // Include senderId here
    });
    setMessage(""); // Clear the message input
  };

  return (
    <div>
      <div className="chat-window overflow-scroll h-[50vh] m-2">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.senderId === user._id ? "my-message" : "user-message"
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
