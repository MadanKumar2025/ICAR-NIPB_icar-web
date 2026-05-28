import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";
import { useTheme } from "../ThemeContext";

function Help() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();
  const { theme } = useTheme();

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
      const activeData = (res.data?.data || []).filter(
        (item) =>
          // item.isActive === true && item.department?.en === "Technical Staff",
          item.isActive === true,
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

  //   console.log("apiData", apiData);

  // Optional: map theme names to actual colors
  const themeColors = {
    blue: "#0C4198",
    orange: "#C85502",
    green: "#006F00",
  };

  const headerStyle = {
    backgroundColor: themeColors[theme],
    color: "#fff", // text color
  };
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
      {/* .theme-blue */}
      {/* theme-${theme}  */}
      {/* breadcrumb-area */}
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="accordion w-75" id="accordionPanelsStayOpenExample">
          {apiData?.map((item, index) => {
            const collapseId = `panelsStayOpen-collapse-${index}`; // unique ID per item
            const headingId = `panelsStayOpen-heading-${index}`;
            return (
              <div key={index} className="accordion-item mt-3">
                <h2 className="accordion-header" id={headingId}>
                  <button
                    className="accordion-button collapsed" // collapsed by default
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded="false" // start closed
                    aria-controls={collapseId}
                    style={headerStyle} // dynamically applied from theme
                  >
                    {item?.title?.[lang]}
                  </button>
                </h2>
                <div
                  id={collapseId}
                  className="accordion-collapse collapse" // do not include "show"
                  aria-labelledby={headingId}
                >
                  <div className="accordion-body">
                    {item?.description?.[lang]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Help;
