import * as signalR from '@microsoft/signalr';
import React, { useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import NineMensMorrisBoard from './NineMensMorrisBoard';
function NineMensMorrisGame() {

    const { gameId } = useParams();
    const [gameLobbyId, setGameLobbyId] = useState(null);
    const [connection, setConnection] = useState(null);
    const [playersData, setPlayersData] = useState(null);
    const [currentPlayer , setCurrentPlayer] = useState(null);
    const [nextMoveMessage, setNextMoveMessage] = useState("");
    const [winner, setWinner] = useState("");
    const [winnerMessage , setWinnerMessage] = useState(""); 
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const isConnected = useRef(false); 
    const userName = sessionStorage.getItem('username');
    const [boardState, setBoardState] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ]);
  
    useEffect(()=>{
        setGameLobbyId(gameId);
    },[])
    

    useEffect(() => {
        if(!isConnected.current) {
          const newConnection = new signalR.HubConnectionBuilder()
          .withUrl("https://localhost:7267/ninemenshub",{
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
      }, [gameLobbyId]);


    /*  useEffect(() => {
        if (connection != null && gameLobbyId != null) {
  
         // console.log('hello lobby id:' + lobbyId);
      
          const handleUpdateLobby = (data) => {
            console.log(data);
            setPlayersData(data);
          };

          const updateCurrentPlayer = (currentPlayerUserName) => {
            setCurrentPlayer(currentPlayerUserName);
          }

          const  updatePosition = async (value, newPlayer, row, col) => {
            const newBoardState = [...boardState];
            newBoardState[row][col] = value;
            setBoardState(newBoardState);
            setCurrentPlayer(newPlayer);
          }

          const addWinner = async (winnerPlayer) => {
            setWinner(winnerPlayer);
            if(winnerPlayer === userName)
            {
              setWinnerMessage("You are the winner!");
            }
            else
            {
                setWinnerMessage(`The winner is ${winnerPlayer}`);
            }
          }

          const isDraw = (draw) => {
            if(draw)
            {
                setWinnerMessage("Draw!");
            }
          }
 
        const addReceiveMessage = (receivedUserName, receivedMessage) => {
            setMessages(prevMessages => [...prevMessages, { userName: receivedUserName, message: receivedMessage }]);
        }

          connection.on("UpdateLobby", handleUpdateLobby);

          connection.on("StartGame", updateCurrentPlayer);

          connection.on("NewPosition", updatePosition);

          connection.on ("Winner", addWinner);

          connection.on ("Draw", isDraw);

          connection.on("ReceiveMessage", addReceiveMessage);

          connection.invoke('JoinGameLobby', gameLobbyId, userName)
            .then(() => {
              console.log('JoinGameLobby metódus meghívva!');
            })
            .catch(error => {
              console.error('Hiba a JoinLobby metódus meghívása során:', error);
            });
  
        
            return () => {
              connection.off("UpdateLobby", handleUpdateLobby);
            };  
  
        }
    },[connection, gameLobbyId]);


    useEffect (() =>{

    if(currentPlayer != null)
    {  
        if(winner == '')
        {
            if(currentPlayer === userName) {
                setNextMoveMessage("It's your move next");
            } else {
                setNextMoveMessage(`The next move is ${currentPlayer}`);
            }
        }
        if(winnerMessage!="")
        {
            setNextMoveMessage(winnerMessage);
        }
       
    }
    },[connection, gameLobbyId, currentPlayer])

   const onSquareClick = (row, col) => {
    if(winner == '')
    {
        connection.invoke('GamePlay', gameLobbyId, userName, row, col)
        .then(() => {
        console.log('JoinGameLobby metódus meghívva!');
        })
        .catch(error => {
        console.error('Hiba a JoinLobby metódus meghívása során:', error);
        });
    }
    else 
    {
        alert("The game end!");
    }
   }

   const sendMessage = async () => {
    if (!connection || !newMessage) return;
    
    try {
      await connection.invoke('SendMessage', gameLobbyId, userName, newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };*/


  return (
  <div className='flex w-full'>
        <div className="w-1/10 flex items-center justify-center">
            <div className="h-1/6 bg-gray-100 rounded-lg p-1 flex items-center">
                <p className=" text-gray-500 text-2xl text-center  mx-auto">{nextMoveMessage}</p>
            </div>
        </div>
        <div className='w-3/4'>
            <div className=' flex flex-col  card  w-full items-center p-1 px-8'>
                    {playersData != null && (
                    <div className=' w-1/4 p-2 bg-white rounded-lg text-black'>
                        <p className="text-xl font-bold">Username: {playersData[0].userName}</p>
                        <p className="text-xl font-bold">Score: {playersData[0].score}</p>
                    </div>
                    )}
                </div>
                 <div className='flex justify-center mb-2 mt-2'>
                    <NineMensMorrisBoard />
                 </div>
            <div className=' flex flex-col  card w-full items-center gap-1 px-8 mb-1'>
                    {playersData != null && (
                     <div className=' w-1/4 p-2 bg-white rounded-lg text-black mt-1'>
                        <p className="text-xl font-bold">Username: {playersData[1].userName}</p>
                        <p className="text-xl font-bold">Score: {playersData[1].score}</p>
                    </div>

                    )}
                </div>
        </div>
        <div className="w-1/6  bg-white border-r border-gray-300 flex flex-col ">
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
            className="w-full  h-15 p-2 border border-gray-300 rounded-lg resize-none"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button
            className="mt-2 mx-2 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
         onClick >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default NineMensMorrisGame;
