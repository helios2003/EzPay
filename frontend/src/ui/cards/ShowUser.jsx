import Transfer from "../modal/Transfer"
import { useState } from "react"
import Modal from "react-modal"
import UserCard from "./UserCard"

export default function ShowUser({ firstName, lastName, username }) {
    const [modal, setModal] = useState(false)
    console.log("in show user funtion")
    function handleClick() {
        setModal(true)
    }
    return (
        <div>
            <div className="pl-2 mt-4 mb-4 box-border border-4 h-14 flex items-center text-l whitespace-normal">
            <UserCard firstName={firstName} />
                <b className="pr-2">
                    {firstName} {lastName}
                </b>
                ({username})
                <button
                    className="ml-auto mr-4 rounded-md bg-black h-8 text-white w-24"
                    onClick={handleClick}>Send Money</button>
                <Modal
                    isOpen={modal}
                    onRequestClose={() => setModal(false)}
                >
                    <Transfer firstName={firstName} lastName={lastName} username={username} />
                </Modal>
            </div>
        </div>
    )
}