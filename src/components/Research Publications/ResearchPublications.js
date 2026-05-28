import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";
import parse from "html-react-parser";

function ResearchPublications() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();

  const [apiData, setApiData] = useState([]);
  const [PageData, setPageData] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
    const result = apiName.split("/").pop();

    try {
      const res = await axios.get(
        `${API_URL}/PublicationsRoutes/get/web/${result}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        },
      );

      const activeData = (res.data?.data || []).filter(
        (item) => item.isActive === true,
      );

      setApiData(activeData);
      //   latest year find
      const latestYear = Math.max(...activeData.map((item) => item.year));
      setSelectedYear(String(latestYear));
      const defaultFiltered = activeData.filter(
        (item) => item.year === latestYear,
      );

      setFilteredData(defaultFiltered);
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

  const handleFilter = () => {
    if (!selectedYear) {
      setFilteredData(apiData);
      return;
    }

    const filtered = apiData.filter(
      (item) => String(item.year) === String(selectedYear),
    );

    setFilteredData(filtered);
  };

  const allowedPages = [
    "Annual Report",
    "Newsletters",
    "Hindi Patrika",
    "Others",
  ];
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
      {/* .list-details .fa-circle-check */}
      <section className="institution-section body-shape section-padding">
        <div className="container">
          <div className="row row-gap">
            <div className="col-12">
              {apiData?.[0]?.category !== "Forms" && (
                <div className="seach-area">
                  <div className="d-flex align-items-center gap-2">
                    <label className="fw-600 fs-16 m-0 year-label">Year</label>
                    <select
                      className="form-select year-select year-field-select"
                      style={{ width: "20vw" }}
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      {[...new Set(apiData?.map((item) => item.year))]
                        ?.sort((a, b) => b - a)
                        ?.map((year, index) => {
                          return (
                            <option key={index} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      {/* {[...new Set(apiData?.map((item) => item.year))]?.map(
                      (year, index) => {
                        return (
                          <option key={index} value={year}>
                            {year}
                          </option>
                        );
                      },
                    )} */}
                    </select>

                    <button
                      className="theme-bg p-2 rounded-1"
                      onClick={handleFilter}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}

              {filteredData?.map((item, index) => {
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
              {apiData?.[0]?.category === "Forms" &&
                apiData?.map((item, index) => {
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResearchPublications;
