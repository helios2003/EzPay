import React from 'react';

export default function UserCard({ firstName }) {
    const firstChar = firstName ? firstName[0] : '';

    return (
        <div className='pr-2'>
            <div className='text-2xl text-white bg-black h-9 w-9 rounded-full text-center'>
                {firstChar}
            </div>
        </div>
    );
}
