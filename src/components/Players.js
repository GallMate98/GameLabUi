import React from 'react'

export default function Players(props) {

  const handleClick = () => {
    props.sendInvation(props.player.userName);
  };

  return (
    <div key={props.player} className=" card bg-white p-4 shadow-md mb-4 w-full px-5">
    <div className="flex">
      <div className="name-container w-3/4 px-4">
        <p className="text-xl font-bold">{props.player.userName} <br/> ({props.player.score})</p>
      </div>
    <div className="button-container mt-4">
      <button className="bg-blue-500 text-white px-4 py-2 mb-2 rounded"
      onClick={handleClick}
      >Invite</button>
      </div>
    </div>
  </div>
  )
}
