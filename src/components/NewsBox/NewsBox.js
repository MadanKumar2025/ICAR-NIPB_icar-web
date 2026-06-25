import axios from "axios";
import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import { Link, useNavigate } from "react-router-dom";

function NewsBox() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [NewsData, setNewsData] = useState();
  const [EventData, setEventData] = useState();

  const getNews = async (page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/news/get/web`);

      const activeData = (response?.data?.data || []).filter(
        (item) => item.isActive === true,
      );
      setNewsData(activeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getEvent = async (page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/event/get/web`);

      const activeData = (response?.data?.data || []).filter(
        (item) => item.isActive === true,
      );
      setEventData(activeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getNews();
    getEvent();
  }, []);

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

  const newsText = lang === "hi" ? "सामाजिक माध्यम" : "Social Media";
  const viewMoreText = lang === "hi" ? "और देखें" : "View More";

  const tenderText = lang === "hi" ? "निविदा" : "Tender";

  const careerJobText = lang === "hi" ? "करियर / नौकरी" : "Career/Job";

  const eventsText = lang === "hi" ? "कार्यक्रम" : "Events";
  return (
    <>
      <section className="news-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-3">
              <div className="marquee-column position-relative">
                <h4 className="marquee-heading fs-24 box box2 fw-600 text-center">
                  {tenderText}
                </h4>
                <div className="marquee-box">
                  <div className="marquee-content vertical_scroll">
                    <ul className="p-0 m-0 d-flex flex-column">
                      {NewsData?.filter((item) => item.type === "Tender").map(
                        (item, index) => (
                          <li key={item.id}>
                            <a
                              href={
                                item?.link ||
                                `${IMG_BASE_URL}/files/${item?.documentFile}`
                              }
                              target="_blank"
                              className="new-info"
                            >
                              <span className="icon-news">
                                <img
                                  src="images/resources/new_blink.png"
                                  alt=""
                                />
                              </span>
                              <span className="new-text">
                                {item.title?.[lang] || "No Title"}
                              </span>
                            </a>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
                <div
                  className="view-all"
                  onClick={() => handlePageClick("69feeda85dda76984216f231")}
                >
                  <Link>
                    <span className="position-relative">
                      {viewMoreText}{" "}
                      <i class="fa-solid fa-arrow-right-long"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="marquee-column position-relative">
                <h4 className="marquee-heading fs-24 box box3 fw-600 text-center">
                  {careerJobText}
                </h4>
                <div className="marquee-box">
                  <div className="marquee-content vertical_scroll">
                    <ul className="p-0 m-0 d-flex flex-column">
                      {NewsData?.filter((item) => item.type === "Job").map(
                        (item, index) => (
                          <li key={item.id}>
                            <a
                              href={
                                item?.link ||
                                `${IMG_BASE_URL}/files/${item?.documentFile}`
                              }
                              target="_blank"
                              className="new-info"
                            >
                              {" "}
                              <span className="icon-news">
                                <img
                                  src="images/resources/new_blink.png"
                                  alt=""
                                />
                              </span>
                              <span className="new-text">
                                {item.title?.[lang] || "No Title"}
                              </span>
                            </a>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
                <div
                  className="view-all"
                  onClick={() => handlePageClick("69feef0a5dda76984216f5e6")}
                >
                  <Link>
                    <span className="position-relative">
                      {viewMoreText}{" "}
                      <i class="fa-solid fa-arrow-right-long"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="marquee-column position-relative">
                <h4 className="marquee-heading fs-24 box box4 fw-600 text-center">
                  {eventsText}
                </h4>
                <div className="marquee-box">
                  <div className="marquee-content vertical_scroll">
                    <ul className="p-0 m-0 d-flex flex-column">
                      {EventData?.map((item, index) => (
                        <li key={item.id}>
                          <a
                            href={item?.registrationLink}
                            target="_blank"
                            className="new-info"
                          >
                            <span className="icon-news">
                              <img
                                src="images/resources/new_blink.png"
                                alt=""
                              />
                            </span>
                            <span className="new-text">
                              {item.name?.[lang] || "No Title"}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div
                  className="view-all"
                  onClick={() => handlePageClick("69fef1e088fe5b04fafede90")}
                >
                  <Link>
                    <span className="position-relative">
                      {viewMoreText}{" "}
                      <i class="fa-solid fa-arrow-right-long"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="marquee-column position-relative">
                <h4 className="marquee-heading fs-24 box box1 fw-600 text-center">
                  {newsText}
                </h4>
                <div className="marquee-box">
                  <div className="marquee-content vertical_scroll">
                    <ul className="p-0 m-0 d-flex flex-column">
                      {/* {NewsData?.filter((item) => item.type === "News").map(
                        (item, index) => (
                          <li key={item.id}>
                            <a
                              href={
                                item?.link ||
                                `${IMG_BASE_URL}/files/${item?.documentFile}`
                              }
                              target="_blank"
                              className="new-info"
                            >
                              <span className="icon-news">
                                <img
                                  src="images/resources/new_blink.png"
                                  alt=""
                                />
                              </span>
                              <span className="new-text">
                                {item?.title?.[lang] || "No Title"}
                              </span>
                            </a>
                          </li>
                        ),
                      )} */}
                    </ul>
                  </div>
                </div>
                <div
                  className="view-all"
                  // onClick={() => handlePageClick("69fedeb95dda76984216ebca")}
                >
                  <Link>
                    <span className="position-relative">
                      {viewMoreText}{" "}
                      <i class="fa-solid fa-arrow-right-long"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewsBox;
