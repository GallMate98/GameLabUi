import React, { useEffect, useState } from 'react';

const HomePage = () => {
   
  const [userName, setUsername] = useState('');
  const [isLoggedIn ,setIsLoggedIn] = useState(false);

  
 
  const CheckIsLogged = () => {

    const userNameSession = sessionStorage.getItem('username');
    console.log(userNameSession);

    if(userNameSession != '' || userNameSession != null)
    {
       
       setUsername(userNameSession);
       setIsLoggedIn(true);
     
    } 
    else
    {
      setIsLoggedIn(false);
    } 
  }
  
  useEffect(()=>{
     CheckIsLogged();
    console.log(sessionStorage.getItem('username'));
  },[]) 


  return (
    <div>
        {isLoggedIn ?(

          <h1 className="text-5xl font-semibold text-center mt-8">
            Welcome back {userName}!
               </h1>
        )
        :(
          <h1 className="text-5xl font-semibold text-center mt-8">
            Welcome this is site! Try Sign up!
          </h1>
        )
        }
    </div>
  );
};

export default HomePage;
