import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Dashboard from "./components/pages/Dashboard"
import PrivateRoute from "./utils/PrivateRoute"
import LandingPage from "./components/pages/LandingPage"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/api/v1/dashboard" element={<PrivateRoute Component={<Dashboard />} />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/api/v1/signup" element={<Register />} />
          <Route path="/api/v1/signin" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
