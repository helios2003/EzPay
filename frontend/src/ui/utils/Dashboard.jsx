import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"
import axios from "axios";
import PIN from "./PIN";
import UserList from "./UserList";

export default function Dashboard({ firstname, lastname, balance }) {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('token')
        navigate('/api/v1/signin')
    }

    function handlePIN() {
        setModal(true)
    }

    async function searchUsers() {
        try {
            const url = "http://localhost:3000/api/v2/users";
            const token = localStorage.getItem('token');

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    filter: searchTerm
                }
            })
            const userData = response.data;
            setUsers(userData);
            console.log('User Data:', userData);
            return userData;
        } catch (error) {
            console.error('Error searching user:', error);
        }
    }

    return <div>
        <div className="flex flex-row border box-border h-16 shadow-md">
            <h1 className="text-2xl ml-6 mt-4"><b>EzPay</b></h1>
            <h1 className="text-2xl mt-4 mx-auto">Hello {firstname} {lastname}</h1>
            <div className="space-x">
                <button
                    className="mt-4 text-xl mr-4 bg-black text-white h-9 w-24 rounded-lg"
                    onClick={handlePIN}
                >Enter PIN</button>
                <Modal
                    isOpen={modal}
                    onRequestClose={() => setModal(false)}
                    className="flex flex-col items-center justify-center h-screen"
                ><PIN /></Modal>
                <button
                    className="mt-4 text-xl ml-auto mr-4 text-white bg-black h-9 w-20 rounded-lg"
                    onClick={handleLogout}
                >Logout</button>
            </div>
        </div>
        <p className="ml-6 mt-3 text-xl"><b>Your Balance:</b> {balance}$</p>
        <p className="ml-6 mt-3"><b><i>Search for Users</i></b></p>
        <div className="flex flex-row">
            <input type="text"
                className="mt-4 ml-6 mr-2 h-9 border-2 w-11/12"
                placeholder="Search for users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}></input>
            <FaSearch className="mt-4 h-8 w-6 ml-2" onClick={searchUsers}></FaSearch>
        </div>
        {users.length === 0 ? null : <UserList users={users.user} />}
    </div>
}