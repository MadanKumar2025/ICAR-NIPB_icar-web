import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function CadreStrength() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();

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
      // const res = await axios.get(`${API_URL}/CadreStrengthRoutes/get/web`, {
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

  useEffect(() => {
    getPage();
  }, [slug]);

  useEffect(() => {
    if (PageData?.apiName) {
      getData(PageData?.apiName);
    }
  }, [PageData]);

  const totalSanctionedStrength = apiData?.reduce(
    (sum, item) => sum + (Number(item?.sanctionedStrength) || 0),
    0,
  );
  const totalfilled = apiData?.reduce(
    (sum, item) => sum + (Number(item?.filled) || 0),
    0,
  );
  const totalvacant = apiData?.reduce(
    (sum, item) => sum + (Number(item?.vacant) || 0),
    0,
  );

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
      <section className="cadre-section section-padding body-shape position-relative">
        <img
          className="background-shape-image"
          src="images/shape/bg_shape.webp"
          alt=""
        />
        <div className="container position-relative">
          {/* <div className="row">
            <div className="col-12">
              <div className="section-heading text-center">
                <h2 className="section-title fs-48 fw-600 m-0">
                  Cadre Strength
                </h2>
              </div>
            </div>
          </div> */}
          <div className="row common-space">
            <div className="col-12">
              <div className="table-listing table-responsive">
                <table className="table mb-0">
                  <thead className="table-thead">
                    <tr>
                      <th className="table-title  fw-600 fs-20" scope="col">
                        {lang === "hi" ? "क्रमांक" : "Sr.No."}
                      </th>
                      <th className="table-title fw-600 fs-20" scope="col">
                        {lang === "hi" ? "श्रेणी" : "Category"}
                      </th>
                      <th className="table-title fw-600 fs-20" scope="col">
                        {lang === "hi"
                          ? "स्वीकृत पद संख्या"
                          : "Sanctioned strength"}
                      </th>
                      <th className="table-title fw-600 fs-20" scope="col">
                        {lang === "hi" ? "भरे हुए" : "Filled"}
                      </th>
                      <th className="table-title fw-600 fs-20" scope="col">
                        {lang === "hi" ? "रिक्त" : "Vacant"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {apiData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item?.staff?.[lang]}</td>
                          <td>{item?.sanctionedStrength}</td>
                          <td>{item?.filled}</td>
                          <td>{item?.vacant}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <th> </th>
                      <td style={{fontWeight:"900"}}>Total</td>
                      <td style={{fontWeight:"900"}}>{totalSanctionedStrength}</td>
                      <td style={{fontWeight:"900"}}>{totalfilled}</td>
                      <td style={{fontWeight:"900"}}>{totalvacant}</td>
                    </tr>
                  </tbody>
                  <tfoot className="table-tfoot">
                    <tr>
                      <td colSpan="5" className="text-end">
                        {/* {lang === "hi" ? "दिनांक 03.02.2022 तक" : "As on 03.02.2022"} */}
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

export default CadreStrength;
