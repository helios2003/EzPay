import Modal from "react-modal"
import { useState } from "react";
import axios from "axios";

export default function Transfer({ firstName, lastName }) {
    const [money, setMoney] = useState(0)
    async function sendMoney() {
        try {
            const url = "http://localhost:3000/api/v2/transaction";
            const token = localStorage.getItem('token');

            const response = await axios.post(url, {
                to: "ankit@gmail.com",
                from: "Chin@gmail.com",
                amount: parseInt(money),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                alert("Money sent successfully")
            }
        } catch (error) {
            console.error('Error sending money:', error);
        }
    }
    return (
        <div className="flex flex-col justify-center items-center space-y-8 pt-44">
            <p className="text-xl">
                <i>
                    Send Money to {firstName} {lastName} (in Rupees)
                </i>
            </p>
            <input
                type="text"
                placeholder="Enter Amount"
                className="border-2 text-center h-8 w-56 text-xl rounded-md"
                onChange={(e) => setMoney(e.target.value)}
            />
            <button
                className="text-white bg-black h-7 w-16 text-xl rounded-lg"
                onClick={sendMoney}
            >
                Send
            </button>
        </div>
    )
}