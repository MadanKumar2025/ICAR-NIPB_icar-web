import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function AlumniDetails() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();

  const [apiData, setApiData] = useState(null);
  const [PageData, setPageData] = useState(null);
  const { slug, id } = useParams();

  const getPage = async () => {
    if (!slug) return;

    try {
      const res = await axios.get(`${API_URL}/pages/get/slug/${slug}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      setPageData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getData = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`${API_URL}/${PageData?.apiName}/${id}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      setApiData(res.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPage();
  }, [slug]);

  useEffect(() => {
    if (PageData?.apiName) {
      getData();
    }
  }, [id, PageData?.apiName]);

  return (
    <div className="main-wrapper">
      {/* ================= SEO START ================= */}
      <Helmet>
        <title>{PageData?.pageTitle?.[lang] || "Technical Staff"}</title>

        <meta
          name="description"
          content={PageData?.metaDescription?.[lang] || ""}
        />

        <meta name="keywords" content={PageData?.keyWord?.[lang] || ""} />

        <meta property="og:title" content={PageData?.pageTitle?.[lang]} />
        <meta
          property="og:description"
          content={PageData?.metaDescription?.[lang]}
        />
        <meta
          property="og:image"
          content={`${IMG_BASE_URL}/${PageData?.photo}`}
        />
      </Helmet>
      {/* ================= SEO END ================= */}

      <section
        className="banner-section position-relative"
        style={{
          backgroundImage: `url(${IMG_BASE_URL}/${PageData?.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="banner-title z_index1">
                <h1 className="banner-slider-title fw-500 text-white">
                  {PageData?.pageTitle?.[lang]}
                </h1>
                <ul className="breadcrumb-area m-0 p-0">
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>
                    <i className="fa-solid fa-angle-right"></i>
                  </li>
                  <li className="breadcrumb-title">
                    {PageData?.pageTitle?.[lang]}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="director-section section-padding position-relative overflow-hidden">
        <img
          className="director-details-shape"
          src="images/shape/banner_shape.png"
          alt=""
        />
        <div className="container position-relative">
          <div className="row">
            <div className="col-md-5 col-lg-3 hover-effect">
              <div className="desk-image-area image-effect  position-relative">
                <div className="inner-desk-area">
                  <img 
                  style={{height:"300px",objectFit:"contain"}}
                    src={`${IMG_BASE_URL}/${apiData?.photo}`}
                    alt={apiData?.photoTitle}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-9 mt-4 mt-md-0">
              <div className="desk-content">
                <div className="section-heading">
                  <h2 className="section-title fs-48 fw-600 mb-0">
                    {apiData?.name?.[lang]}
                  </h2>
                </div>
                <div className="director-besic-info">
                  <div className="single-info">
                    {/* <i className="fa-solid fa-envelope fs-18 theme-color"></i> */}
                    {/* <div className="director-single-contact">
                      <a
                        className="mail-box position-relative fs-16"
                        href="mailto:director.nipb@icar.gov.com"
                      >
                      Email : {apiData?.email}
                      </a>
                    </div> */}
                  </div>

                  <div className="education-box">
                    <div className="education-title fw-600 fs-16 theme-color mb-2">
                      Email : {apiData?.email}
                    </div>
                    <div className="education-title fw-600 fs-16 theme-color mb-2">
                      Degree : {apiData?.degree?.[lang]}
                    </div>
                    <div className="education-title fw-600 fs-16 theme-color mb-2">
                      Batch : {apiData?.batch?.[lang]}
                    </div>
                    <div className="education-details">
                      <p className="mb-1 fs-16">
                        {/* <i className="fa-solid fa-mars-stroke-right theme-color fs-16 position-relative"></i> */}
                        <span className="d-flex">
                          {apiData?.facebook && (
                            <a
                              href={apiData?.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="contact-fab-i fs-17 me-4 fw-500">
                                <i className="fab fa-facebook"></i>
                              </span>
                            </a>
                          )}
                          {apiData?.instagram && (
                            <a
                              href={apiData?.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className=" contact-fab-i  fs-17 me-4 fw-500">
                                <i className="fab fa-instagram"></i>
                              </span>
                            </a>
                          )}
                          {apiData?.youtube && (
                            <a
                              href={apiData?.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="contact-fab-i  fs-17 me-4 fw-500">
                                <i className="fab fa-youtube"></i>
                              </span>
                            </a>
                          )}
                          {apiData?.linkedin && (
                            <a
                              href={apiData?.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="contact-fab-i  fs-17 me-4 fw-500">
                                <i className="fab fa-linkedin"></i>
                              </span>
                            </a>
                          )}
                          {apiData?.twitter && (
                            <a
                              href={apiData?.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="contact-fab-i  fs-17 me-4 fw-500">
                                <i className="fab fa-twitter"></i>
                              </span>
                            </a>
                          )}
                          {apiData?.profileLink && (
                            <a
                              href={apiData?.profileLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="contact-fab-i  fs-17 me-4 fw-500">
                                <i className="fas fa-link"></i>
                              </span>
                            </a>
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlumniDetails;
