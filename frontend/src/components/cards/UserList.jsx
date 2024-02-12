import React from 'react'
import ShowUser from './ShowUser'
import { useRecoilValue } from 'recoil'
import { userState } from "../../store/atoms"

export default function UserList({ users }) {
  // dont show the logged in user
  const loggedInUser = useRecoilValue(userState)
  const filteredUsers = users.filter((user) => user.username !== loggedInUser.username)
  return (
    <div>
      {filteredUsers.map(user => (
        <ShowUser
          key={user.username}
          firstName={user.firstName}
          lastName={user.lastName}
          username={user.username}
        />
      ))}
    </div>
  )
}