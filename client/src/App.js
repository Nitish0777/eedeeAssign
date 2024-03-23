import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./Components/Login/Login";
import RegisterForm from "./Components/Register/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/" element={"Hello From Home Page"} />
        <Route path="/leatherboard" element={"Hello From Leather-Board Page"} />
        <Route path="*" element={"404 Not Found"} />
      </Routes>
    </>
  );
}

export default App;
