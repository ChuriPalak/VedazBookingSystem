import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExpertsPage from "./pages/ExpertsPage";
import ExpertDetail from "./pages/ExpertDetail";
import Login from "./pages/Login";
import ExpertDashboard from "./pages/ExpertDashboard";
import { NotificationProvider } from "./context/NotificationContext";

/* 🔒 Simple auth guard */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          {/* 🔐 Login */}
          <Route path="/login" element={<Login />} />

          {/* 🔁 Default → login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* 👤 Customer Home */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <ExpertsPage />
              </ProtectedRoute>
            }
          />

          {/* 👤 Expert detail */}
          <Route
            path="/expert/:id"
            element={
              <ProtectedRoute>
                <ExpertDetail />
              </ProtectedRoute>
            }
          />

          {/* 🧑‍⚕️ Expert Dashboard */}
          <Route
            path="/expert-dashboard"
            element={
              <ProtectedRoute>
                <ExpertDashboard />
              </ProtectedRoute>
            }
          />

          {/* ❌ Catch all */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;