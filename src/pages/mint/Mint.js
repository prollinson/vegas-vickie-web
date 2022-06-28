import { useEffect, useState } from 'react';
import { useChain, useMoralis, useNativeBalance} from "react-moralis";
import useUserInitialize from "../../hooks/useUserInitialize";

// Contracts
import tier2Contract from "../../models/contracts/DealersChoice";
import tier3Contract from "../../models/contracts/Tier3";

import TransactionDialog from '../../components/dialogs/TransactionDialog';
import MintCollection from '../../components/elements/MintCollection';
import PageHeader from '../../components/layout/PageHeader';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

// Assets
import tier1NftImage from '../../assets/the-one-and-only.png';
import tier1NftWebPImage from '../../assets/the-one-and-only_lossyalpha.webp';

import tier2NftImage from '../../assets/dealers-choice.png';
import tier2NftWebPImage from '../../assets/dealers-choice_lossyalpha.webp';

import tier3NftImage from '../../assets/neon-idol.png';
import tier3NftWebPImage from '../../assets/neon-idol_lossyalpha.webp';

import tier4NftImage from '../../assets/off-the-rack.png';
import tier4NftWebPImage from '../../assets/off-the-rack_lossyalpha.webp';

import MintBox from '../../components/elements/MintBox';
import AuctionBox from '../../components/elements/AuctionBox';

function Mint() {
  const {user, isAuthenticated, isWeb3Enabled, isWeb3EnableLoading, web3EnableError, account, logout} = useMoralis();
  const { chain } = useChain();
  const { getBalances, data: balance, nativeToken, error, isLoading } = useNativeBalance();
  const {initUser} = useUserInitialize();

  // Transactions
  const [mintTransaction, setMintTransaction] = useState(null);
  const [showTx, setShowTx] = useState(false);

  useEffect(() => {
    getBalances();
    initUser();
  }, [user]);

  return (
    <>
      <Header />
      <PageHeader pageTitle="The Mint" />
      <div className="col-span-12 w-full mx-auto p-1 border-t border-[#1E1708] flex flex-1 justify-center align-center bg-red-900">
        { chain && (        
            <p className='font-display text-white'>Connected to <b>{`${chain.name} (${chain.nativeCurrency.name})`}</b></p>
        )}
        { isAuthenticated && (
          <>
            <p className='font-display text-white'><b>{`Auth: ${isAuthenticated}`}</b></p>
            <a onClick={logout}>Logout</a>
          </>
        )}
        { user && (
          <>
            <p className='font-display text-white'><b>{`Logged in as ${user.get("ethAddress")}`}</b></p>
            <p className='font-display text-white'>Balance: {balance.formatted}</p>
          </>
        )}
         {isWeb3Enabled && (
          <>
            <p className='font-display text-white'><b>{`Web3 enabled: ${isWeb3Enabled}`}</b></p>
          </>
        )}
        { account && (
          <>
            <p className='font-display text-white'><b>{`Account: ${account}`}</b></p>
          </>
        )}
      </div>

      { isWeb3EnableLoading && (
        <>
          <div className="col-span-12 w-full mx-auto p-1 border-t border-[#1E1708] flex flex-1 justify-center align-center bg-red-900">
          <p className='font-display text-white'>loading</p>
          </div>
        </> 
      )}
      { web3EnableError && (
        <>
          <div className="col-span-12 w-full mx-auto p-1 border-t border-[#1E1708] flex flex-1 justify-center align-center bg-red-900">
          <p className='font-display text-white'>{web3EnableError}</p>
          </div>
        </> 
      )}
      <div className="col-span-12 w-full mx-auto pt-16 sm:py-24 border-t border-[#1E1708] bg-pattern h-screen flex flex-1 justify-center align-center">
        <div className='w-full max-w-5xl mx-auto'>
          <MintCollection
            contract={tier2Contract}
            name="Dealer's Choice"
            nftImage={tier2NftImage}
            nftWebPImage={tier2NftWebPImage}
            availableText={"Available to mint early Summer"}
          />

          <MintCollection
            contract={tier3Contract}
            name="Neon Idol"
            nftImage={tier3NftImage}
            nftWebPImage={tier3NftWebPImage}
            availableText={"Available to mint early Summer"}
          />
        </div>
      </div>
    </>
  );
}

export default Mint;
