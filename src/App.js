import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignUp from "./components/loginSignUp/LoginSignUp";
import { AuthProvider } from "../src/contexts/AuthContext";
import { Dashboard } from "@mui/icons-material";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login-signup" element={<LoginSignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
