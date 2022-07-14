import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";

const Referrals = function() {
  return (
    <>
      <Header />
      <PageHeader pageTitle="Referrals" />

      <Outlet/>
      
      <Footer />
    </>
  );
}

export default Referrals;