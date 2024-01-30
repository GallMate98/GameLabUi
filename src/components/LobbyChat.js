import React, { useState, useEffect } from 'react';
import * as signalR from "@microsoft/signalr";



const LobbyChat = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");


    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7100/lobbyhub")
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                })
                .catch(e => console.log('Connection failed: ', e));

            connection.on("ReceiveChatMessage", (user, message) => {
                setMessages(prevMessages => [...prevMessages, `${user}: ${message}`]);
            });
        }
    }, [connection]);

    const sendMessage = () => {
        if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
            console.error('Cannot send message: Connection is not in the Connected state');
            return;
        }

        if (messageInput.trim() !== "") {
            connection.send("SendChatMessage", "User", messageInput)
                .then(() => setMessageInput(""));
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((msg, index) => <p key={index}>{msg}</p>)}
            </div>
            <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default LobbyChat;
