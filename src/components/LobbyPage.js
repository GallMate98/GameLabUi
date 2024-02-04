import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Players from './Players';
import * as signalR from '@microsoft/signalr';

export default function LobbyPage() {
    const { gameUrl } = useParams();
    const [lobbyId, setLobbyId] = useState(null);
    const [connection, setConnection] = useState(null);
    const [playersData, setPlayersData] = useState(null);
    
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
        .withUrl("https://localhost:7267/lobbyhub")
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

        console.log('hello lobby id:' + lobbyId);
    
        const handleUpdateLobby = (data) => {
          console.log('updatelem a lobbym:');
          console.log(data);
          const myPlayers = data.filter(player => player.userName !== sessionStorage.getItem('username'));
          setPlayersData(myPlayers);
        };
    
        connection.on("UpdateLobby", handleUpdateLobby);
    
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


    useEffect(() => {
      const handleBeforeUnload = () => {
        console.log('Böngésző fül bezárása vagy oldal elhagyása');
        
        if (connection && lobbyId) {
         
        }
      };
    
      window.addEventListener('beforeunload', handleBeforeUnload);
    
      return () => {
        // Cleanup fázis: eltávolítjuk az eseményfigyelőt
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [connection, lobbyId]);







    if (!playersData) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className='flex justify-center gap-2'>
      {playersData.map((player) => (
        <Players key={player.userName} player={player} />
      ))}
      </div>
    )
}
