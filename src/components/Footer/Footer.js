import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useTheme } from "../ThemeContext";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay } from "swiper/modules";
import GovernmentLogoSlider from "./GovernmentLogoSlider";

function Footer() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;

  const { lang } = useLanguage();
  const { theme } = useTheme();

  const navigate = useNavigate();

  const [menu, setMenu] = useState();
  const [organization, setOrganization] = useState();

  const getMenu = async (page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/menu/getmenu/web`);

      const activeData = (response?.data?.data || []).filter(
        (item) => item.isActive === true,
      );
      setMenu(activeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // this is use for get slug
  const handlePageClick = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/pages/get/web/${id}`);

      const slug = res?.data?.data?.slug;
      if (slug) {
        navigate(`/${slug} `);
      }
    } catch (error) {
      console.error("Error fetching page slug:", error);
    }
  };

  const getOrganization = async (page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/organization/get/web`);

      setOrganization(response?.data?.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getMenu();
    getOrganization();
  }, []);

  const footerText =
    lang === "hi"
      ? "यह वेबसाइट राष्ट्रीय पादप जैव प्रौद्योगिकी संस्थान, भारतीय कृषि अनुसंधान परिषद की है, जो कृषि अनुसंधान एवं शिक्षा विभाग, कृषि मंत्रालय, भारत सरकार के अधीन एक स्वायत्त संगठन है।"
      : "This website belongs to National Institute for Plant Biotechnology, Indian Council of Agricultural Research, an autonomous organization under the Department of Agricultural Research and Education, Ministry of Agriculture, Government of India";

  const copyrightText =
    lang === "hi"
      ? "© 2025 आईसीएआर-एनआईपीबी। सर्वाधिकार सुरक्षित। | राष्ट्रीय पादप जैव प्रौद्योगिकी संस्थान के लिए डिज़ाइन किया गया"
      : "© 2025 ICAR-NIPB. All rights reserved. | Designed for National Institute of Plant Biotechnology";
  return (
    <div className={`theme-${theme}`}>
      <GovernmentLogoSlider />
      <footer className="footer-section">
        <div className="container position-relative">
          <img
            className="logo-footer-shape"
            src="images/resources/logo_shape.svg"
            alt=""
          />

          <div className="footer-inner position-relative z_index1">
            <div className="row">
              <div className="col-xxl-3 col-xl-4 col-lg-12 col-md-6 about-col position-relative footer-about-col">
                <div className="footer-about">
                  <Link to={"/"}>
                    <img
                      src={`${IMG_BASE_URL}/${organization?.logo1}`}
                      alt={organization?.logo1Title}
                    />
                  </Link>
                  <p className="text-white fs-16">{footerText}</p>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-2 col-lg-3 col-md-6 col-sm-4 importent-links-col">
                <div className="widget-footer-links">
                  <h5 className="widget-title text-white fw-700">
                    {lang === "hi" ? "महत्वपूर्ण लिंक" : "Important Links"}
                  </h5>
                  <ul className="footer-links-list d-flex flex-column gap-3 m-0 p-0">
                    <li>
                      <Link to={"/"}>
                        {lang === "hi" ? "मुख्य पृष्ठ" : "Home"}
                      </Link>
                    </li>
                    <li>
                      <a
                        style={{ cursor: "pointer", color: "#fff" }}
                        onClick={() =>
                          handlePageClick("6a02c787adbccb91e02a14fe")
                        }
                      >
                        {lang === "hi" ? "एनआईपीबी के बारे में" : "About NIPB"}
                      </a>
                    </li>
                    <li>
                      <a style={{ cursor: "pointer", color: "#fff" }} href="#">
                        {lang === "hi" ? "हमारी टीम" : "Our Team"}
                      </a>
                    </li>
                    <li>
                      <a style={{ cursor: "pointer", color: "#fff" }} href="#">
                        {lang === "hi" ? "अनुसंधान" : "Research"}
                      </a>
                    </li>
                    <li>
                      <a style={{ cursor: "pointer", color: "#fff" }} href="#">
                        {lang === "hi" ? "प्रकाशन" : "Publication"}{" "}
                      </a>
                    </li>
                    <li>
                      <a style={{ cursor: "pointer", color: "#fff" }} href="#">
                        {lang === "hi" ? "शैक्षणिक" : "Academics"}
                      </a>
                    </li>
                    <li>
                      <a
                        style={{ cursor: "pointer", color: "#fff" }}
                        onClick={() =>
                          handlePageClick("6a019615b41b02c9e0121bdb")
                        }
                      >
                        {lang === "hi" ? "संपर्क करें" : "Contact Us"}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-2 col-lg-4 col-md-6 col-sm-4 quick-links-col">
                <div className="widget-footer-links">
                  <h5 className="widget-title text-white fw-700">
                    {lang === "hi" ? "त्वरित लिंक" : "Quick Links"}
                  </h5>
                  <ul className="footer-links-list d-flex flex-column gap-3 m-0 p-0 quick-links-groups">
                    {menu
                      ?.filter((item) => item?.menuCategory === "footer")
                      .map((item) => (
                        <li key={item.id}>
                          {item?.page?.id ? (
                            <span
                              style={{ cursor: "pointer", color: "#fff" }}
                              onClick={() => handlePageClick(item?.page?.id)}
                            >
                              {item?.[`menuName_${lang}`]}
                            </span>
                          ) : (
                            <a
                              href={item?.customUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item?.[`menuName_${lang}`]}
                            </a>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-8 contact-col">
                <div className="footer-contact">
                  <h5 className="widget-title text-white fw-700">
                    {lang === "hi" ? "संपर्क करें" : "Contact Us"}
                  </h5>
                  <div className="footer-single-info footer-address">
                    <i className="fas fa-map-marker-alt"></i>
                    <p>
                      {organization?.addressLine1?.[lang]}
                      {organization?.addressLine2?.[lang]}
                    </p>
                  </div>
                  <div className="footer-single-info footer-phone">
                    <i className="fas fa-phone"></i>{" "}
                    <a href={`tel:${organization?.contactNumber}`}>
                      {organization?.contactNumber}
                    </a>
                  </div>
                  <div className="footer-single-info footer-mail">
                    <i className="fas fa-envelope"></i>
                    <a href={`mailto:${organization?.email1}`}>
                      {organization?.email1}
                    </a>
                  </div>
                  <div className="footer-single-info footer-mail">
                    <i className="fas fa-envelope"></i>
                    <a href={`mailto:${organization?.email2}`}>
                      {organization?.email2}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="copyright-area position-relative">
                  <p className="text-white text-center m-0 fs-16">
                    {copyrightText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
