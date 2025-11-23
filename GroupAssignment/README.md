Class Chat App (Group Assignment)
This is simple real-time chat application built using **Node.js**, **Express**, and **Socket.io**.  
This app allows students in class to chat with each other live using a browser.

Features
- Real-time messaging
- User joins with their own name
- Shows when a new person joins the chat
- Messages instantly appear to everyone
- Easy design
- Easy to run for beginners

Technologies Used
- Node.js
- Express.js
- Socket.io
- HTML
- CSS
- JavaScript
- Nodemon

Installation

1. Clone the Repository
bash
git clone https://github.com/<your-username>/class-chat-app.git

2. Navigate Into the Project
bash
cd class-chat-app

3. Install Dependencies
bash
npm install
 
Running the App

Run in Development Mode:
bash
npm start

App link:
http://localhost:3000

How It Works (Step-by-Step)
1. Server Setup (server.js)
- Express serves static files
- Socket.io handles real-time communication
- Shows : users joining, sending messages, disconnecting

2. Client Side (script.js)
- Connects to server using Socket.io
- Sends message when user clicks send
- Receives new messages instantly
- Adds users to chat window

Live Demo
Hosted on: 
