import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";

import { useMoralisCloudFunction } from "react-moralis";
import { useEffect } from "react";
import LoadingSpinner from "../components/elements/LoadingSpinner";

const Leaderboard = function() {

  let {data, error, isLoading} = useMoralisCloudFunction("getLeaderboard", {});

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Header />
      <PageHeader pageTitle="Leaderboard" />

      <div className="col-span-12 w-full mx-auto pt-16 sm:py-16 border-t border-[#1E1708] bg-pattern">
          <div className='max-w-3xl mx-auto'>
            <p className="font-display text-white">Get rewarded for engaging with VVNFT community. Earn points for every NFT you own. More points
             mean improved chances to earning rewards. Note this is currently in BETA.</p>

            {error && (
              <p className="font-display text-white">Error: {error.message}</p>
            )}

            {isLoading && (
              <div className="mx-auto pt-20">
                <LoadingSpinner />
              </div>
            )}

            {data && (
            <table className="table-auto text-white mt-10 mx-auto">
              <thead>
                <tr>
                  <th className="font-display">Position</th>
                  <th className="font-display">Address</th>
                  <th className="font-display">Total Points</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, index) => (
                  <tr key={index}>
                    <td className="font-display text-center">{user.rank}</td>
                    <td className="font-display text-center">{user.name ? user.name : user.ethAddress}</td>
                    <td className="font-display text-center">{user.totalPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        </div>
    
      <Footer />
    </>
  );
}

export default Leaderboard;