import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Sal from "sal.js";

import PageHead from "../Head";
import PricingData from "../../data/pricing.json";

import bgShape from "../../public/images/bg/bg-shape-two.png";

import Context from "@/context/Context";
import HeaderTop from "@/components/Header/HeaderTop/HeaderTop";
import Header from "@/components/Header/Header";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import Footer from "@/components/Footers/Footer";
import Copyright from "@/components/Footers/Copyright";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BackToTop from "../backToTop";
import Pricing from "@/components/Pricing/Pricing";
import BrandTwo from "@/components/Brands/Brand-Two";
import Compare from "@/components/Pricing/Compare";
import TestimonialTwo from "@/components/Testimonials/TestimonialTwo";
import AccordionItem from "@/components/Accordion/AccordionItem";
import CtaTwo from "@/components/CallToActions/Cta-Two";
import CommingSoon from "@/components/CommingSoon/CommingSoon";

const PricingPage = () => {
  useEffect(() => {
    Sal();
  }, []);
  return (
    <>
      <PageHead title="Pricing" />

    
    </>
  );
};

export default PricingPage;
