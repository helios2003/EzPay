import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginPage from "../../components/auth/LoginPage"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const success = (time) => {
        console.log("success")
        toast.success("Welcome back !!", { autoClose: time })
    }
    const failure = (time) => {
        toast.error("Username or password is invalid", { autoClose: time })
    }

    function handleClick() {
        navigate('/api/v1/signup')
    }

    async function handleSubmit() {
        await LoginPage({ username, password })
        const token = localStorage.getItem('token')
        if (token === null || token === undefined) {
            failure(2000)
            navigate('/api/v1/signin')
        } else {
            success(2000)
            navigate('/api/v1/dashboard')
        }
    }

    return (
        <>
            <div className="flex items-center justify-center flex-col mt-36 space-y-8">
                <h1 className="text-3xl flex items-center justify-center">Login</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter username"
                        className="border-2 border-stone-600 text-center h-8 w-64 rounded-lg"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="border-2 border-stone-600 text-center h-8 w-64 rounded-lg"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-black h-8 w-20 rounded-lg hover:bg-gray-700 text-white">
                    Submit
                </button>
                <button
                    onClick={handleClick}
                    className="hover:underline hover:text-blue-900">
                    Are you a new User? Sign Up instead
                </button>
                <ToastContainer />
            </div>
        </>
    )
}