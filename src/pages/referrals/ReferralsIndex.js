import { useEffect, useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";

import ConnectWallet from "../../components/dialogs/ConnectWallet";

const ReferralsIndex = function() {
  const {user, isAuthenticated} = useMoralis();

  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);

  const {data:referrals, error, isLoading } = useMoralisQuery("Referral", q => q, null, { autoFetch: true });

  return (
    <>
      <ConnectWallet open={isConnectWalletOpen} onClose={() => setIsConnectWalletOpen(false)} />

      <div className="col-span-12 w-full mx-auto pt-16 pb-16 sm:py-24 border-t border-[#1E1708] bg-pattern px-5">
        <div className='max-w-4xl mx-auto'>

          <p className="font-display text-white">Give points and earn points. Refer others to the VVNFT community to earn points.</p>

        {!isAuthenticated && (
          <button onClick={ () => { setIsConnectWalletOpen(true) }} className="my-10 w-auto flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-black uppercase bg-vickie-yellow hover:bg-white hover:text-black mx-auto text-xl">
            Connect Wallet
          </button>
        )}

        {isAuthenticated && (
          <div className="pt-8">
            <h2 className="text-2xl sm:text-3xl text-white font-gilroy font-bold tracking-widest uppercase">Your Referral Code</h2>
            <p className="font-display text-white">Share your unique referral code to earn points:</p>
            <div className='border border-stone-300 text-sm md:text-xl flex justify-center p-4 mt-5 mb-10 bg-stone-200 font-bold break-all text-center'>
              <a href={`https://vegasvickienft.com/referrals/${user.get("username")}`}>https://vegasvickienft.com/referrals/{user.get("username")}</a>
            </div>
          </div>
        )}

        {isLoading && (<p className="font-display text-white">Loading...</p>)}

        {error && (
          <p className="font-display text-white">Error: {error.message}</p>
        )}

        {isAuthenticated && referrals && referrals.length > 0 && (
          <>
            <h2 className="text-2xl sm:text-3xl text-white font-gilroy font-bold tracking-widest uppercase">Your Referrals</h2>
            <p className="font-display text-white">Thanks, you have referred {referrals.length} users.</p>
            <ul>
            {referrals.map(referral => (
              <li><p className="font-display text-white">You referred {referral.get("user").get("ethAddress")}</p></li>
            ))}
            </ul>
          </>
        )}

        {isAuthenticated && referrals && referrals.length === 0 && (
          <>
            <p className="font-display text-white">You do not have any referrals</p>
          </>
        )}
        </div>
      </div>
    </>
  );
}

export default ReferralsIndex;