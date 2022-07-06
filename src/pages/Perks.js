import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import JoinCommunitySection from "../components/elements/JoinCommunitySection";
import Footer from "../components/layout/Footer";

function Perks() {
  return (
    <>
      <Header />
      <PageHeader pageTitle="Perks &amp; Benefits" />

      <Outlet />
      
      <JoinCommunitySection />
      <Footer />
    </>
  )
}

export default Perks;