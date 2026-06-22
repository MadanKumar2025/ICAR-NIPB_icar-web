import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function Professor() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();

  const [apiData, setApiData] = useState(null);
  const [PageData, setPageData] = useState(null);
  const { slug } = useParams();

  // Fetch page info
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

  // Fetch API data based on page's apiName
  const getData = async (apiName) => {
    try {
      // const res = await axios.get(`${API_URL}/DirectorRoutes/get/web`, {
      const res = await axios.get(`${API_URL}/${apiName}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      setApiData(res.data?.data?.[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPage();
  }, [slug]);

  useEffect(() => {
    if (PageData?.apiName) {
      getData(PageData?.apiName);
    }
  }, [PageData]);

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

      <div className="director-section section-padding body-shape ">
        <div className="container">
          {/* <div className="desk-header">
            <div className="row">
              <div className="col-lg-5 col-md-6">
                <div className="section-heading m-0">
                  <h2 className="section-title fs-40 fw-600 m-0">
                    From the Desk of <span className="text-gradient">Director</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-7 col-md-6">
                <div className="chairmain-hih-light position-relative">
                  <p className="fs-20 fw-600 m-0">
                    Committed to innovation and academic excellence
                  </p>
                </div>
              </div> 
            </div>
          </div> */}
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
              <div className="desk-content">
                <div class="section-heading current-dirctor-heading">
                  <h2 class="section-title fs-48 fw-600 mb-0">
                    {" "}
                    {apiData?.name?.[lang]}
                  </h2>
                  <p class="director-text fs-20 fw-600 theme-color">
                    {lang === "hi" ? "प्रोफेसर" : "Professor"}
                  </p>
                </div>
                <div className="director-contact">
                  <div className="director-contact-title fs-16 fw-600">
                    {lang === "hi" ? "ईमेल आईडी" : "Email Id"}:
                  </div>
                  <p>
                    {apiData?.email1} , {apiData?.email2}
                  </p>
                  {/* <p> {apiData?.email2}</p> */}
                </div>
                {apiData?.workingPeriod && (
                  <div className="director-contact">
                    <div className="director-contact-title fs-16 fw-600">
                      {lang === "hi" ? "कार्य अवधि" : "working Period"}:
                    </div>
                    <p>{apiData?.workingPeriod}</p>
                  </div>
                )}
                {apiData?.phone && (
                  <div className="director-contact">
                    <div className="director-contact-title fs-16 fw-600">
                      {lang === "hi" ? "फ़ोन" : "Phone"} :
                    </div>
                    <p>{apiData?.phone}</p>
                  </div>
                )}
                {apiData?.education?.en && (
                  <div className="director-contact">
                    <div className="director-contact-title fs-16 fw-600">
                      {lang === "hi" ? "शिक्षा" : "Education"} :
                    </div>
                    <p>{apiData?.education?.[lang]}</p>
                  </div>
                )}
                {apiData?.message?.en && (
                  <div className="desk-about-content">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: apiData?.message?.[lang],
                      }}
                    ></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Professor;
