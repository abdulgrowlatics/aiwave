import React from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import TermsPolicy from "@/components/TermsPolicy/TermsPolicy";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import LeftDashboardSidebar from "@/components/Header/LeftDashboardSidebar";
import CommingSoon from "@/components/CommingSoon/CommingSoon";

const TermsPolicyPage = () => {
  return (
    <>
      <PageHead title="Terms and Policy" />

      <main className="page-wrapper rbt-dashboard-page bg-dark">
        <Context>
          <div className="rbt-panel-wrapper">
            <HeaderDashboard display="d-none" />
            <PopupMobileMenu />
            <LeftDashboardSidebar />

            {/* <TermsPolicy /> */}
            <CommingSoon />
          </div>
        </Context>
      </main>
    </>
  );
};

export default TermsPolicyPage;
