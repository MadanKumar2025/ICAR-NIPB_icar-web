import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";
import parse from "html-react-parser";

function TechnologiesDeveloped() {
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
  const getDataDetails = async (id) => {
    try {
      const res = await axios.get(
        `${API_URL}/CollaborationsDetailsRoutes/get/web`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        },
      );
      //   console.log("res.data?.data", res.data?.data);

      const activeData = (res.data?.data || []).filter(
        (item) => item.isActive === true,
      );
      setApiDataDetails(activeData);
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
  }, [PageData?.apiName]);

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
          {/* <div class="row">
            <div class="col-12">
              <div class="section-heading text-center">
                <h2 class="section-title fs-48 fw-600 m-0">Technologies developed</h2>
              </div>
            </div>
          </div> */}
          <div class="row common-space">
            <div class="col-12">
              <div class="table-listing table-responsive">
                <table class="table mb-0">
                  <thead class="table-thead">
                    <tr>
                      <th class="table-title fw-600 fs-20" scope="col">
                       {lang === "hi" ? "क्रमांक" : "Sr.No."}
                      </th>
                      <th class="table-title fw-600 fs-20" scope="col">
                        {lang === "hi"
  ? "आईसीएआर के साथ समझौता ज्ञापन करने वाले अन्य पक्ष/संस्थान का नाम"
  : "Name of other party/Institute entered MoU with ICAR"}
                      </th>
                      <th class="table-title fw-600 fs-20" scope="col">
                    {lang === "hi"
  ? "आईसीएआर के सहयोगी संस्थान का नाम"
  : "Name of Collaborating Institute of ICAR"}
                      </th>
                      <th class="table-title fw-600 fs-20" scope="col">
                       {lang === "hi" ? "प्रौद्योगिकी का नाम" : "Name of Technology"}
                      </th>
                      <th class="table-title fw-600 fs-20" scope="col">
{lang === "hi" ? "एमओयू दिनांक" : "MoU date"}                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-body">
                    {apiData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td className="w-50 text-wrap">
                            {item?.nameOfOtherParty?.[lang]}
                          </td>
                          <td className="w-50 text-wrap">
                            {item?.collaboratingInstituteICAR?.[lang]}
                          </td>
                          <td className="w-50 text-wrap">
                            {item?.nameOfTechnology?.[lang]}
                          </td>
                          <td className="w-50 text-wrap">
                            {new Date(item?.mouDate).toLocaleDateString(
                              "en-GB",
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="table-tfoot">
                    <tr>
                      <td colspan="5" class="text-end">
                        As on 03.02.2022
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TechnologiesDeveloped;
