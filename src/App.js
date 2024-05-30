import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Global.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SetPassword } from "./pages/SetPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={Login} />
        <Route path="/home" Component={Home} />
        <Route path="/set-password/:auth" Component={SetPassword} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
