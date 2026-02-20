import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExpertsPage from "./pages/ExpertsPage";
import ExpertDetail from "./pages/ExpertDetail";
import Login from "./pages/Login";

/* 🔒 Simple auth guard (basic version) */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔐 Login */}
        <Route path="/login" element={<Login />} />

        {/* 👤 Customer pages */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ExpertsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expert/:id"
          element={
            <ProtectedRoute>
              <ExpertDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;