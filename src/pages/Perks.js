import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";

function Perks() {
  return (
    <>
      <Header />
      <PageHeader pageTitle="Perks &amp; Benefits" />

      <Outlet />
      
      <Footer />
    </>
  )
}

export default Perks;