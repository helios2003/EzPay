import React from 'react';
import ShowUser from './ShowUser';

export default function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
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
