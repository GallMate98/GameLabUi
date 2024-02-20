import React from 'react';

const Invitation = (props) => {

  const handleAccept = () => {
   props.acceptInvitation(props.invit);
  }
    
   const handleDelete = () => {
    props.deleteInvitation(props.invit);
   }

  return (
    <div className="card bg-gray-300 p-4 shadow-md mb-4 w-full px-5">
      <div className="name-container w-3/4 px-4">
        <p className="text-xl font-bold">Invitation from game to {props.invit} </p>
      </div>
      
    <div className=" flex-auto button-container mt-4">
      <button className="bg-green-500 text-white px-8 py-2 rounded mr-2"
      onClick={handleAccept}
        >Accept
      </button>
      <button className="bg-red-500 text-white px-8 py-2 rounded"
       onClick={ handleDelete}
        >Dicline
      </button>
    </div>
  </div>
  );
};

export default Invitation;
