import React from "react";
import Context from "@/context/Context";

import PageHead from "../Head";

import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import BackToTop from "../backToTop";
import LeftDashboardSidebar from "@/components/Header/LeftDashboardSidebar";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import RightDashboardSidebar from "@/components/Header/RightDashboardSidebar";
import Modal from "@/components/Common/Modal";
import StaticbarDashboard from "@/components/Common/StaticBarDashboard";
import ImageEditor from "@/components/ImageEditor/ImageEditor";
import CommingSoon from "@/components/CommingSoon/CommingSoon";

const ImageEditorPage = () => {
  return (
    <>
      <PageHead title="Image Editor" />

      <main className="page-wrapper rbt-dashboard-page bg-dark">
        <div className="rbt-panel-wrapper">
          <Context>
            <LeftDashboardSidebar />
            <HeaderDashboard display="" />
            <RightDashboardSidebar />
            <Modal />
            <PopupMobileMenu />

            <div className="rbt-main-content">
              <div className="rbt-daynamic-page-content">
                <div className="rbt-dashboard-content">
                  <div className="content-page">
                    <div className="chat-box-section">
                      <CommingSoon />
                      {/* <ImageEditor /> */}
                      {/* <StaticbarDashboard /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <BackToTop />
          </Context>
        </div>
      </main>
    </>
  );
};

export default ImageEditorPage;
