import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";
import parse from "html-react-parser";

function Collaborations() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();

  const [apiData, setApiData] = useState(null);
  const [apiDataDetails, setApiDataDetails] = useState(null);
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
      //   console.log("res.data?.data", res.data?.data);

      const activeData = (res.data?.data || []).filter(
        (item) => item.isActive === true,
      );
      setApiData(activeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getDataDetails = async (id) => {
    try {
      const res = await axios.get(
        `${API_URL}/CollaborationsDetailsRoutes/get/web`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        },
      );
      //   console.log("res.data?.data", res.data?.data);

      const activeData = (res.data?.data || []).filter(
        (item) => item.isActive === true,
      );
      setApiDataDetails(activeData);
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
    getDataDetails();
  }, [PageData?.apiName]);

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

      <section className="institution-section body-shape section-padding">
        <div className="container">
          <div className="row row-gap">
            {apiData?.map((item, index) => {
              // Get all matching details from apiDataDetails
              const matchedDetails = apiDataDetails?.filter(
                (detail) => detail?.CollaborationsId === item?.id,
              );
              return (
                <div key={index} className="col-12">
                  <div className="section-heading">
                    <h2 className="section-title fs-48 fw-600 m-0">
                      {item?.title?.[lang]}
                    </h2>
                  </div>

                  <div className="collaborations-grid common-space">
                    {matchedDetails?.map((detail, i) => (
                      <div key={i} className="single-collaborations-card">
                        <div className="list-details">
                          <div className="sr-number">
                            <i className="fa-solid fa-circle-check fs-22"></i>
                          </div>
                          <div className="title-name m-0 fw-600 fs-16 slow-effect">
                            {detail?.subTitle?.[lang] || "No Title"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* {apiData?.map((item, index) => {
              const matchedDetail = apiDataDetails.find(
                (detail) => detail.CollaborationsId === item?.id,
              );
              {
                console.log("matchedDetail", matchedDetail);
              }
              return (
                <div key={index} className="col-12">
                  <div class="section-heading">
                    <h2 class="section-title fs-48 fw-600 m-0">
                      {item?.title?.[lang]}
                    </h2>
                  </div>
                  <div className="collaborations-grid common-space">
                    <div key={index} className="single-collaborations-card">
                      <div className="list-details">
                        <div className="sr-number">
                          <i className="fa-solid fa-circle-check fs-22"></i>
                        </div>
                        <div className="title-name m-0 fw-600 fs-16 slow-effect">
                          {matchedDetail?.subTitle?.[lang]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Collaborations;
