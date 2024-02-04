import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Players from './Players';

export default function LobbyPage() {
    const [playerData, setPlayerData] = useState(null);
    const { gameUrl } = useParams();
    const isMounted = useRef(false);

    useEffect(() => {

        if (!isMounted.current) {
        const fetchData = async () => {
          try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('jwtToken')}`;
            const response = await axios.get(`https://localhost:7267/api/Game/get-lobby/${gameUrl}`);
            const playerData = response.data.players.filter(player => player.userName !== sessionStorage.getItem('username'));
            setPlayerData(playerData);
            console.log(playerData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
        isMounted.current = true;
    }
      }, []);
    
      if (!playerData) {
       return <div>Loading...</div>;
      }

  return (
    <div className='flex justify-center gap-2'>
    {playerData.map((player) => (
      <Players key={player.userName} player={player} />
    ))}
    </div>
  )
}
