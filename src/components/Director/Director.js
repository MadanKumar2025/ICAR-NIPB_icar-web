import axios from "axios";
import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import { useNavigate } from "react-router-dom";

function Director() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [DirectorData, setDirectorData] = useState();
  const [Content, setContentData] = useState();
  const [Content_OurVision, setContent_OurVision] = useState();
  const [Page_OurVision, setPage_OurVision] = useState();
  const [Content_OurMission, setContent_OurMission] = useState();
  const [Page_OurMission, setPage_OurMission] = useState();
  const [Content_Mandate, setContent_Mandate] = useState();
  const [Page_Mandate, setPage_Mandate] = useState();

  const getDirector = async (page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/DirectorRoutes/get/web`);

      setDirectorData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getContent = async (page = 1) => {
    try {
      //   pageId
      const response = await axios.get(
        `${API_URL}/ContentRoutes/get/web/69f1946b50aac9e25044f1ba`,
      );

      setContentData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //   this is use for Our Vision
  const getContent_OurVision = async (page = 1) => {
    try {
      //   pageId
      const response = await axios.get(
        `${API_URL}/ContentRoutes/get/web/69f1a9e7b130517a1b281a6b`,
      );

      setContent_OurVision(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getPage_OurVision = async (page = 1) => {
    try {
      //    Id
      const response = await axios.get(
        `${API_URL}/pages/get/web/69f1a9e7b130517a1b281a6b`,
      );

      setPage_OurVision(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //   this is use for Our Mission
  const getContent_OurMission = async (page = 1) => {
    try {
      //   pageId
      const response = await axios.get(
        `${API_URL}/ContentRoutes/get/web/69f1ae81d8d72d8d6fab8121`,
      );

      setContent_OurMission(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getPage_OurMission = async (page = 1) => {
    try {
      //    Id
      const response = await axios.get(
        `${API_URL}/pages/get/web/69f1ae81d8d72d8d6fab8121`,
      );
      setPage_OurMission(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //   this is use for Mandate
  const getContent_Mandate = async (page = 1) => {
    try {
      //   pageId
      const response = await axios.get(
        `${API_URL}/ContentRoutes/get/web/69face0214d401d45226df85`,
      );

      setContent_Mandate(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getPage_Mandate = async (page = 1) => {
    try {
      //    Id
      const response = await axios.get(
        `${API_URL}/pages/get/web/69face0214d401d45226df85`,
      );

      setPage_Mandate(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDirector();
    getContent();
    getContent_OurVision();
    getPage_OurVision();
    getContent_OurMission();
    getPage_OurMission();
    getContent_Mandate();
    getPage_Mandate();
  }, []);

  //   console.log("Content_OurVision", Page_Mandate?.data?.pageTitle?.en);
  const truncateHtml = (html, limit = 300) => {
    if (!html) return "";

    const container = document.createElement("div");
    container.innerHTML = html;

    let wordCount = 0;
    let done = false;

    const walk = (node) => {
      if (done) return null;

      // Text node
      if (node.nodeType === 3) {
        const words = node.textContent.split(/(\s+)/);
        let result = "";

        for (let w of words) {
          if (!w.trim()) {
            result += w; // spaces preserve
            continue;
          }

          if (wordCount < limit) {
            result += w + " ";
            wordCount++;
          } else {
            done = true;
            result += "...";
            break;
          }
        }

        const span = document.createElement("span");
        span.textContent = result;
        return span;
      }

      // Element node
      if (node.nodeType === 1) {
        const el = node.cloneNode(false);

        for (let child of node.childNodes) {
          const processed = walk(child);
          if (processed) el.appendChild(processed);
          if (done) break;
        }

        return el;
      }

      return null;
    };

    const result = document.createElement("div");

    for (let child of container.childNodes) {
      const processed = walk(child);
      if (processed) result.appendChild(processed);
      if (done) break;
    }

    return result.innerHTML;
  };

  // this is use for get slug
  const handlePageClick = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/pages/get/web/${id}`);

      const slug = res?.data?.data?.slug;
      // const designTemplate = res?.data?.data?.designTemplate?._id;

      if (slug) {
        navigate(`/${slug}`);
      }
    } catch (error) {
      console.error("Error fetching page slug:", error);
    }
  };
  const aboutText =
  lang === "hi" ? "संस्थान के बारे में" : "About the Institute";
  const readMoreText = lang === "hi" ? "और पढ़ें" : "Read More";
  return (
    <>
      <section className="home-about-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-4 hover-effect">
              <div className="about-image-area image-effect position-relative overflow-hidden">
                <img class="w-100"
                  src={`${IMG_BASE_URL}/${DirectorData?.data?.[0]?.photo}`}
                  alt={DirectorData?.data[0]?.photoTitle}
                />
              </div>
            </div>
            <div className="col-md-8 mt-4 mt-md-0">
              <div className="about-content">
                <div className="section-heading">
                  <div className="sub-title theme-bg d-flex flex-wrap align-items-center gap-2 mb-2">
                    <span className="mini-logo d-inline-flex justify-content-center align-items-center bg-white">
                      <img src="images/resources/mini_logo.png" alt="" />
                    </span>
                    <span className="sub-heading fs-16 fw-500 signika-font">
                      {aboutText}
                    </span>
                  </div>
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: Content?.data?.[0]?.content?.[lang],
                  }}
                />
                <a className="common-btn btn-style-one mt-3">
                  <span
                    className="btn-static-text"
                    onClick={() => handlePageClick("6a02c787adbccb91e02a14fe")}
                  >
                   {readMoreText}
                  </span>
                  <span className="btn-arrow">
                    <i className="fa-solid fa-arrow-right-long"></i>{" "}
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="vision-inner">
                <div className="vision-box vision-box theme-gray slow-effect hover-effect h-100">
                  <div className="vision-header">
                    <h3 className="fs-26 fw-500 heading-color m-0">
                      {Page_OurVision?.data?.pageTitle?.[lang]}
                    </h3>
                    <div className="vision-icon">
                      <img
                        className="slow-effect icon-effect1"
                        src="images/icons/vision.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="vision-text">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: Content_OurVision?.data[0]?.content?.[lang],
                    }}
                  />
                  </div>
                </div>
                <div className="vision-box mission-box theme-gray slow-effect hover-effect h-100">
                  <div className="vision-header">
                    <h3 className="fs-26 fw-500 heading-color m-0">
                      {Page_OurMission?.data?.pageTitle?.[lang]}
                    </h3>
                    <div className="vision-icon">
                      <img
                        className="slow-effect icon-effect1"
                        src="images/icons/vision.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="vision-text">
                  <p dangerouslySetInnerHTML={{
                      __html: Content_OurMission?.data[0]?.content?.[lang],
                    }}
                  />
                  </div>
                </div>
                <div className="vision-box mandate-box theme-gray slow-effect hover-effect h-100">
                  <div className="vision-header">
                    <h3 className="fs-26 fw-500 heading-color m-0">
                      {Page_Mandate?.data?.pageTitle?.[lang]}
                    </h3>
                    <div className="vision-icon">
                      <img
                        className="slow-effect icon-effect1"
                        src="images/icons/vision.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  {/* <p
                    // dangerouslySetInnerHTML={{
                    //   __html: Content_Mandate?.data[0]?.content?.[lang],
                    // }}
                    dangerouslySetInnerHTML={{
                      __html: truncateHtmlToChars(
                        Content_Mandate?.data?.[0]?.content?.[lang],
                        100,
                      ),
                    }}
                  /> */}
                  <div className="vision-text">
                    <p
                      className="mandate-content"
                      dangerouslySetInnerHTML={{
                        __html: truncateHtml(
                          Content_Mandate?.data?.[0]?.content?.[lang],
                          80,
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Director;
