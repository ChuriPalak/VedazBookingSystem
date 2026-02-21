import { useState } from "react";
import { useNotifications } from "../context/NotificationContext";

export default function NotificationBell() {
  const { notifications } = useNotifications();
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ fontSize: "20px" }}
      >
        🔔 {unreadCount > 0 && `(${unreadCount})`}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "40px",
            width: "250px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            zIndex: 999,
          }}
        >
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((n) => (
              <p key={n.id}>{n.message}</p>
            ))
          )}
        </div>
      )}
    </div>
  );
}