## EzPay

EzPay is an E-payment app made in the MERN stack. Through this app, users can make payments to other users, and also receive payments from other users. 

## Features

- User can add a PIN to their account for secured payments.
- Users can make and receive payments from other users.
- Users can search for other users by their names.

## Setting up the project
- Clone the repository
- Rename the .env.example file to .env and add the environment variables.
- Change directory to the backend folder and run `npm install` and run `npm run dev` to start the backend which runs on ``localhost:3000``.
- Change directory to the frontend folder and run `npm install` and run `npm run dev` to start the frontend which runs on ``localhost:5173``. <br /> <br />


**NOTE**: For transactions to work, you need a MongoDB with replicating nodes. Either create a MongoDB cluster or run a local MongoDB instance by taking reference from [here](https://docs.mongodb.com/manual/tutorial/deploy-replica-set-for-testing/). 

## Technologies Used
- MERN Stack
- Recoil (for state management and avoiding prop drilling)

