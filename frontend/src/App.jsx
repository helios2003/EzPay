import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./ui/auth/Login"
import Register from "./ui/auth/Register"
import Dashboard from "./ui/utils/Dashboard"
import Transfer from "./ui/utils/Transfer"
import UserCard from "./ui/utils/UserCard"

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserCard firstName={localStorage.getItem('firstName')} />} />
          <Route path="/api/v1/dashboard" element={<Dashboard firstname={localStorage.getItem('firstName')} lastname={localStorage.getItem('lastName')} balance={1000} />} />       
          <Route path="/api/v1/signup" element={<Register />} />
          <Route path="/api/v1/signin" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
