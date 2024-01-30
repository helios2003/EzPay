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
                <p className="w-6/12 ml-4 text-xl">
                    Unlock a realm of financial ease as EzPay transforms your transactions into seamless endeavors.
                    With just a tap, navigate through a world where money flows effortlessly,
                    eliminating the need for physical currency. Whether splitting bills or sending funds to loved ones,
                    EzPay simplifies every monetary interaction. Embrace the future of finance uncomplicated, efficient,
                    and at your fingertips. 
                    Welcome to EzPay, where simplicity meets sophistication, and your financial world becomes refreshingly uncomplicated!</p>
                <img src="./money.png" alt="money" className="h-96 w-96 ml-auto mr-12 -mt-40" />
            </div>
        
        </>
    )
}