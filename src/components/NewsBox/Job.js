import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function Job() {
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

  const getData = async () => {
    try {
      const res = await axios.get(`${API_URL}/news/get/web`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      // setApiData(res.data?.data || []);

      const activeData = (res.data?.data || []).filter(
        (item) => item.isActive === true && item.type === "Job",
      );

      setApiData(activeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPage();
  }, [slug]);

  useEffect(() => {
    getData();
  }, []);

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

      <section className="institution-section section-padding">
        <div className="container">
          <div className="row row-gap">
            <div className="col-12">
              <div className="collaborations-grid common-space">
                {apiData?.map((item, index) => {
                  return (
                    <div key={index} className="single-collaborations-card">
                      <div className="list-details">
                        <div className="sr-number">
                          <i className="fa-solid fa-circle-check fs-22"></i>
                          {/* <span className="card-number fs-16 fw-600">
                            <span className="position-relative">
                              {index + 1}
                            </span>
                          </span> */}
                        </div>
                        <p className="title-name m-0 fw-600 fs-16 slow-effect">
                          {item?.title?.[lang]}
                        </p>
                        <a
                          target="_blank"
                          className="view-btn"
                          href={item?.link}
                        >
                          View Details
                          <i className="fa-solid fa-angle-right"></i>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Job;
