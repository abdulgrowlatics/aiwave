import React from "react";
import Context from "@/context/Context";

import PageHead from "../Head";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
// import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import LeftDashboardSidebar from "@/components/Header/LeftDashboardSidebar";
import HeaderTop from "@/components/Header/HeaderTop/HeaderTop";
import Header from "@/components/Header/Header";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import Footer from "@/components/Footers/Footer";
import Copyright from "@/components/Footers/Copyright";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BackToTop from "../backToTop";
import Contact from "@/components/Contact/Contact";
import CtaTwo from "@/components/CallToActions/Cta-Two";
import CommingSoon from "@/components/CommingSoon/CommingSoon";

const ContactPage = () => {
  return (
    <>
      <PageHead title="Contact" />

      {/* <main className="page-wrapper">
        <Context>
          <HeaderTop />
          <Header
            headerTransparent="header-transparent"
            headerSticky="header-sticky"
            btnClass="rainbow-gradient-btn"
          />
          <PopupMobileMenu />
          <Breadcrumb
            title="Get Started with a free quotation"
            text="Contact"
          />
          <CommingSoon/>
          {/* <Contact /> */}

          {/* <div className="rainbow-cta-area rainbow-section-gap rainbow-section-gapBottom-big"> */}
            {/* <div className="container"> */}
              {/* <CtaTwo /> */}
            {/* </div> */}
          {/* </div> */}

          {/* <BackToTop /> */}
          {/* <Footer /> */}
          {/* <Copyright /> */}
        {/* </Context> */}
      {/* </main> */} 

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

export default ContactPage;
