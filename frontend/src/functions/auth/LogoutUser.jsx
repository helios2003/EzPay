import { useNavigate } from 'react-router-dom'

export default function LogoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('firstName')
    localStorage.removeItem('lastName')
    localStorage.removeItem('balance')
}