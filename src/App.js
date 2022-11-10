import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignUp from "./components/loginSignUp/LoginSignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
