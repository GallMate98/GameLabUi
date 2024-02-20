import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Players from './Players';
import Invitation from './Invitation';
import * as signalR from '@microsoft/signalr';
import { useNavigate } from "react-router-dom";

export default function LobbyPage() {
    const { gameUrl } = useParams();
    const [lobbyId, setLobbyId] = useState(null);
    const [connection, setConnection] = useState(null);
    const [playersData, setPlayersData] = useState(null);
    const [invitData, setInvitData] = useState(new Set());
    const [messages, setMessages] = useState([]);
    const [myData , setMyData] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [isOk, setIsOK] = useState(true);
    const userName = sessionStorage.getItem('username');
    const navigate = useNavigate();
    
    const isMounted = useRef(false);
    const isConnected = useRef(false);


    useEffect(() => {
        if (!isMounted.current) {

          const fetchData = async () => {
            try {
              axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('jwtToken')}`;
              const response = await axios.get(`https://localhost:7267/api/Game/get-lobby/${gameUrl}`);
              setLobbyId(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };


          fetchData();
          isMounted.current = true;
        }
    }, []);
      
    useEffect(() => {
      if(!isConnected.current) {
        const newConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7267/lobbyhub",{
          accessTokenFactory: () => 
          sessionStorage.getItem('jwtToken')
        })
        .build();

          newConnection.start()
            .then(() => {
              console.log('megtortent a connection');
              setConnection(newConnection);
             

            })
            .catch(error => {
              console.error('Hub kapcsolat indítása hiba:', error);
            });


        isConnected.current = true;
      }
    }, [lobbyId]);


    

    useEffect(() => {
      if (connection != null && lobbyId != null) {

       // console.log('hello lobby id:' + lobbyId);
    
        const handleUpdateLobby = (data, storedMessages) => {
          const myPlayers = data.filter(player => player.userName !== sessionStorage.getItem('username'));
          setPlayersData(myPlayers);
          setMyData(data);

          if(storedMessages!= null)
          {
           setMessages(storedMessages);
          }
        };

        const AddInvatation = (senderUserName) => {
          console.log(senderUserName);
            setInvitData(prevInvitations => new Set([...prevInvitations, senderUserName]));
        }

        const RedirectGameLobby = (gameId) => {
          navigate(`/${gameUrl}/${gameId}`);
        }

        console.log(playersData);
        connection.on("UpdateLobby", handleUpdateLobby);
        
        connection.on('ReceiveMessageToAll', sendMessage);

        connection.on("ReceiveInvate", AddInvatation);

        connection.on("GameId", RedirectGameLobby);


        connection.invoke('JoinLobby', lobbyId)
          .then(() => {
            console.log('JoinLobby metódus meghívva!');
          })
          .catch(error => {
            console.error('Hiba a JoinLobby metódus meghívása során:', error);
          });

          
          const handleBeforeUnload = () => {
            console.log('Böngésző fül bezárása vagy oldal elhagyása');
      
            connection.invoke('LeaveLobby', lobbyId, sessionStorage.getItem('username') )
              .then(() => {
                console.log('LeaveLobby metódus meghívva a beforeunload eseményre!');
              })
              .catch(error => {
                console.error('Hiba a LeaveLobby metódus meghívása során:', error);
              });
          };
      
          window.addEventListener('beforeunload', handleBeforeUnload);
      
          return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            connection.off("UpdateLobby", handleUpdateLobby);
          };  

      }
    }, [connection, lobbyId]);

  const findPlayer = (playerUserName) =>{

    const foundPlayer = playersData.find(player => player.userName === playerUserName);
    return foundPlayer;
  }

  const findMy = (playerUserName) =>{

    const foundPlayer = myData.find(player => player.userName === playerUserName);
    return foundPlayer;
  }


  const acceptInvitation = async (senderUserName) => {

  const receivePlayer = findMy(userName);
  console.log(receivePlayer);
  const senderPlayer = findPlayer(senderUserName);
  if (!connection) return;
  try {
    await connection.invoke('AcceptGameRequest', receivePlayer, senderPlayer, gameUrl, lobbyId);
    setNewMessage('');
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

  const sendMessage = async () => {
    if (!connection || !newMessage) return;
    
    try {
      await connection.invoke('SendToAllInLobby', lobbyId, userName, newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const sendInvation = async (playerName) => {
   console.log("playername:"+playerName);
    if (!connection) return;
    try {
      await connection.invoke('SendInvate', playerName);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  const deleteInvitation = async (removeElement) =>{
   const withOutRemoveElement = new Set(invitData);
   withOutRemoveElement.delete(removeElement);
   setInvitData( withOutRemoveElement);
  }
    
  
  
  useEffect(() => {
    if (connection && lobbyId) {
      connection.on('ReceiveMessageToAll', (receivedUserName, receivedMessage) => {
        setMessages(prevMessages => [...prevMessages, { userName: receivedUserName, message: receivedMessage }]);
      });

      return () => {
        connection.off('ReceiveMessageToAll');
      };

     
    }
  }, [connection, lobbyId]);


  

  useEffect(() => {
   
    if (connection && lobbyId) {

      

    /* const handleInvitation = (senderUserName, receiveUserName) =>{
      console.log(playersData.userName);
      playersData.map((player)=>{
      if(player.userName == receiveUserName)
      {
        setIsOK(false);
      }
      });

      if(isOk)
      {
        setInvitData( receiveUserName);
      }
     }*/
  
      
      return () => {
        connection.off('ReceiveInvate');
      };
  }
  }, [connection, lobbyId]);
  

    if (!playersData) {
      return <div>Loading...</div>;
    }
  
    return (
    <div className="flex bg-gray-20 w-full gap-2">
      <div className="bg-gray-400 text-black p-4 px-24">
        <h2 className="text-center text-2xl font-bold mb-4">Inviation</h2>
        <div className='flex flex-col items-center gap-1'>
       {Array.from(invitData).map((senderUserName, index) => (
       <Invitation key={index} invit={senderUserName} deleteInvitation={deleteInvitation} acceptInvitation={acceptInvitation}/>
       ))}
</div>
      </div>
      <div className="w-3/4  bg-white border-r border-gray-300 flex flex-col ">
        <div className="flex-1 overflow-x-auto p-4">
        <h1 className="text-center text-xl py-4">Chat</h1>
          {messages.map((message, index) => (
            <div key={index} className="flex items-start mb-4">
              <img
                className="w-8 h-8 rounded-full mr-3"
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="avatar"
              />
              <div className="flex flex-col">
                <span className="text-gray-600">{message.userName}</span>
                <p className="bg-blue-100 text-sm p-2 rounded-lg">{message.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-300 flex items-center">
          <textarea
            className="w-full  h-20 p-2 border border-gray-300 rounded-lg resize-none"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button
            className="mt-2 mx-2 px-12 py-6 bg-blue-500 text-white rounded hover:bg-blue-600"
         onClick={sendMessage} >
            Send
          </button>
        </div>
      </div>
      <div className="bg-gray-400 text-black p-4 px-8">
        <h2 className="text-center text-2xl font-bold mb-4">Members in Lobby</h2>
      <div className='flex flex-col items-center gap-1'>
      {playersData.map((player) => (
        <Players key={player.userName} player={player} sendInvation={sendInvation}/>
      ))}
      </div>
      </div>
    </div>
    )
      
}
