import { useMoralis } from "react-moralis";

import { Link } from 'react-router-dom';

function Header() {
  const { Moralis, authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({signingMessage: "Log into Vegas Vickie NFT" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });  
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

  return (
    <header className="flex flex-col mb-12">
      <h1 className="text-6xl text-white text-center h-20">Vegas Vickie NFT</h1>
      
      <div className="">
        <ul className="flex flex-inital justify-center text-white">
          <li className="p-3"><Link to="/">Home</Link></li>
          <li className="p-3"><Link to="/collections">Collections</Link></li>
        </ul>
      </div>

      <div className='flex items-center gap-6 justify-center'>
        { !isAuthenticated && (
          <button onClick={login} className='w-96 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 md:py-4 md:text-lg md:px-10'>Login with MetaMask</button>
        )}
        { isAuthenticated && (
          <>
            <p className="text-white">Wallet: {user.get("ethAddress")}</p>
            <button onClick={logOut} disabled={isAuthenticating} className='w-32 flex items-center justify-center p-1 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-amber-700'>Logout</button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header;