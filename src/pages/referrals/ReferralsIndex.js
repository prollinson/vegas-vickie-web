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

      <div className="col-span-12 w-full mx-auto pt-16 sm:py-24 border-t border-[#1E1708] bg-pattern">
        <div className='max-w-4xl mx-auto'>

          <p className="font-diaply text-white">Earn points by referring others to the VVNFT community.</p>

        {!isAuthenticated && (
          <button
            className="w-auto bg-gray-900 text-white block pl-3 pr-4 py-2 font-gilroy uppercase text-base font-medium"
            onClick={ () => setIsConnectWalletOpen(true) }
          >
            Please Connect your wallet
          </button>
        )}

        {isAuthenticated && (
          <>
            <p className="text-white">Your referral code</p>
            <div className='border border-stone-300 text-xl flex justify-center p-4 mt-5 mb-10 bg-stone-200 font-bold'>
              <a href={`https://vegasvickienft.com/referrals/${user.get("username")}`}>https://vegasvickienft.com/referrals/{user.get("username")}</a>
            </div>
          </>
        )}

        {isLoading && (<p className="font-display text-white">Loading...</p>)}

        {error && (
          <p className="font-display text-white">Error: {error.message}</p>
        )}

        {referrals && referrals.length > 0 && (
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

        {referrals && referrals.length === 0 && (
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