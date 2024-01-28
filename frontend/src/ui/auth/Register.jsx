import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleClick() {
        navigate('/api/v1/signin')
    }

    async function handleSubmit() {
        navigate('/api/v1/dashboard')
    }

    return (
        <>
            <div className="flex items-center justify-center flex-col mt-32 space-y-6">
                <h1 className="text-3xl flex items-center justify-center">Register</h1> 
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
                        type="text"
                        placeholder="Enter firstname"
                        className="border-2 border-stone-600 text-center h-8 w-64 rounded-lg"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                </div> 
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter lastname"
                        className="border-2 border-stone-600 text-center h-8 w-64 rounded-lg"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                </div> 
                <div className="mb-4">
                    <input
                        type="text"
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
                        Are you an existing user? Sign In instead
                </button>
            </div>
        </>
    )
}
