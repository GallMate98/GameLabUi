import { useNavigate } from "react-router-dom";

const GameCard = ({ game }) => {

  const navigate = useNavigate();


 const handleClick = () =>{

 navigate(`/lobbies/${game.url}`);
 }


  return (
    <div key={game.id} className="  card bg-white p-4 shadow-md mb-4 w-1/3">
      <div className="flex">
        <div className="flex item-center image-container w-1/4">
          <img src={game.imageUrl} alt="Game Image" className=" w-1/2 h-auto object-cover " />
        </div>
        <div className="name-container w-3/4 px-4">
          <h2 className="text-xl font-bold">{game.name}</h2>
        </div>
      </div>
      <div className="description-container mt-4">
        <p className="text-gray-600">{game.description}</p>
      </div>
      <div className="button-container mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleClick}>Join Lobby</button>
      </div>
    </div>
  )
};

 export default GameCard;