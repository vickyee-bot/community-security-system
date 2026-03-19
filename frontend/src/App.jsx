import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
// import AnalyticsDashboard from "./components/AnalyticsDashboard";
import AnalyticsPage from "./pages/AnalyticsPage";
import LandingPage from "./pages/LandingPage";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* <Route path="/analytics" element={<AnalyticsDashboard />} /> */}
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
