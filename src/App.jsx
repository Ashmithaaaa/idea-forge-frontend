import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import IdeaDetails from "./pages/IdeaDetails";
import SubmitIdea from "./pages/SubmitIdea";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AnalyzeIdea from "./pages/AnalyzeIdea";
import Notifications from "./pages/Notifications";
import Leaderboard from "./pages/Leaderboard";
import CollaborationRequests from "./pages/CollaborationRequests";
import ActivityFeed from "./pages/ActivityFeed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/idea/:id" element={<IdeaDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES */}

        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submit"
          element={
            <ProtectedRoute>
              <SubmitIdea />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analyze"
          element={
            <ProtectedRoute>
              <AnalyzeIdea />
            </ProtectedRoute>
          }
        />

        <Route
          path="/collaborations"
          element={
            <ProtectedRoute>
              <CollaborationRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <ActivityFeed />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
