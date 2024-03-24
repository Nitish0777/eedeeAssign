// App.jsx
import { Routes, Route } from "react-router-dom";
import LoginForm from "./Components/Login/Login";
import RegisterForm from "./Components/Register/Register";
import LeaderboardTab from "./Components/Dashboard/LeaderboardTab.js";
import GamePage from "./Components/Game/GamePage";
// import PrivateRoute from "./PrivateRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      {/* <PrivateRoute path="/dashboard" element={<LeaderboardTab />} />
      <PrivateRoute path="/game" element={<GamePage />} /> */}
      <Route
        path="/"
        element={
          <>
            <LeaderboardTab />
            <GamePage />
          </>
        }
      />
      {/* <Route path="/" element={} /> */}
    </Routes>
  );
}

export default App;
