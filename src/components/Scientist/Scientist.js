import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function Scientist() {
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
        `${API_URL}/pages/get/web/69fc0b26a07edc05b03aca93`,
      );

      const slug = res?.data?.data?.slug;
      if (slug) {
        navigate(`/${slug}/${id}`);
      }
    } catch (error) {
      console.error("Error fetching page slug:", error);
    }
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
      <section className="staff-section section-padding">
        <div className="container">
          <div className="row common-space row-gap">
            {apiData?.map((item, index) => {
              return (
                <div
                  onClick={() => handlePageClick(item?.id)}
                  key={index}
                  className="col-sm-6 col-lg-4 col-xl-3 staff-col"
                >
                  <div className="team-item slow-effect h-100">
                    <div className="team-image position-relative overflow-hidden">
                      <figure className="image-anime m-0">
                        <img
                          className="slow-effect"
                          src={`${IMG_BASE_URL}/${item?.photo}`}
                          alt={item?.photoTitle}
                        />
                      </figure>
                    </div>
                    <div className="team-body">
                      <div className="team-content">
                        <h3
                          className="team-member-name fs-20 fw-600"
                          style={{ cursor: "pointer" }}
                        >
                          {item?.scientistName?.[lang]}
                        </h3>
                        <p className="desination-title fs-16 m-0">
                          {item?.designation?.name?.[lang]}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Scientist;
