import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function PublicationsYear() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();

  const [apiData, setApiData] = useState(null);
  const [PageData, setPageData] = useState(null);
  const { slug, id, category } = useParams();
  const [activeType, setActiveType] = useState("Research Articles");

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

  const getData = async (category) => {
    if (!id) return;
    try {
      const res = await axios.get(
        `${API_URL}/PublicationsRoutes/get/web/${category}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        },
      );

      setApiData(res.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPage();
  }, [slug]);

  useEffect(() => {
    if (category) {
      getData(category);
    }
  }, [id, category]);

  const handleDownload = async (e, fileUrl, fileName) => {
    e.stopPropagation();

    try {
      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error("File not found");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "download";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("File download failed");
    }
  };

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
                  {/* {PageData?.pageTitle?.[lang]}  */}
                  {category} {id}
                </h1>
                <ul className="breadcrumb-area m-0 p-0">
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>
                    <i className="fa-solid fa-angle-right"></i>
                  </li>
                  <li className="breadcrumb-title">
                    {/* {PageData?.pageTitle?.[lang]} */}
                    {category} {id}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {category === "ResearchPublications" && (
        <>
          <section className="institution-section body-shape section-padding">
            <div className="container">
              <div className="row row-gap">
                <div className="col-12">
                  <div className="publication-details">
                  <div className="publication-tabs-panels d-flex flex-wrap justify-content-sm-between w-100"
                  >
                    <button
                      onClick={() => setActiveType("Research Articles")}
                      type="button"
                      className={`btn flex-sm-fill publication-tab-btn ${activeType === "Research Articles" ? "active-tab" : ""
                        }`}
                    >
                      {lang === "hi" ? " शोध लेख " : " Research Articles"}
                    </button>
                    <button
                      onClick={() => setActiveType("Review Articles")}
                      type="button"
                      className={`btn flex-sm-fill publication-tab-btn ${activeType === "Review Articles" ? "active-tab" : ""
                        }`}
                    >
                      {lang === "hi" ? " समीक्षा लेख " : "    Review Articles"}
                    </button>
                    <button
                      onClick={() => setActiveType("Book chapters")}
                      type="button"
                      className={`btn flex-sm-fill publication-tab-btn ${activeType === "Book chapters" ? "active-tab" : ""
                        }`}
                    >
                      {lang === "hi" ? " पुस्तक अध्याय " : "    Book chapters"}
                    </button>
                  </div>
                  <div className="publication-panel-contents bg-white">
                    {apiData
                      ?.filter(
                        (item) =>
                          item?.year == id &&
                          item?.articleType?.en === activeType,
                      )
                      ?.map((item, index) => {
                        const fileUrl = item?.file
                          ? `${IMG_BASE_URL}/files/${item.file}`
                          : null;

                        return (
                          <div className="single-list mt-3"
                            key={item?.id || index}
                            // style={{
                            //   padding: "1vw",
                            //   backgroundColor:
                            //     index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                            //   color: "black",
                            // }}
                          >
                            <div className="list-details listing-download-list">
                              <div className="list-data">
                                <div className="sr-number">
                                  <i className="fa-solid fa-circle-check fs-22"></i>
                                </div>

                                {/* Title */}
                                <p
                                  className="title-name m-0 fw-600 fs-16 slow-effect"
                                  dangerouslySetInnerHTML={{
                                    __html: item?.title?.[lang],
                                  }}
                                />
                              </div>

                              <div className="download-btn md-ms-auto">
                                {fileUrl && (
                                  <button
                                    onClick={(e) =>
                                      handleDownload(e, fileUrl, item.file)
                                    }
                                    style={{
                                      marginTop: "8px",
                                      padding: "6px 12px",
                                      border: "none",
                                      // background: "#007bff",
                                      color: "white",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                    }}
                                    className="theme-bg"
                                  >
                                    Download File
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  </div>
                  {/* {apiData?.map((item, index) => {
                const fileUrl = item?.file
                  ? `${IMG_BASE_URL}/files/${item.file}`
                  : null;

                return (
                  <div
                    key={item?.id || index}
                    style={{
                      padding: "1vw",
                      backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                      color: "black",
                    }}
                  >
                    <div className="list-details listing-download-list">
                      <div className="list-data">
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

                      <div className="download-btn md-ms-auto">
                        {fileUrl && (
                          <button
                            style={{
                              marginTop: "8px",
                              padding: "6px 12px",
                              border: "none",
                              color: "white",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            className="theme-bg"
                          >
                            Download File
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })} */}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      {category !== "ResearchPublications" && (
        <>
          <section className="institution-section body-shape section-padding">
            <div className="container">
              <div className="row row-gap">
                <div className="col-12">
                  {apiData
                    ?.filter((item) => item?.year == id)
                    ?.map((item, index) => {
                      const fileUrl = item?.file
                        ? `${IMG_BASE_URL}/files/${item.file}`
                        : null;

                      return (
                        <div
                          key={item?.id || index}
                          style={{
                            padding: "1vw",
                            backgroundColor:
                              index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                            color: "black",
                          }}
                        >
                          <div className="list-details listing-download-list">
                            <div className="list-data">
                              <div className="sr-number">
                                <i className="fa-solid fa-circle-check fs-22"></i>
                              </div>

                              {/* Title */}
                              <p
                                className="title-name m-0 fw-600 fs-16 slow-effect"
                                dangerouslySetInnerHTML={{
                                  __html: item?.title?.[lang],
                                }}
                              />
                            </div>

                            <div className="download-btn md-ms-auto">
                              {fileUrl && (
                                <button
                                  onClick={(e) =>
                                    handleDownload(e, fileUrl, item.file)
                                  }
                                  style={{
                                    marginTop: "8px",
                                    padding: "6px 12px",
                                    border: "none",
                                    // background: "#007bff",
                                    color: "white",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                  }}
                                  className="theme-bg"
                                >
                                  Download File
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {/* {apiData?.map((item, index) => {
                const fileUrl = item?.file
                  ? `${IMG_BASE_URL}/files/${item.file}`
                  : null;

                return (
                  <div
                    key={item?.id || index}
                    style={{
                      padding: "1vw",
                      backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                      color: "black",
                    }}
                  >
                    <div className="list-details listing-download-list">
                      <div className="list-data">
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

                      <div className="download-btn md-ms-auto">
                        {fileUrl && (
                          <button
                            style={{
                              marginTop: "8px",
                              padding: "6px 12px",
                              border: "none",
                              color: "white",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                            className="theme-bg"
                          >
                            Download File
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })} */}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default PublicationsYear;
