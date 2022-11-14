import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignUp from "./components/loginSignUp/LoginSignUp";
import { AuthProvider } from "../src/contexts/AuthContext"
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginSignUp />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
