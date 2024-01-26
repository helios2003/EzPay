import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./ui/auth/LoginPage"
import Register from "./ui/auth/RegisterPage"
import Dashboard from "./ui/utils/Dashboard"
import PIN from "./ui/utils/PIN"
import Transfer from "./ui/utils/Transfer"
import ShowUser from "./ui/utils/ShowUser"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Transfer />} />
          <Route path="/api/v1/dashboard" element={<Dashboard firstname="John" lastname="Doe" balance={1000} />} />       
          <Route path="/api/v1/signup" element={<Register />} />
          <Route path="/api/v1/signin" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
