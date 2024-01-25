import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./ui/auth/LoginPage"
import Register from "./ui/auth/RegisterPage"
import Dashboard from "./ui/utils/Dashboard"
import PIN from "./ui/utils/PIN"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PIN />} />
          <Route path="/api/v1/dashboard" element={<Dashboard />} />       
          <Route path="/api/v1/signup" element={<Register />} />
          <Route path="/api/v1/signin" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
