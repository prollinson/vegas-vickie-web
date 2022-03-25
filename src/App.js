import './App.css';
import { useEffect, useState } from 'react';
import { useMoralis } from "react-moralis";
import { address as contractAddress, ABI} from "./models/contracts/Legend";

function App() {
  const { Moralis, authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  // Fetching Data
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);

  // Contract Functions

  const getTotalSupply = async () => {
    const readOptions = {
      contractAddress: contractAddress,
      functionName: "totalSupply",
      abi: ABI,
    };
  
    return Moralis.executeFunction(readOptions);
  };

  const getMaxSupply = async () => {
    const readOptions = {
      contractAddress: contractAddress,
      functionName: "MAX_SUPPLY",
      abi: ABI,
    };
  
    return Moralis.executeFunction(readOptions);
  };

  const refreshLegends = async () => {
    const totalSupply = await getTotalSupply();
    setTotalSupply(totalSupply);

    const maxSupply = await getMaxSupply();
    setMaxSupply(maxSupply);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (user) {      
        await refreshLegends();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      await Moralis.enableWeb3();
      await refreshLegends();
    }
    fetchData();
  }, []);

  // Actions

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

  // Minting
  const callMint = async () => {
    if(!account) { console.log('No account'); return; };
    
    await Moralis.enableWeb3();

    const sendOptions = {
      contractAddress: contractAddress,
      functionName: "mint",
      abi: ABI,
      msgValue: Moralis.Units.ETH("1"),
      params: {
        _quantity: 1,
      },
    };
    const transaction = await Moralis.executeFunction(sendOptions);

    await transaction.wait();
    
    // Read new value
    let totalSupply = await getTotalSupply();
    setTotalSupply(totalSupply);
  };

  return (
    <div className="App">
      <div>
        { !isAuthenticated && (
          <button onClick={login}>Login with MetaMask</button>
        )}
        { isAuthenticated && (
          <>
            <p>{user.get("ethAddress")}</p>
            <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
          </>
        )}
      </div>
      <hr/>

      { isAuthenticated && (
        <div>
          <h2 className="text-2xl">Legend Collection</h2>
          <p>The legend collection is a deck of cards (including Joker). Features perks: perk 1, perk 2, etc.</p>

          <p>Price: 1 ETH</p>
          <button onClick={callMint}>Mint 1 @ 1 ETH</button>
          <p>Minted {totalSupply.toString()}/{maxSupply.toString()}.</p>
        </div>
      )}
      <hr/>
    </div>
  );
}

export default App;
