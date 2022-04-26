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
    <header className="flex flex-col pt-12 pb-4 mb-12 bg-black border-b border-white">
      <h1 className="font-gilroy black uppercase text-3xl tracking-widest text-white text-center">Vegas Vickie NFT</h1>
      
      <div className="font-display font-gilroy uppercase">
        <ul className="flex flex-inital justify-center text-white">
          <li className="p-3 hover:text-vickie-yellow"><Link to="/">Home</Link></li>
          <li className="p-3 hover:text-vickie-yellow"><Link to="/collections">Collections</Link></li>
        </ul>
      </div>

      <div className='flex items-center gap-6 justify-center'>
        { !isAuthenticated && (
          <button onClick={login} className='w-72 flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-black font-bold bg-vickie-yellow hover:bg-vickie-yellow md:py-2 md:text-lg md:px-6 uppercase font-gilroy'>Login with MetaMask</button>
        )}
        { isAuthenticated && (
          <>
            <p className="text-white">Wallet: {user.get("ethAddress")}</p>
            <button onClick={logOut} disabled={isAuthenticating} className='w-32 flex items-center justify-center p-1 border border-transparent text-base font-medium rounded-md text-black bg-gray-600 hover:bg-vickie-yellow'>Logout</button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header;