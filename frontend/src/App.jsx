import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./ui/auth/Login"
import Register from "./ui/auth/Register"
import Dashboard from "./ui/utils/Dashboard"
import UserCard from "./ui/utils/UserCard"
import PrivateRoute from "./ui/utils/PrivateRoute"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/api/v1/dashboard" element={<PrivateRoute Component={<Dashboard firstName={localStorage.getItem('firstName')} lastName={localStorage.getItem('lastName')} balance={localStorage.getItem('balance')} />} />} />
          <Route path="/" element={<UserCard firstName={localStorage.getItem('firstName')} />} />
          <Route path="/api/v1/signup" element={<Register />} />
          <Route path="/api/v1/signin" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
