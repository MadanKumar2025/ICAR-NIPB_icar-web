import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function StaticContent() {
  const { slug, id } = useParams();
  const { lang } = useLanguage();

  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;

  const [PageData, setPageData] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [content, setContent] = useState(null);

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
    if (!apiName) return;
    try {
      const res = await axios.get(`${API_URL}/${PageData?.apiName}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      setApiData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDataContent = async (id) => {
    console.log("id",id);
    
    try {
      const res = await axios.get(`${API_URL}/ContentRoutes/get/web/${id}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      console.log("res",res.data?.data );
      
      setContent(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPage();
  }, [id, slug]);

  useEffect(() => {
    if (PageData?.apiName) {
      getData(PageData.apiName);
    }
    if (PageData?.id) {
      getDataContent(PageData?.id);
    }
  }, [PageData, slug]);

  // console.log("PageData", `${IMG_BASE_URL}/${PageData.photo}`);
  // console.log("PageData", PageData);
 
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
      {/* <section className="banner-section position-relative" style={{ backgroundImage: "url(images/banner/banner_bg.jpg)" }}> */}
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

      <section className="disclaimer-section section-padding body-shape position-relative">
        <div className="container">
          <div class="content-wrapper">
            <div className="row">
              <div className="col-12">
                <div className="section-heading mb-3">
                  <h2 className="section-title fs-48 fw-600 m-0">
                    {PageData?.pageTitle?.[lang]}{" "}
                  </h2>
                </div>
                <div className="disclaimer-text">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: apiData?.[0]?.content?.[lang],
                    }}
                  />
                </div>
                <div className="disclaimer-text">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: content?.[0]?.content?.[lang],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StaticContent;
