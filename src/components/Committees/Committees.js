import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function Committees() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();

  const [apiData, setApiData] = useState(null);
  const [PageData, setPageData] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

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
  }, [PageData]);

  //This ID belongs to the page where I am sending it.
  const handlePageClick = async (id) => {
    try {
      const res = await axios.get(
        `${API_URL}/pages/get/web/6a2a74629f1cfc2feddf8d14`,
      );

      const slug = res?.data?.data?.slug;
      if (slug) {
        navigate(`/${slug}/CommitteesDetails/${id}`);
      }
    } catch (error) {
      console.error("Error fetching page slug:", error);
    }
  };

  // console.log("apiData", apiData);

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
      <section className="institute-section position-relative overflow-hidden section-padding">
        <div className="institute-top-shape">
          <img src="images/shape/shape2_right.png" alt="" />
        </div>
        <div className="container position-relative z_index1">
          <div className="row common-space row-gap institute-row">
            {apiData?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handlePageClick(item?.id)}
                  className="col-sm-6 col-lg-4 institute-col"
                >
                  <div className="institute-box text-center h-100 slow-effect hover-effect">
                    {/* <div className="institute-icon">
                  <img
                    className="slow-effect icon-effect1"
                    src="images/icons/student_corner.svg"
                    alt=""
                  />
                </div> */}
                    <p className="institute-title fs-22 fw-500 d-block">
                      {item?.type?.[lang]}
                    </p>
                    <a href="#" className="common-btn btn-style-one mx-auto">
                      <span className="btn-static-text">
                        {/* {lang === "hi" ? "अनुसंधान देखें" : "Explore Research"} */}
                        {lang === "hi" ? "देखें" : "Explore"}
                      </span>
                      <span className="btn-arrow">
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="institute-bottom-shape">
          <img src="images/shape/shape2_left.png" alt="" />
        </div>
      </section>
    </div>
  );
}

export default Committees;
