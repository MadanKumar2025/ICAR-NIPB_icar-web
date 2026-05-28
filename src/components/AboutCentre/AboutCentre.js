import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function AboutCentre() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();

  const [apiData, setApiData] = useState(null);
  const [PageData, setPageData] = useState(null);
  const { slug } = useParams();

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

  const getData = async (apiName) => {
    try {
      const res = await axios.get(`${API_URL}/${apiName}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      // setApiData(res.data?.data || []);
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
  }, [PageData?.apiName]);

  console.log("apiData", apiData);

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
      <section class="home-about-section section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="about-content">
                <div class="section-heading">
                  <h2
                    class="section-title fs-30 fw-600"
                    dangerouslySetInnerHTML={{
                      __html: apiData?.topSection?.[lang],
                    }}
                  />
                </div>
              </div>
            </div>
            <div class="col-lg-4 mt-4 mt-lg-0">
              <div class="about-page-image position-relative">
                <div class="about-single-image hover-effect position-relative">
                  <div class="inner-about-image image-effect">
                    <img
                      class="img-fluid w-100 slow-effect"
                      src={`${IMG_BASE_URL}/${apiData?.topImage}`}
                      // alt={apiData?.data[0]?.photoTitle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-5 row-gap">
            <div class="col-md-4">
              <div class="about-info-box overflow-hidden">
                <div class="info-content">
                  <div
                    class="m-0 fs-16"
                    dangerouslySetInnerHTML={{
                      __html: apiData?.MediyamSection1?.[lang],
                    }}
                  />
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="about-info-box overflow-hidden active-box">
                <div class="info-content">
                  <div
                    class="m-0 fs-16"
                    dangerouslySetInnerHTML={{
                      __html: apiData?.MediyamSection2?.[lang],
                    }}
                  />
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="about-info-box overflow-hidden">
                <div class="info-content">
                  <div
                    class="m-0 fs-16"
                    dangerouslySetInnerHTML={{
                      __html: apiData?.MediyamSection3?.[lang],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="fruits-section section-padding position-relative">
        {/* <!-- <img class="fruits-image-big d-none d-lg-block" src="assets/images/resources/research_publications.jpg" alt=""> --> */}
        <div class="bg-shape"></div>
        <div class="container position-relative z_index1">
          <div class="row">
            <div class="col-lg-12">
              <div class="fruits-area">
                <div class="single-image">
                  <img src="images/icons/fruits1.png" alt="" />
                </div>
                <div class="single-image">
                  <img src="images/icons/fruits2.png" alt="" />
                </div>
                <div class="single-image">
                  <img src="images/icons/fruits3.png" alt="" />
                </div>
                <div class="single-image">
                  <img src="images/icons/fruits4.png" alt="" />
                </div>
                <div class="single-image">
                  <img src="images/icons/fruits5.png" alt="" />
                </div>
              </div>
              <div class="content-area new_Box1  ">
                <p
                  class="m-0  "
                  dangerouslySetInnerHTML={{
                    __html: apiData?.BotemSection?.[lang],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutCentre;
