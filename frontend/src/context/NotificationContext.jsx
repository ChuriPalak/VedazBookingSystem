import { createContext, useContext, useEffect, useState } from "react";
import socket from "../socket";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?._id) {
      socket.emit("join-room", user._id);
      console.log("🔔 Joined room:", user._id);
    }

    socket.on("booking-status-updated", (booking) => {
      console.log("🔔 Notification received:", booking);

      setNotifications((prev) => [
        {
          id: Date.now(),
          message: `Your booking is ${booking.status}`,
          read: false,
        },
        ...prev,
      ]);
    });

    return () => {
      socket.off("booking-status-updated");
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};