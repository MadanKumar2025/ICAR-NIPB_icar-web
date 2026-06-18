import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function Student() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();

  const [apiData, setApiData] = useState(null);
  const [apiDataStudent, setApiDataStudent] = useState([]);
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

  const getData = async () => {
    try {
      const res = await axios.get(`${API_URL}/StudentCourse/get/web`, {
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
  const getDatastudent = async () => {
    try {
      const res = await axios.get(`${API_URL}/Student/get/web`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      // setApiData(res.data?.data || []);

      const activeData = (res.data?.data || []).filter(
        (item) => item.isActive === true,
      );

      setApiDataStudent(activeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPage();
  }, [slug]);

  useEffect(() => {
    getData();
    getDatastudent();
  }, []);
  // console.log("apiDataStudent", apiDataStudent);

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
      {/* <section className="staff-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h2 className="section-title fs-48 fw-600 m-0">
                  Meet Our Faculty 
                </h2>
              </div>
            </div>
          </div>
          <div className="row common-space row-gap">
            {apiData?.map((item, index) => {
              return (
                <div key={index} className="col-sm-6 col-lg-4 col-xl-3">
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
                          {item?.staffName?.[lang]}
                        </h3>
                        <p className="desination-title fs-16 m-0">
                          {item?.education?.[lang]}{" "}
                        </p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {apiData?.map((item, index) => {
        const studentsForCourse = apiDataStudent?.filter(
          (student) => student.studentCourse?._id === item?.id,
        );

        return (
          <section
            key={index}
            className="cadre-section section-padding body-shape position-relative"
          >
            <div className="container position-relative">
              <div className="row">
                <div className="col-12">
                  <div className="section-heading text-center">
                    <h2 className="section-title fs-3 fw-600 m-0">
                      {item?.courseName?.[lang]}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="row common-space">
                <div className="col-12">
                  <div className="table-listing table-responsive">
                    <table className="table mb-0">
                      <thead className="table-thead">
                        <tr>
                          <th className="table-title fw-600 fs-20" scope="col">
                            {lang === "hi" ? "क्रमांक" : "Sr.No."}
                          </th>
                          <th className="table-title fw-600 fs-20" scope="col">
                            {lang === "hi"
                              ? "छात्र का नाम"
                              : "Name of the Student"}
                          </th>
                          <th className="table-title fw-600 fs-20" scope="col">
                            {lang === "hi" ? "अनुक्रमांक" : "Roll No."}
                          </th>
                          <th className="table-title fw-600 fs-20" scope="col">
                            {lang === "hi"
                              ? "मार्गदर्शक का नाम"
                              : "Name of the Guide."}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="table-body">
                        {studentsForCourse?.length > 0 ? (
                          studentsForCourse.map((student, idx) => (
                            <tr key={student.id}>
                              <th scope="row">{idx + 1}</th>
                              <td className="w-50 text-wrap">
                                {student?.studentName?.[lang]}
                              </td>
                              <td className="w-25 text-wrap">
                                {student?.rollNo}
                              </td>
                              <td className="w-75 text-wrap">
                                {student?.guideName?.[lang]}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center">
                              No students enrolled
                            </td>
                          </tr>
                        )}
                      </tbody>
                      {/* <tfoot className="table-tfoot">
                        <tr>
                          <td colSpan="5" className="text-end">
                            As on 03.02.2022
                          </td>
                        </tr>
                      </tfoot> */}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default Student;
