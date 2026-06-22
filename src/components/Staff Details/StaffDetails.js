"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function StaffDetails() {
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
      const res = await axios.get(`${API_URL}/staff/get/web/byID/${id}`, {
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

  // Add const tab
  const [activeTab, setActiveTab] = useState("customTap1");

  useEffect(() => {
    getPage();
  }, [slug]);

  useEffect(() => {
    getData();
  }, [id]);

  // console.log("apiData", apiData);

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

      <div className="director-section section-padding body-shape position-relative overflow-hidden">
        <div className="container position-relative">
          <div className="director-details-area">
            <div className="director-inner-area">
              <div className="row">
                <div className="col-md-5 col-lg-3 hover-effect">
                  <div className="desk-image-area image-effect  position-relative">
                    <div className="inner-desk-area">
                      <img
                        src={`${IMG_BASE_URL}/${apiData?.photo}`}
                        alt={apiData?.photoTitle}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-lg-9 mt-4 mt-md-0">
                  <div className="desk-content m-0">
                    <div className="section-heading mb-3">
                      <h2 className="section-title fs-48 fw-600 mb-0">
                        {apiData?.staffName?.[lang]}
                      </h2>
                    </div>
                    <div className="director-besic-info">
                      {apiData?.email && (
                        <div className="single-info">
                          <i className="fa-solid fa-envelope fs-18 theme-color"></i>
                          <div className="director-single-contact">
                            {apiData?.email && (
                              <a
                                className="mail-box position-relative fs-16"
                                href="mailto:director.nipb@icar.gov.com"
                              >
                                {apiData?.email}
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {apiData?.phone && (
                        <div className="single-info">
                          <i className="fa-solid fa-phone fs-18 theme-color"></i>
                          <div className="director-single-contact">
                            <a className="fs-16" href="tel:9868357986">
                              {apiData?.phone}
                            </a>
                          </div>
                        </div>
                      )}

                      {apiData?.education?.[lang] && (
                        <div className="education-box">
                          <div className="education-title fw-600 fs-16 theme-color mb-2">
                            Education :
                          </div>
                          <div className="education-details">
                            <p className="mb-1 fs-16">
                              <i className="fa-solid fa-mars-stroke-right theme-color fs-16 position-relative"></i>
                              <span>{apiData?.education?.[lang]}</span>
                            </p>
                          </div>
                        </div>
                      )}
                      {apiData?.department?.[lang] && (
                        <div className="education-box d-flex">
                          <div className="education-title fw-600 fs-16 theme-color mb-2">
                            Department :
                          </div>

                          <p className="mb-1 fs-16">
                            <span>{apiData?.department?.[lang]}</span>
                          </p>
                        </div>
                      )}
                      {apiData?.designation?.[lang] && (
                        <div className="education-box d-flex">
                          <div className="education-title fw-600 fs-16 theme-color mb-2">
                            Designation :
                          </div>

                          <p className="mb-1 fs-16">
                            <span>{apiData?.designation?.[lang]}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="research-area-section section-padding pt-4">
        <div className="container">
          <div className="row">
            <div className="col-12 mt-3">
              <div className="section-heading">
                {/* <h2 className="section-title fs-30 fw-600 mb-2">Publications </h2> */}
              </div>
              <div className="common-content-area research-column tab-wrapper bg-white p-0 border-0">
                <div className="theme-tab-panel">
                  <div className="taps theme-tabs">
                    {apiData?.Research?.[lang] && (
                      <button
                        className={`tab-btn-title ${activeTab === "customTap1" ? "active" : ""}`}
                        onClick={() => setActiveTab("customTap1")}
                      >
                        <span>
                          {lang === "hi"
                            ? "सौंपे गए दायित्व एवं कार्यग्रहण तिथि"
                            : "Duties Assigned and Date of Joining"}
                        </span>
                      </button>
                    )}
                    {apiData?.Publications?.[lang] && (
                      <button
                        className={`tab-btn-title ${activeTab === "customTap2" ? "active" : ""}`}
                        onClick={() => setActiveTab("customTap2")}
                      >
                        <span>
                          {lang === "hi" ? "प्रकाशन" : "Publications"}
                        </span>
                      </button>
                    )}
                    {/* {apiData?.Research?.[lang] && (
                      <button
                        className={`tab-btn-title ${activeTab === "customTap3" ? "active" : ""}`}
                        onClick={() => setActiveTab("customTap3")}
                      >
                        <span>
                          {lang === "hi"
                            ? "सौंपे गए दायित्व एवं कार्यग्रहण तिथि"
                            : "Duties Assigned and Date of Joining"}
                        </span>
                      </button>
                    )} */}
                    {apiData?.Awards?.[lang] && (
                      <button
                        className={`tab-btn-title ${activeTab === "customTap4" ? "active" : ""}`}
                        onClick={() => setActiveTab("customTap4")}
                      >
                        <span>
                          {lang === "hi"
                            ? "पुरस्कार एवं सम्मान"
                            : "Awards & Honors"}
                        </span>
                      </button>
                    )}

                    {apiData?.IPR?.length > 1 && (
                      <button
                        className={`tab-btn-title ${activeTab === "customTap5" ? "active" : ""}`}
                        onClick={() => setActiveTab("customTap5")}
                      >
                        <span>
                          {lang === "hi" ? "बौद्धिक संपदा अधिकार" : "IPR"}
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="tab-content p-3">
                    {activeTab === "customTap1" && (
                      <div className="tabs-content">
                        {apiData?.Research?.[lang] && (
                          <div className="publications-column">
                            <h5 className="box-type-title fs-24 fw-600 theme-color">
                              {lang === "hi"
                                ? "सौंपे गए दायित्व एवं कार्यग्रहण तिथि"
                                : "Duties Assigned and Date of Joining"}
                            </h5>
                            <div className="publications-info-box">
                              <p
                                className="fs-16"
                                dangerouslySetInnerHTML={{
                                  __html: apiData?.Research?.[lang],
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {activeTab === "customTap2" && (
                      <div className="tabs-content">
                        {apiData?.Publications?.[lang] && (
                          <div className="publications-column">
                            <h5 className="box-type-title fs-24 fw-600 theme-color">
                              {lang === "hi" ? "प्रकाशन" : "Publications"}
                            </h5>
                            <div className="publications-info-box">
                              <p
                                className="fs-16"
                                dangerouslySetInnerHTML={{
                                  __html: apiData?.Publications?.[lang],
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "customTap4" && (
                      <div className="tabs-content">
                        {/* Add your Awards & Honors deta */}{" "}
                        {apiData?.Awards?.[lang] && (
                          <div className="publications-column">
                            <h5 className="box-type-title fs-24 fw-600 theme-color">
                              {lang === "hi"
                                ? "पुरस्कार एवं सम्मान"
                                : "Awards & Honors"}
                            </h5>
                            <div className="publications-info-box">
                              {apiData?.Awards?.map((item, index) => (
                                <p key={index}>{item?.[lang]}</p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {activeTab === "customTap5" && (
                      <div className="tabs-content">
                        {/* Add your IPR deta */}
                        {apiData?.IPR?.length > 1 && (
                          <div className="publications-column">
                            <h5 className="box-type-title fs-24 fw-600 theme-color">
                              {lang === "hi" ? "बौद्धिक संपदा अधिकार" : "IPR"}
                            </h5>
                            <div className="publications-info-box">
                              {apiData?.IPR?.map((item, index) => (
                                <p key={index}>{item?.[lang]}</p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* this is use for html test editer  */}
                {/* {apiData?.IPR?.[lang] && (
                  <div className="publications-column">
                    <h5 className="box-type-title fs-24 fw-600 theme-color">
                      IPR
                    </h5>
                    <div className="publications-info-box">
                      <p
                        className="fs-16"
                        dangerouslySetInnerHTML={{
                          __html: apiData?.IPR?.[lang],
                        }}
                      />
                    </div>
                  </div>
                )} */}

                {apiData?.IPR.length > 1 && (
                  <div className="publications-column">
                    <h5 className="box-type-title fs-24 fw-600 theme-color">
                      IPR
                    </h5>
                    {apiData?.IPR?.map((item, index) => {
                      if (item?.en) {
                        return (
                          <div className="publications-info-box">
                            <p
                              className="fs-16"
                              dangerouslySetInnerHTML={{
                                __html: item?.[lang],
                              }}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                )}

                {apiData?.Awards.length > 1 && (
                  <div className="publications-column">
                    <h5 className="box-type-title fs-24 fw-600 theme-color">
                      Awards
                    </h5>
                    {apiData?.Awards?.map((item, index) => {
                      if (item?.en) {
                        return (
                          <div className="publications-info-box">
                            <p
                              className="fs-16"
                              dangerouslySetInnerHTML={{
                                __html: item?.[lang],
                              }}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StaffDetails;
