import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useTheme } from "../ThemeContext";

import "swiper/css";
import "swiper/css/autoplay";

import GovernmentLogoSlider from "./GovernmentLogoSlider";

function Footer() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;

  const { lang } = useLanguage();
  const { theme } = useTheme();

  const navigate = useNavigate();

  const [menu, setMenu] = useState();
  const [organization, setOrganization] = useState();
  const [visitor, setVisitor] = useState();

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

  const getVisitor = async (page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/organization/Visitor`);
      // console.log("response getVisitor", response?.data?.data);
      setVisitor(response?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateVisitor = async () => {
  try {
    await axios.post(`${API_URL}/organization/Update/Visitor`);
  } catch (error) {
    console.error("Error updating visitor:", error);
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
    getVisitor();
    updateVisitor()
  }, []);

  const footerText =
    lang === "hi"
      ? "यह वेबसाइट राष्ट्रीय पादप जैव प्रौद्योगिकी संस्थान, भारतीय कृषि अनुसंधान परिषद की है, जो कृषि अनुसंधान एवं शिक्षा विभाग, कृषि मंत्रालय, भारत सरकार के अधीन एक स्वायत्त संगठन है।"
      : "This website belongs to National Institute for Plant Biotechnology, Indian Council of Agricultural Research, an autonomous organization under the Department of Agricultural Research and Education, Ministry of Agriculture, Government of India";

  const copyrightText =
    lang === "hi"
      ? "© 2025 आईसीएआर-एनआईपीबी। सर्वाधिकार सुरक्षित। | राष्ट्रीय पादप जैव प्रौद्योगिकी संस्थान के लिए डिज़ाइन किया गया"
      : "© 2025 ICAR-NIPB. All rights reserved. | Designed for National Institute of Plant Biotechnology";

  const parents = menu?.filter(
    (item) => item.menuCategory === "footer" && item.menuType === "parent",
  );

  const children = menu?.filter((item) => item.menuType === "child");
  console.log("visitor", visitor);

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
              <div className="col-xxl-3 col-xl-3 col-lg-12 col-md-6 about-col position-relative footer-about-col">
                <div className="footer-about">
                  <Link to={"/"}>
                    <img
                      src={`${IMG_BASE_URL}/${organization?.logo1}`}
                      alt={organization?.logo1Title}
                    />
                  </Link>
                  <p className="text-white fs-16">{footerText}</p>
                </div>
                <h5 className="visitor-heading text-white mt-4 pt-2">
                  Visitor Count
                </h5>
                <div class="visitor-count">
                  {/* <span>0</span>
                  <span>0</span>
                  <span>0</span>
                  <span>1</span>
                  <span>4</span>
                  <span>7</span>
                  <span>1</span> */}
                  <div className="visitor-count">
                    {visitor?.totalViews
                      ?.toString()
                      .padStart(7, "0")
                      .split("")
                      .map((digit, index) => (
                        <span key={index}>{digit}</span>
                      ))}
                  </div>
                </div>
              </div>

              {parents?.map((parent) => {
                const childItems = children?.filter(
                  (child) => child.parentMenu?.id === parent.id,
                );
                //  Agar child nahi hai

                if (
                  !childItems ||
                  (childItems.length === 0 &&
                    parent?.menuName_en !== "Contact Us")
                ) {
                  return (
                    <div
                      className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-sm-8 contact-col"
                      key={parent?.id}
                    >
                      <div className="footer-contact">
                        {parent?.page?.id ? (
                          <h5
                            className="widget-title text-white fw-700"
                            style={{ cursor: "pointer" }}
                            onClick={() => handlePageClick(parent?.page?.id)}
                          >
                            {/* {parent?.menuName_en?.toUpperCase()} */}
                            {parent?.[`menuName_${lang}`]?.toUpperCase()}
                          </h5>
                        ) : (
                          <a
                            href={parent?.customUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="widget-title text-white fw-700"
                          >
                            {/* {parent?.menuName_en?.toUpperCase()} */}
                            {parent?.[`menuName_${lang}`]?.toUpperCase()}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                }

                // Agar child hai
                return (
                  <div
                    className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 footer-links"
                    key={parent.id}
                  >
                    <div className="widget-footer-links">
                      <a
                        className="widget-title text-white fw-700"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {/* {parent?.menuName_en?.toUpperCase()} */}
                        {parent?.[`menuName_${lang}`]?.toUpperCase()}
                      </a>

                      <ul className="footer-links-list d-flex flex-column gap-3 m-0 p-0">
                        {childItems.map((child) => (
                          <li key={child.id}>
                            {child.page?.id ? (
                              <span
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                onClick={() => handlePageClick(child?.page?.id)}
                              >
                                {/* {child?.menuName_en?.toUpperCase()} */}
                                {child?.[`menuName_${lang}`]?.toUpperCase()}
                              </span>
                            ) : (
                              <a
                                href={child?.customUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {/* {child?.menuName_en?.toUpperCase()} */}
                                {child?.[`menuName_${lang}`]?.toUpperCase()}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}

              {/* </div>
              </div> */}
              {/* <div className="col-xxl-3 col-xl-2 col-lg-4 col-md-6 col-sm-4 quick-links-col">
                <div className="widget-footer-links">
                  <h5 className="widget-title text-white fw-700">
                    {lang === "hi" ? "त्वरित लिंक" : "Quick Links"}
                  </h5>
                  <ul className="footer-links-list d-flex flex-column gap-3 m-0 p-0 quick-links-groups">
                    {menu
                      // ?.filter((item) => {
                      //     console.log("Footer Item:", item);
                      //     item?.menuCategory === "footer";
                      //   })
                      ?.filter((item) => {
                        // console.log("Footer Item:", item);
                        return item?.menuCategory === "footer";
                      })
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
              </div> */}
              <div className="col-xxl-3 col-xl-3 contact-col">
                <div className="footer-contact">
                  <div className="footer-contact-details">
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
                  {organization?.googleMapLink && (
                    <iframe
                      src={organization.googleMapLink}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Google Map"
                    ></iframe>
                  )}
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
