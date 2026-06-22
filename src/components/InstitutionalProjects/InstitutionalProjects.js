import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function InstitutionalProjects() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();

  const [apiData, setApiData] = useState(null);
  const [apiDataDetails, setApiDataDetails] = useState(null);
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
      // const res = await axios.get(`${API_URL}/institutionalProjects/get/web`, {
      const res = await axios.get(`${API_URL}/${apiName}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      // setApiData(res.data?.data || []);
      const activeData = (res.data?.data || []).filter(
        (item) => item.isActive === true,
      );
      setApiData(activeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDataDetails = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/institutionalProjectsDetailsRoutes/get/web/All`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        },
      );

      // console.log("res", res);
      setApiDataDetails(res.data?.data || []);
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
    getDataDetails();
  }, [PageData]);

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

      <section class="cadre-section section-padding body-shape position-relative">
        <img
          class="background-shape-image"
          src="assets/images/shape/bg_shape.webp"
          alt=""
        />
        <div class="container position-relative">
          <div class="row common-space">
            <div class="col-12">
              <div class="table-listing table-responsive">
                <table class="table mb-0">
                  <thead class="table-thead">
                    <tr>
                      <th class="table-title fw-600 fs-20" scope="col">
                       {lang === "hi" ? "मुख्य परियोजना" : "Main Project"}
                      </th>
                      <th class="table-title fw-600 fs-20" scope="col">
                       {lang === "hi" ? "उप परियोजना" : "Sub Project"}
                      </th>
                      <th class="table-title fw-600 fs-20" scope="col">
                      {lang === "hi" ? "मुख्य अन्वेषक" : "Principal Investigators"}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-body">
                    {apiData?.map((mainItem) => {
                      const details = apiDataDetails?.filter(
                        (d) => d.institutionalProjectID?._id === mainItem?.id,
                      );
                      return (
                        <React.Fragment key={mainItem.id}>
                          {details?.map((detail, index) => (
                            <tr key={detail.id}>
                              {index === 0 && (
                                <td
                                  className="w-50 text-wrap"
                                  rowSpan={details.length}
                                >
                                  <strong>
                                    {mainItem.mainProject?.[lang]}
                                  </strong>
                                  Group Leader: {mainItem.groupLeader?.[lang]}
                                </td>
                              )}

                              <td
                                className="w-50 text-wrap"
                                className="w-50 text-wrap"
                              >
                                {detail.subProjects?.[lang]}
                              </td>
                              <td className="w-50 text-wrap">
                                {detail.principalInvestigators?.[lang]}
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                  <tfoot className="table-tfoot">
                    <tr>
                      <td colspan="5" class="text-end">
                        {lang === "hi" ? "दिनांक 03.02.2022 तक" : "As on 03.02.2022"}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="disclaimer-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading mb-3">
                <h4 className="section-title fs-48 fw-600 m-0">
                  {PageData?.pageTitle?.[lang]}
                </h4>
              </div>
              <div className="disclaimer-text">
                <div className="table-container theme-bg">
                  <table>
                    <thead>
                      <tr>
                        <th>Main Project</th>
                        <th>Sub Project</th>
                        <th>Principal Investigators</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiData?.map((mainItem) => {
                        const details = apiDataDetails?.filter(
                          (d) => d.institutionalProjectID?._id === mainItem?.id,
                        );
                        return (
                          <React.Fragment key={mainItem.id}>
                            {details?.map((detail, index) => (
                              <tr key={detail.id}>
                                {index === 0 && (
                                  <td rowSpan={details.length}>
                                    <strong>
                                      {mainItem.mainProject?.[lang]}
                                    </strong>
                                    <br />
                                    <br />
                                    Group Leader: {mainItem.groupLeader?.[lang]}
                                  </td>
                                )}

                                <td>{detail.subProjects?.[lang]}</td>

                                <td>{detail.principalInvestigators?.[lang]}</td>
                              </tr>
                            ))}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default InstitutionalProjects;
