import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function EventsDetails() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();
  const { slug, id } = useParams();
  const [apiData, setApiData] = useState(null);
  const [PageData, setPageData] = useState(null);

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
      const res = await axios.get(`${API_URL}/event/get/web/${id}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      // setApiData(res.data?.data || []);
      setApiData(res?.data?.data);
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

      <section className="achievements-section section-padding pb-0">
        <div className="container">
          {/* <div className="row">
            <div className="col-12 hover-effect position-relative">
              <div className="Event-full-banner image-effect">
                <img
                  className="slow-effect w-100"
                  src={`${IMG_BASE_URL}/${apiData?.eventBannerPhoto}`}
                  alt={apiData?.name?.en}
                  style={{ height: "35vh" }}
                />
              </div>
            </div>
          </div> */}
          <div className="event-full-details common-space">
            <div className="row row-gap m-0">
              <div className="col-lg-7">
                <div className="row event-area">
                  <div className="col-lg-12 event-col">
                    <div className="single-event-column">
                      <div className="event-details">
                        <p className="event-box-title fs-20 fw-600 text-black mb-0">
                          Event Title
                        </p>
                        <span className="event-box-info fs-16 d-block">
                          {apiData?.name?.[lang]}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-12 event-col">
                    <div className="single-event-column">
                      <div className="event-details">
                        <p className="event-box-title fs-20 fw-600 text-black mb-0">
                          Event Location
                        </p>
                        <span className="event-box-info fs-16 d-block">
                          {apiData?.location?.[lang]}
                        </span>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="col-lg-12 event-col">
                    <div className="single-event-column">
                      <div className="event-details">
                        <p className="event-box-title fs-20 fw-600 text-black mb-0">
                          Event Start Time & Event End Time
                        </p>
                        <span className="event-box-info fs-16 d-block">
                          {new Date(apiData?.startTime).toLocaleString(
                            "en-IN",
                            {
                              timeZone: "Asia/Kolkata",
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            },
                          )}
                          {" & "}
                          {new Date(apiData?.endTime).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="col-lg-12 event-col">
                    <div className="single-event-column">
                      <div className="event-details">
                        <p className="event-box-title fs-20 fw-600 text-black mb-0">
                          Event Registration Start & End Date
                        </p>
                        <span className="event-box-info fs-16 d-block">
                          {new Date(
                            apiData?.registrationStartTime,
                          ).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                          {" & "}
                          {new Date(
                            apiData?.registrationEndTime,
                          ).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="col-lg-12 event-col">
                    <div className="single-event-column">
                      <div className="event-details">
                        <p className="event-box-title fs-20 fw-600 text-black mb-0">
                          Event Registration Link
                        </p>
                        <span className="event-box-info fs-16 d-block">
                          {apiData?.registrationLink}
                        </span>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-lg-12 event-col">
                    <div className="single-event-column">
                      <div className="event-details">
                        <p className="event-box-title fs-20 fw-600 text-black mb-0">
                          Event Description
                        </p>
                        <span
                          className="event-box-info fs-16 d-block"
                          dangerouslySetInnerHTML={{
                            __html: apiData?.description?.[lang],
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 hover-effect position-relative">
                <div className="Event-photo image-effect">
                  <img
                    className="slow-effect w-100"
                    src={`${IMG_BASE_URL}/${apiData?.eventPhoto}`}
                    alt={apiData?.name?.en}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <p
                  className="b-12"
                  dangerouslySetInnerHTML={{
                    __html: apiData?.description?.[lang],
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

export default EventsDetails;
