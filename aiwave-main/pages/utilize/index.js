import React from "react";
import Context from "@/context/Context";

import PageHead from "../Head";

import HeaderTop from "@/components/Header/HeaderTop/HeaderTop";
import Header from "@/components/Header/Header";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import Footer from "@/components/Footers/Footer";
import Copyright from "@/components/Footers/Copyright";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Utilize from "@/components/Utilize/Utilize";
import BackToTop from "../backToTop";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import LeftDashboardSidebar from "@/components/Header/LeftDashboardSidebar";
import CommingSoon from "@/components/CommingSoon/CommingSoon";
const UtilizePage = () => {
  return (
    <>
      <PageHead title="How to use" />

      {/* <main className="page-wrapper">
        <Context>
          <HeaderTop />
          <Header
            headerTransparent="header-transparent"
            headerSticky="header-sticky"
            btnClass="rainbow-gradient-btn"
          />
          <PopupMobileMenu />
          <Breadcrumb title="How to use" text="How to use" />

          <Utilize />

          <BackToTop />
          <Footer />
          <Copyright />
        </Context>
      </main> */}
      <main className="page-wrapper rbt-dashboard-page">
        <Context>
          <div className="rbt-panel-wrapper">
            <HeaderDashboard display="d-none" />
            <PopupMobileMenu />
            <LeftDashboardSidebar />
            <CommingSoon/>
            
            
          </div>
        </Context>
      </main>
    </>
  );
};

export default UtilizePage;
