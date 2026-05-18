import {
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "../pages/auth/Loginpage";
import SignupPage from "../pages/auth/SignupPage";
import ChatPage from "../pages/chat/ChatPage";

import ProtectedRoute from "../components/layout/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage />}
      />

      <Route
        path="/signup"
        element={<SignupPage />}
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;