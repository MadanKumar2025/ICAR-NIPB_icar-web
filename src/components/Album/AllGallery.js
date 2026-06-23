import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function AllGallery() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();

  const [apiData, setApiData] = useState(null);
  const [apiDataAlbumName, setApiDataAlbumName] = useState(null);
  const [PageData, setPageData] = useState(null);
  const { slug, id } = useParams();

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
    if (!id) return;
    try {
      const res = await axios.get(`${API_URL}/${PageData?.apiName}/${id}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      let data = res.data?.data || [];
      let dataAlbum = [];

      if (data.length === 0) {
        const res = await axios.get(`${API_URL}/album/get/web/id/${id}`, {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });
        dataAlbum = res.data?.data ? [res.data.data] : [];
      }

      // Filter active data
      const activeDataAlbum = dataAlbum.filter(
        (item) => item.isActive === true,
      );
      const activeData = data.filter((item) => item.isActive === true);

      if (data.length === 0) {
        setApiDataAlbumName(activeDataAlbum);
      } else {
        setApiData(activeData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPage();
  }, [slug]);

  useEffect(() => {
    if (PageData?.apiName) {
      getData();
    }
  }, [id, PageData?.apiName]);

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
                {/* {apiData?.map((item, index) => {
                   return <h1 className="banner-slider-title fw-500 text-white">
                    {PageData?.pageTitle?.[lang]} {item?.albumTitle?.[lang]}
                  </h1>;
                })} */}
                <h1 className="banner-slider-title fw-500 text-white">
                  {apiData?.[0]?.albumTitle?.[lang]}{" "}
                  {apiDataAlbumName?.[0]?.title?.[lang]}
                  {/* {PageData?.pageTitle?.[lang]}{" "} */}
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
              //   console.log("item", item);
              return (
                <div
                  key={index}
                  className="col-sm-6 col-lg-4 col-xl-3 staff-col"
                >
                  <div className="team-item slow-effect h-100">
                    <div className="team-image position-relative overflow-hidden">
                      <figure className="image-anime m-0">
                        {item?.photo ? (
                          <img
                            className="slow-effect"
                            src={`${IMG_BASE_URL}/${item?.photo}`}
                            alt={item?.title?.[lang] || "image"}
                          />
                        ) : item?.document ? (
                          <a
                            href={`${IMG_BASE_URL}/${item?.document}`}
                            // href="http://14.139.229.204/uploads/1782192872409-276719872.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pdf-card d-flex flex-column align-items-center justify-content-center w-100 h-100 text-decoration-none"
                            style={{
                              minHeight: "200px",
                              background: "#fff5f5",
                              color: "#e74c3c",
                              fontSize: "18px",
                              fontWeight: "600",
                              gap: "10px",
                            }}
                          >
                            <i
                              className="fa-solid fa-file-pdf"
                              style={{ fontSize: "50px" }}
                            ></i>
                            <span>View PDF</span>
                          </a>
                        ) : item?.videoUrl ? (
                          <iframe
                            className="slow-effect"
                            src={item?.videoUrl}
                            title={item?.title?.[lang] || "video"}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <div
                            className="placeholder"
                            style={{
                              width: "100%",
                              height: "200px",
                              backgroundColor: "#cccccc",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#000000",
                            }}
                          >
                            No Media
                          </div>
                        )}
                      </figure>
                    </div>
                    <div className="team-body">
                      <div className="team-content">
                        <h3
                          className="team-member-name fs-20 fw-600"
                          style={{ cursor: "pointer" }}
                        >
                          {item?.title?.[lang]}
                        </h3>
                        <p className="desination-title fs-16 m-0">
                          {item?.designation?.name?.[lang]}
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

export default AllGallery;
