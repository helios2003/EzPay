import { FaMoneyBill } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
    const navigate = useNavigate()
    return (
        <>
            <div className="flex flex-row border box-border h-16 shadow-md">
                <FaMoneyBill className="pb-3 pl-2 w-12 h-20" />
                <h1 className="text-2xl pl-3 mt-4 pr-96"><b>EzPay</b></h1>
                <div className="space-x-4">
                    <button
                        className="mt-4 text-xl ml-auto mr-4 text-white bg-black h-9 w-20 rounded-lg"
                        onClick={() => {
                            navigate('/api/v1/signin')
                        }}
                    >
                        Sign In
                    </button>
                    <button
                        className="mt-4 text-xl mr-4 bg-black text-white h-9 w-20 rounded-lg"
                        onClick={() => {
                            navigate('/api/v1/signup')

                        }}
                    >Sign Up
                    </button>
                </div>
                <a href="https://github.com/helios2003/EzPay" target="_blank" rel="noopener noreferrer" className="ml-auto pt-2 mr-4">
                    <FaGithub className="h-12 w-12" />
                </a>
            </div>
            <div className="space-y-4 mt-8 ml-6 w-6/12">
                <p className="text-7xl">Dive into No Cash, </p>
                <p className="text-7xl">All Convinience!</p>
            </div>
            <div className="flex flex-row items-start mt-8 ml-4">
                <p className="max-w-96 ml-4 text-xl">Bid adieu to the clatter of coins and the shuffle of paper.
                    EzPay invites you into a refined cashless experience—seamless, efficient, and devoid of physical currency inconveniences.
                    Say hello to a future where transactions are effortlessly executed, making financial management and transactions a breeze. </p>
                <img src="./money.png" alt="money" className="h-96 w-96 ml-auto mr-12 -mt-40" />
            </div>
        </>
    )
}