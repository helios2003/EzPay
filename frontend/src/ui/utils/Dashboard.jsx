import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Modal from "react-modal"
import axios from "axios"
import PIN from "./PIN"
import UserList from "./UserList"
import { FaMoneyBill } from "react-icons/fa"

export default function Dashboard({ firstName, lastName, balance }) {

    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('firstName')
        localStorage.removeItem('lastName')
        localStorage.removeItem('balance')
        navigate('/api/v1/signin')
    }

    function handlePIN() {
        setModal(true)
    }

    async function searchUsers() {
        try {
            const url = "http://localhost:3000/api/v2/users"
            const token = localStorage.getItem('token')

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    filter: searchTerm
                }
            })
            const userData = response.data
            setUsers(userData)
            console.log('User Data:', userData)
            return userData
        } catch (error) {
            console.error('Error searching user:', error)
        }
    }

    // debouncing
    useEffect(() => {
        const delayTimer = setTimeout(() => {
          searchUsers()
        }, 300)
        return () => clearTimeout(delayTimer)
      }, [searchTerm])

    return <div>
        <div className="flex flex-row border box-border h-16 shadow-md">
            <FaMoneyBill  className="pb-3 pl-2 w-12 h-20"/>
            <h1 className="text-2xl pl-3 mt-4"><b>EzPay</b></h1>
            <h1 className="text-2xl mt-4 mx-auto">Hello {firstName} {lastName}</h1>
            <div className="space-x">
                <button
                    className="mt-4 text-xl mr-4 bg-black text-white h-9 w-24 rounded-lg"
                    onClick={handlePIN}
                >Enter PIN</button>
                <Modal
                    isOpen={modal}
                    onRequestClose={() => setModal(false)}
                    className="flex flex-col justify-center items-center pt-44"
                ><PIN /></Modal>
                <button
                    className="mt-4 text-xl ml-auto mr-4 text-white bg-black h-9 w-20 rounded-lg"
                    onClick={handleLogout}
                >Logout</button>
            </div>
        </div>
        <p className="ml-6 mt-3 text-xl"><b>Your Balance:</b> {balance} Rupees</p>
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