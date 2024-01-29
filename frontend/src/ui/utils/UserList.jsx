import React from 'react';
import ShowUser from './ShowUser';

export default function UserList({ users }) {
  
  // dont show the logged in user
  const loggedInUser = localStorage.getItem('username')
  const filteredUsers = users.filter((user) => user.username !== loggedInUser)
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
  );
}