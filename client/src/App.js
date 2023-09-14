import { Routes, Route, useNavigate } from "react-router-dom";
import TodoComp from "./components/TodoComp";
import LoginComp from "./components/LoginComp";
import RegisterComp from "./components/RegisterComp";
import { useEffect } from "react";
import PrivateRoutes from "./components/PrivateRoutes";
function App() {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, [navigate]);
  return (
    <Routes>
      <Route path="login" element={<LoginComp />}></Route>
      <Route path="/register" element={<RegisterComp />}></Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<TodoComp />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
