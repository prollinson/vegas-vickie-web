import { useEffect, useState } from "react";
import { useMoralisCloudFunction, useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";

import Header from "../../components/layout/Header";
import PageHeader from "../../components/layout/PageHeader";
import Footer from "../../components/layout/Footer";
import ConnectWallet from "../../components/dialogs/ConnectWallet";

const ReferralsClaim = function() {
  const {user, isAuthenticated} = useMoralis();
  let params = useParams();

  const [isConnectWalletOpen, setIsConnectWalletOpen] = useState(false);
  const [referralAddress, setReferralAddress] = useState(null);

  const { fetch, data, error, isLoading } = useMoralisCloudFunction("getReferrer", {referralCode: params.referralCode}, { autoFetch: false });

  useEffect(() => {
    if(user) {
      fetch();
    }
  }, [user])

  useEffect(() => {
    console.log(params.referralCode);
    console.log(data);
    if(data) {
      setReferralAddress(data.referrerAddress);
    }
  }, [data])

  return (
    <>
      <Header />
      <PageHeader pageTitle="Referrals" />

      <ConnectWallet open={isConnectWalletOpen} onClose={() => setIsConnectWalletOpen(false)} />

      <div className="col-span-12 w-full mx-auto pt-16 sm:py-24 border-t border-[#1E1708] bg-pattern">
        <div className='max-w-7xl mx-auto'>

        {!isAuthenticated && (
          <button
            className="w-auto bg-gray-900 text-white block pl-3 pr-4 py-2 font-gilroy uppercase text-base font-medium"
            onClick={ () => setIsConnectWalletOpen(true) }
          >
            Please Connect your wallet
          </button>
        )}

        {isLoading && (<p className="font-display text-white">Loading...</p>)}

        {error && (
          <p className="font-display text-white">Error: {error.message}</p>
        )}

        {referralAddress && (
          <p className="font-display text-white">Your referral by {referralAddress}  has been logged.</p>
        )}
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default ReferralsClaim;