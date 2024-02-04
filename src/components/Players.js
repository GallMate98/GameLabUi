import React from 'react'

export default function Players(props) {
  return (
    <div key={props.player} className="  card bg-white p-4 shadow-md mb-4 w-full">
    <div className="flex">
      <div className="name-container w-3/4 px-4">
        <p className="text-xl font-bold">{props.player.userName} <br/> ({props.player.score})</p>
      </div>
    <div className="button-container mt-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Invite</button>
      </div>
    </div>
  </div>
  )
}
