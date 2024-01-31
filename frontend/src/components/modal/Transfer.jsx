import Modal from "react-modal"
import { useState } from "react"
import axios from "axios"
import UserCard from '../cards/UserCard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "../../store/atoms"

export default function Transfer({ firstName, lastName, username }) {
    const user = useRecoilValue(userState)
    const [amount, setAmount] = useState(0)
    const [PIN, setPIN] = useState("")
    const setUser = useSetRecoilState(userState)

    const success = (time) => {
        console.log("success")
        toast.success("Money transferred successfully", { autoClose: time })
    }
    const failure = (time) => {
        toast.error("Money could not be transferred, please try again", { autoClose: time })
    }

    async function sendMoney(amount) {
        console.log(amount)
        try {
            const url = "http://localhost:3000/api/v2/transaction"
            const token = localStorage.getItem('token')

            const response = await axios.post(url, {
                to: username,
                from: user.username,
                PIN: PIN,
                amount: parseInt(amount),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                let updatedUser = {...user} 
                updatedUser.balance -= amount 
                setUser(updatedUser) 
                success(2000)
            }
        } catch (error) {
            console.error(error)
            failure(2000)
        }
    }
    return (
        <div className="flex flex-col justify-center items-center space-y-8 pt-24">
            <UserCard firstName={firstName} />
            <p className="text-xl">
                <i>
                    Send Money to {firstName} {lastName} (in Rupees)
                </i>
            </p>
            <input
                type="text"
                placeholder="Enter Amount"
                className="border-2 text-center h-8 w-56 text-xl rounded-md"
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter PIN"
                className="border-2 text-center h-8 w-56 text-xl rounded-md"
                onChange={(e) => setPIN(e.target.value)}
            />
            <button
                className="text-white bg-black h-8 w-24 text-xl rounded-lg"
                onClick={() => sendMoney(amount)}
            >
                Transfer
            </button>
            <ToastContainer />
        </div>
    )
}