import React, { useEffect } from "react";
import "../../../assets/css/style.css";
import TopBar from "./TopBar";
import Hero from "../components/Hero";
import Clients from "../components/Clients";
import About from "../components/About";
import WhySection from "../components/WhySection";
import Frequently from "../components/Frequently";
import Cta from "../components/Cta";
import Contact from "../components/Contact";
import CopyRight from "../components/CopyRight";
import FooterBar from "../components/FooterBar";
import Subscription from "../components/Subscription";

const Layout = () => {
  useEffect(() => {
    // let preloader = document.querySelector('#preloader');
    // if (preloader) {
    //     window.addEventListener('load', () => {
    //         preloader.remove();
    //     });
    // }

    let backtotop = document.querySelector(".back-to-top");
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add("active");
        } else {
          backtotop.classList.remove("active");
        }
      };
      window.addEventListener("load", toggleBacktotop);
      window.addEventListener("scroll", toggleBacktotop);

      let selectHeader = document.querySelector("#header");
      if (selectHeader) {
        const headerScrolled = () => {
          if (window.scrollY > 100) {
            selectHeader.classList.add("header-scrolled");
          } else {
            selectHeader.classList.remove("header-scrolled");
          }
        };
        window.addEventListener("scroll", headerScrolled);

        return () => {
          window.removeEventListener("load", toggleBacktotop);
          window.removeEventListener("scroll", toggleBacktotop);
          window.removeEventListener("scroll", headerScrolled);
        };
      }
    }
  }, []);

  return (
    <div className="m-0 p-0">
      <header id="header" className="fixed-top ">
        <div className="container">
          <TopBar />
        </div>
      </header>
      <Hero />
      <main id="main">
        <Clients />
        <About />
        <WhySection />
        <Cta />
        <Frequently />
        <Contact />
      </main>

      <footer id="footer">
        <Subscription />
        <FooterBar />
        <CopyRight />
      </footer>
      {/* <div id="preloader"></div> */}
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
};

export default Layout;
