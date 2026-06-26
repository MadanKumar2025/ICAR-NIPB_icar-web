"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function ScientistDetails() {
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
      const res = await axios.get(`${API_URL}/ScientistRoutes/get/web/${id}`, {
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
  const [activeTab, setActiveTab] = useState("customTap2");

  useEffect(() => {
    getPage();
  }, [slug]);

  useEffect(() => {
    getData();
  }, [id]);

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
                        {apiData?.scientistName?.[lang]}
                      </h2>
                    </div>
                    <div className="director-besic-info">
                      {(apiData?.email1 || apiData?.email2) && (
                        <div className="single-info">
                          <i className="fa-solid fa-envelope fs-18 theme-color"></i>
                          <div className="director-single-contact">
                            {apiData?.email1 && (
                              <a
                                className="mail-box position-relative fs-16"
                                href="mailto:director.nipb@icar.gov.com"
                              >
                                {apiData?.email1}
                              </a>
                            )}
                            {apiData?.email2 && (
                              <a
                                className="mail-box position-relative fs-16"
                                href="mainto:director.nipb@gmail.com"
                              >
                                {apiData?.email2}
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {(apiData?.phone1 || apiData?.phone1) && (
                        <div className="single-info">
                          <i className="fa-solid fa-phone fs-18 theme-color"></i>
                          <div className="director-single-contact">
                            <a className="fs-16" href="tel:9868357986">
                              {apiData?.phone1}
                              {apiData?.phone2 && <>&</>}
                              {apiData?.phone2}
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
                              {/* <i className="fa-solid fa-mars-stroke-right theme-color fs-16 position-relative"></i> */}
                              <span>{apiData?.education?.[lang]}</span>
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="tabs-content">
                        {apiData?.researchInterest?.[lang] && (
                          <div className="publications-column">
                            <div className="education-title fw-600 fs-16 theme-color mb-2">
                              {lang === "hi"
                                ? "अनुसंधान क्षेत्र :"
                                : " Research Area : "}
                            </div>
                            <div className="publications-info-box">
                              <p
                                className="fs-16"
                                dangerouslySetInnerHTML={{
                                  __html: apiData?.researchInterest?.[lang],
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      {apiData?.designation?.name?.[lang] && (
                        <div className="education-box d-flex">
                          <div className="education-title fw-600 fs-16 theme-color mb-2">
                            Designation :
                          </div>
                          <div className="education-details">
                            <p className="mb-1 fs-16">
                              <span>{apiData?.designation?.name?.[lang]}</span>
                            </p>
                          </div>
                        </div>
                      )}
                      {apiData?.majorCourses?.[lang] && (
                        <div className="education-box ">
                          <div className="education-title fw-600 fs-16 theme-color mb-2">
                            Major Courses :
                          </div>
                          <div className="education-details">
                            <p className="mb-1 fs-16">
                              <span>{apiData?.majorCourses?.[lang]}</span>
                            </p>
                          </div>
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
              <div className="common-content-area research-column tab-wrapper bg-white p-0 border-0">
                <div className="theme-tab-panel">
                  <div className="taps theme-tabs">
                    {/* {apiData?.researchInterest?.[lang] && (
                      <button
                        className={`tab-btn-title ${activeTab === "customTap1" ? "active" : ""}`}
                        onClick={() => setActiveTab("customTap1")}
                      >
                        <span>
                          {lang === "hi" ? "शोध रुचि" : "Research Interest"}
                        </span>
                      </button>
                    )} */}

                    {apiData?.publications?.[lang] && (
                      <button
                        className={`tab-btn-title ${activeTab === "customTap2" ? "active" : ""}`}
                        onClick={() => setActiveTab("customTap2")}
                      >
                        <span>
                          {lang === "hi" ? "प्रकाशन" : "Publications"}
                        </span>
                      </button>
                    )}

                    {apiData?.IPR?.[lang] && (
                      <button
                        className={`tab-btn-title ${activeTab === "customTap3" ? "active" : ""}`}
                        onClick={() => setActiveTab("customTap3")}
                      >
                        <span>
                          {lang === "hi" ? "बौद्धिक संपदा अधिकार" : "IPR"}
                        </span>
                      </button>
                    )}
                    {apiData?.awards?.[lang] && (
                      <button
                        className={`tab-btn-title ${activeTab === "customTap4" ? "active" : ""}`}
                        onClick={() => setActiveTab("customTap4")}
                      >
                        <span>{lang === "hi" ? "पुरस्कार" : "Awards"}</span>
                      </button>
                    )}
                    {apiData?.externallyFundedProjects?.[lang] && (
                      <button
                        className={`tab-btn-title ${activeTab === "customTap5" ? "active" : ""}`}
                        onClick={() => setActiveTab("customTap5")}
                      >
                        <span>
                          {lang === "hi"
                            ? "बाह्य वित्तपोषित परियोजनाएँ"
                            : "Externally Funded Projects"}
                        </span>
                      </button>
                    )}
                    {apiData?.labProfile.length > 1 && (
                      <button
                        className={`tab-btn-title ${activeTab === "customTap6" ? "active" : ""}`}
                        onClick={() => setActiveTab("customTap6")}
                      >
                        <span>
                          {lang === "hi"
                            ? "सौंपे गए कर्तव्य एवं कार्यग्रहण तिथि"
                            : "   Lab Profile and lab photo"}
                        </span>
                      </button>
                    )}
                    {/* <button
                      className={`tab-btn-title ${activeTab === "customTap7" ? "active" : ""}`}
                      onClick={() => setActiveTab("customTap7")}
                    >
                      <span>
                        {lang === "hi"
                          ? "सौंपे गए कर्तव्य एवं कार्यग्रहण तिथि"
                          : "Duties Assigned and Date of Joining"}
                      </span>
                    </button> */}
                  </div>
                  <div className="tab-content p-3">
                    {activeTab === "customTap1" && (
                      <div className="tabs-content">
                        {apiData?.researchInterest?.[lang] && (
                          <div className="publications-column">
                            <span>
                              {lang === "hi"
                                ? "अनुसंधान क्षेत्र"
                                : " Research Area"}
                            </span>
                            <div className="publications-info-box">
                              <p
                                className="fs-16"
                                dangerouslySetInnerHTML={{
                                  __html: apiData?.researchInterest?.[lang],
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "customTap2" && (
                      <div className="tabs-content">
                        {apiData?.publications?.[lang] && (
                          <div className="publications-column">
                            <h5 className="box-type-title fs-24 fw-600 theme-color">
                              {lang === "hi" ? "प्रकाशन" : "Publications"}
                            </h5>
                            <div className="publications-info-box">
                              <p
                                className="fs-16"
                                dangerouslySetInnerHTML={{
                                  __html: apiData?.publications?.[lang],
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "customTap3" && (
                      <div className="tabs-content">
                        {apiData?.IPR?.[lang] && (
                          <div className="publications-column">
                            <h5 className="box-type-title fs-24 fw-600 theme-color">
                              {lang === "hi" ? "बौद्धिक संपदा अधिकार" : "IPR"}
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
                        )}
                      </div>
                    )}
                    {activeTab === "customTap4" && (
                      <div className="tabs-content">
                        {apiData?.awards?.[lang] && (
                          <div className="publications-column">
                            <h5 className="box-type-title fs-24 fw-600 theme-color">
                              {lang === "hi" ? "पुरस्कार" : "Awards"}
                            </h5>
                            <div className="publications-info-box">
                              <p
                                className="fs-16"
                                dangerouslySetInnerHTML={{
                                  __html: apiData?.awards?.[lang],
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {activeTab === "customTap5" && (
                      <div className="tabs-content">
                        {apiData?.externallyFundedProjects?.[lang] && (
                          <div className="publications-column">
                            <h5 className="box-type-title fs-24 fw-600 theme-color">
                              {lang === "hi"
                                ? "बाह्य वित्तपोषित परियोजनाएँ"
                                : "Externally Funded Projects "}
                            </h5>
                            <div className="publications-info-box">
                              <p
                                className="fs-16"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    apiData?.externallyFundedProjects?.[lang],
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {activeTab === "customTap6" && (
                      <div className="tabs-content">
                        {apiData?.labProfile.length > 1 && (
                          <div className="lab-table">
                            <div className="table-listing table-responsive">
                              <table className="table mb-0">
                                <thead className="table-thead">
                                  <tr>
                                    <th
                                      className="table-title fw-600 fs-20"
                                      scope="col"
                                    >
                                      {lang === "hi"
                                        ? "क्रम संख्या"
                                        : " Sr. No."}
                                    </th>
                                    <th
                                      className="table-title fw-600 fs-20"
                                      scope="col"
                                    >
                                      {lang === "hi" ? "नाम" : "Name"}
                                    </th>
                                    <th
                                      className="table-title fw-600 fs-20"
                                      scope="col"
                                    >
                                      {lang === "hi" ? "पद" : "Position"}
                                    </th>
                                    <th
                                      className="table-title fw-600 fs-20"
                                      scope="col"
                                    >
                                      {lang === "hi" ? "अवधि" : "Duration"}
                                    </th>
                                    <th
                                      className="table-title fw-600 fs-20"
                                      scope="col"
                                    >
                                      {lang === "hi" ? "परियोजना" : "Project"}
                                    </th>
                                    <th
                                      className="table-title fw-600 fs-20"
                                      scope="col"
                                    >
                                      {lang === "hi" ? "फोटो" : "Photo"}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="table-body">
                                  {apiData?.labProfile?.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <th scope="row" className="w-10">
                                          {index + 1}
                                        </th>
                                        <td className="w-18 text-wrap">
                                          {item?.name?.[lang]}
                                        </td>
                                        <td className="w-18 text-wrap">
                                          {item?.position?.[lang]}
                                        </td>
                                        <td className="w-18 text-wrap">
                                          {item?.duration?.[lang]}
                                        </td>
                                        <td className="w-18 text-wrap">
                                          {item?.project?.[lang]}
                                        </td>

                                        <td className="w-18 ">
                                          {item?.photo1 && (
                                            <img
                                              className="table-lab-photo"
                                              src={`${IMG_BASE_URL}/${item?.photo1}`}
                                              alt={item?.ImageTitle}
                                              width={100}
                                              height={100}
                                            />
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {/* Add your Duties Assigned and Date of Joining deta */}
                    {/* {activeTab === "customTap6" && (
                      <div className="tabs-content">
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ScientistDetails;
