import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from './GameCard';


export default function GamesPage() {

    const [gamesData, setGamesData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('jwtToken')}`;
          const response = await axios.get('https://localhost:7267/api/Game/getGames');
          setGamesData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    if (!gamesData) {
        return <div>
            Loading...
            </div>;
      }

    return (
        <div className='flex justify-center gap-2 max-h-52'>
        {gamesData.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    );
}      
