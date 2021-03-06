import { useEffect, useState } from 'react';
import { useChain, useEnsAddress, useMoralis, useNativeBalance} from "react-moralis";
import useContracts from '../../hooks/useContracts.js'

import flagsmith from 'flagsmith';

import { Tab } from '@headlessui/react';
import AuctionCollection from '../../components/elements/AuctionCollection';
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

function Mint() {
  const {Moralis, user, isAuthenticated, isWeb3Enabled, isWeb3EnableLoading, web3EnableError, account, logout} = useMoralis();
  const { chain } = useChain();
  const {initContracts, tier2Contract, tier3Contract, tier4Contract} = useContracts();
  const { getBalances, data: balance } = useNativeBalance();
  const { name } = useEnsAddress(user && user.get("ethAddress"));

  const tabStyle = "h-12 md:h-24 w-full md:w-auto px-2 md:px-10 bg-stone-900 hover:bg-stone-700 md:mr-1 border-b border-black font-display font-bold uppercase text-white text-sm md:text-lg md:mb-1";

  useEffect(() => {
    if(user) {
      getBalances();
      flagsmith.identify(user.get("id"));
    }
  }, [user]);

  useEffect(() => {
    initContracts();
  }, [])

  return (
    <>
      <Header />
      <PageHeader pageTitle="The Mint" />

      {false && isAuthenticated && isWeb3Enabled && (
      <div className="col-span-12 w-full max-w-5xl mt-10 mx-auto mt-5 p-1 border-t border-[#1E1708] flex flex-1 justify-between align-center">
        { false && chain && (
          <>
          <p className="text-sm text-stone-600">{tier2Contract.chainId}</p>        
            <p className='font-display text-white'>Connected to <b>{`${chain.chainId} (${chain.nativeCurrency.name})`}</b></p>
            </>
        )}
        { isAuthenticated && false && (
          <>
            { !isWeb3Enabled && (
              <p className='font-display text-white py-2 px-3'><b>{`Logged in`}</b></p>
            )}
            { isWeb3Enabled && (
              <>
                <p className='font-display text-white py-2 px-3'><b>{`Logged in as ${name ? name : user.get("ethAddress")}`}</b></p>
                <p className='font-display text-white py-2'>Balance: {balance.formatted}</p>
              </>
            )}

            <button onClick={logout} className="w-auto flex items-center px-3 py-1 border border-transparent text-base font-medium rounded-md text-black uppercase bg-stone-200 hover:bg-white hover:text-black mx-auto text-sm">Logout</button>
          </>
        )}
      </div>
      )}

      { false && isWeb3EnableLoading && (
        <>
          <div className="col-span-12 w-full mx-auto p-1 border-t border-[#1E1708] flex flex-1 justify-center align-center bg-red-900">
          <p className='font-display text-white'>loading</p>
          </div>
        </> 
      )}
      { web3EnableError && (
        <>
          <div className="col-span-12 w-full mx-auto p-1 border-t border-[#1E1708] flex flex-1 justify-center align-center bg-red-900">
          <p className='font-display text-white'>{web3EnableError.message}</p>
          </div>
        </> 
      )}
      <div className="col-span-12 w-full mx-auto md:pt-16 sm:py-24 border-t border-[#1E1708] bg-pattern flex flex-1 justify-center align-center">
        <div className='w-full max-w-5xl mx-auto'>

        <Tab.Group>
          <Tab.List className="w-full flex md:flex-grow flex-wrap">
            <Tab className={({ selected }) => selected ? tabStyle + ' bg-vickie-yellow text-white' : tabStyle}>Dealers Choice</Tab>
            <Tab className={({ selected }) => selected ? tabStyle + ' bg-vickie-yellow text-white' : tabStyle}>Neon Idol</Tab>
            <Tab className={({ selected }) => selected ? tabStyle + ' bg-vickie-yellow text-white' : tabStyle}>Off the Rack</Tab>
          </Tab.List>
          <Tab.Panels>
            {tier2Contract && (
              <Tab.Panel>
                <MintCollection
                  contract={tier2Contract}
                  name="Dealer's Choice"
                  nftImage={tier2NftImage}
                  nftWebPImage={tier2NftWebPImage}
                  availableText={"Available to mint 6/28"}
                />
              </Tab.Panel>
            )}
            {tier3Contract && (
              <Tab.Panel>
                <MintCollection
                  contract={tier3Contract}
                  name="Neon Idol"
                  nftImage={tier3NftImage}
                  nftWebPImage={tier3NftWebPImage}
                  availableText={"Available to mint 6/28"}
                />
              </Tab.Panel>
            )}
            {tier4Contract && (
              <Tab.Panel>
                <MintCollection
                  contract={tier4Contract}
                  name="Off the Rack"
                  nftImage={tier4NftImage}
                  nftWebPImage={tier4NftWebPImage}
                  availableText={"Available to mint 6/28"}
                />
              </Tab.Panel>
            )}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
}

export default Mint;
