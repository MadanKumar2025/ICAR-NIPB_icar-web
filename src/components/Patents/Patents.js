import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";
import parse from "html-react-parser";

function Patents() {
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
      //   console.log("res.data?.data", res.data?.data);

      const activeData = (res.data?.data || []).filter(
        (item) => item.isActive === true,
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
    if (PageData?.apiName) {
      getData(PageData?.apiName);
    }
  }, [PageData?.apiName]);

  const patentApplicationsFiled = apiData?.filter(
    (item) => item?.type?.en === "Patent Applications Filed",
  );

  const patentsObtained = apiData?.filter(
    (item) => item?.type?.en === "Patents Obtained",
  );

  console.log("patentsObtained", patentsObtained);

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
            {patentApplicationsFiled?.length > 0 && (
              <>
                 
                <div className="col-12">
                  <div class="section-heading">
                    <h2 class="section-title fs-48 fw-600 m-0">
                      {patentApplicationsFiled?.length > 0 && (
                        <>
                          {lang === "hi"
                            ? "दायर पेटेंट आवेदन"
                            : "Patent applications filed"}{" "}
                          :-
                        </>
                      )}
                      {/* {lang === "hi" ? "दायर पेटेंट आवेदन" : "Patent applications filed"} :- */}
                    </h2>
                  </div>
                  <div className="collaborations-grid common-space">
                    {patentApplicationsFiled?.map((item, index) => {
                      return (
                        <div key={index} className="single-collaborations-card">
                          <div className="list-details">
                            <div className="sr-number">
                              <i className="fa-solid fa-circle-check fs-22"></i>
                            </div>
                            <div className="title-name m-0 fw-600 fs-16 slow-effect">
                              {parse(item?.title?.[lang] || "")}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {patentsObtained?.length > 0 && (
              <>
                <div className="col-12">
                  <div class="section-heading">
                    <h2 class="section-title fs-48 fw-600 m-0">
                      {lang === "hi" ? "पेटेंट" : "Patents"}
                    </h2>
                  </div>
                  <div className="collaborations-grid common-space">
                    {patentsObtained?.map((item, index) => {
                      return (
                        <div key={index} className="single-collaborations-card">
                          <div className="list-details">
                            <div className="sr-number">
                              <i className="fa-solid fa-circle-check fs-22"></i>
                            </div>
                            <p
                              className="title-name m-0 fw-600 fs-16 slow-effect"
                              dangerouslySetInnerHTML={{
                                __html: item?.title?.[lang],
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div> 
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Patents;
