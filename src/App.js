import './App.css';
import { useEffect, useState } from 'react';
import { useMoralis } from "react-moralis";
import { chain, address as contractAddress, ABI} from "./models/contracts/Legend";

function App() {
  const { Moralis, authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  // Fetching Data
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxSupply, setMaxSupply] = useState(0);
  const [allNfts, setAllNfts] = useState([]);

  // NFT Functions

  const getNFTs = async () => {
    const options = {
      chain: chain,
      address: account,
      token_address: contractAddress
    };
    let fetchedNFTS = await Moralis.Web3API.account.getNFTsForContract(options);
    console.log('fetchedNFTS: ', fetchedNFTS);
    console.log('fetchedNFTS.result: ', fetchedNFTS.result);
    let fetchedNFTSArray = fetchedNFTS.result;

    let nftsWithImageURL = await Promise.all(fetchedNFTSArray.map(async (token) => {
      let metadataJSON = await fetch("https://storageapi.fleek.co/fc8a955b-9611-4fc1-90e8-ae69ac23af76-bucket/vegas-vickie-staging/legends/metadata/1")
                                 .then(response => response.json())
      token.metadata = metadataJSON;
      token.image_url = 'https://ipfs.io/ipfs/' + metadataJSON.image.match(/ipfs:\/\/(.*)/)[1];
      console.log(token);
      return token;
    }));

    setAllNfts(nftsWithImageURL);
  };

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
        await getNFTs();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      await Moralis.enableWeb3();
      await refreshLegends();
      await getNFTs();
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(allNfts);
  }, [allNfts]);

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
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        { !isAuthenticated && (
          <button onClick={login} className='w-96 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'>Login with MetaMask</button>
        )}
        { isAuthenticated && (
          <div className='flex items-center gap-6'>
            <p>Wallet: {user.get("ethAddress")}</p>
            <button onClick={logOut} disabled={isAuthenticating} className='w-32 flex items-center justify-center p-1 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-indigo-700'>Logout</button>
          </div>
        )}
      </div>

      { isAuthenticated && (
        <div className="col-span-12 p-6">
          <h2 className="text-2xl">Legend Collection</h2>
          <p>The legend collection is a deck of cards (including Joker). Features perks: perk 1, perk 2, etc.</p>

          <p>Price: 1 ETH</p>
          <button onClick={callMint} className="w-auto flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Mint 1 @ 1 ETH</button>
          <p>Minted {totalSupply.toString()}/{maxSupply.toString()}.</p>
        </div>
      )}

      { isAuthenticated && allNfts && (
        <div className="col-span-12 p-6">
          <h2 className="text-2xl">Your NFTs</h2>

          <ul className="grid grid-cols-2 gap-6 py-6 sm:grid-cols-4 lg:grid-cols-6">
            {allNfts.map((nft, index) => (
            <li key={index} className="col-span-1 bg-gray-500 rounded-lg shadow divide-y divide-gray-200">
              <img src={nft.image_url} alt="NFT artwork" className="w-full flex items-center justify-between space-x-6"/>
              <div className="flex items-center space-x-3 p-2 bg-gray-300">
                <h3 className="text-gray-900 text-sm font-medium truncate">{nft.metadata.name} #{nft.token_id}</h3>
                {/* <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {person.role}
                </span> */}
              </div>
              {/* <p className="mt-1 text-gray-500 text-sm truncate">{person.title}</p> */}
            </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
