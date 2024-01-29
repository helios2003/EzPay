import axios from "axios"

export default async function LoginPage({ username, password }) {
  const url = 'http://localhost:3000/api/v1/signin'
    try {
      const response = await axios.post(url, { username: username, password: password })
      if (response.status === 200) {
        const token = response.data.token
        localStorage.setItem('token', token)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('firstName', response.data.firstName)
        localStorage.setItem('lastName', response.data.lastName)
        localStorage.setItem('balance', response.data.balance)
      } else {
        console.log("Invalid username or password")
      }
    } catch (error) {
      console.log("Something is up with our server, please try again")
      console.log(error)
    }
}