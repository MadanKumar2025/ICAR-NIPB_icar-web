import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { useLanguage } from "../LanguageContext";
import { Helmet } from "react-helmet-async";

function ContactUs() {
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
      const res = await axios.get(`${API_URL}/${apiName}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      // setApiData(res.data?.data || []);
      setApiData(res.data?.data?.[0]);
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
      <section class="contact-page-section section-padding">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="section-heading">
                <h2 class="section-title fs-48 fw-600 mb-2">
                  {lang === "hi"
                    ? "संपर्क जानकारी"
                    : "Contact Information"}{" "}
                </h2>
                <p class="section-text fs-20 secondry-text m-0">
                  {lang === "hi"
                    ? "हमारे समर्पित अधिकारियों से संपर्क करें"
                    : "Get in touch with our dedicated officials"}{" "}
                </p>
              </div>
            </div>
          </div>
          <div class="row common-space">
            <div class="col-12">
              <div class="director-column">
                {/* <div class="director-card-header">
                  <div class="card-icon">
                    <i class="fa-solid fa-user"></i>
                  </div>
                  <div class="director-besic-info">
                    <div class="director-title fs-24 fw-600">
                      Dr. Ramcharan Bhattacharya
                    </div>
                    <p class="card-designation fs-18 fw-500 text-black mb-0">
                      Director
                    </p>
                  </div>
                </div> */}
                <div class="row director-detils-row row-gap">
                  <div class="col-md-6">
                    <div class="director-single-card">
                      <div class="inner-details conact-address-card position-relative z_index1">
                        <div class="director-contact-icon">
                          <i class="fa-solid fa-map-marker-alt"></i>
                        </div>
                        <div className="contact-details-info">
                        <div class="director-address">
                          <h4 class="addess-title fw-600 fs-24">{lang === "hi" ? "पता" : "Address"}</h4>
                          <p class="m-0 fs-18 text-black">
                            {apiData?.addressLine1?.[lang]} &{" "}
                            {apiData?.addressLine2?.[lang]}
                          </p>
                        </div>
                        <div class="director-address mt-3">
                          <h4 class="addess-title fw-600 fs-24">{lang === "hi" ? "पिन कोड" : "Pin Code"}</h4>
                          <p class="m-0 fs-18 text-black">{apiData?.pinCode}</p>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="director-single-card">
                      <div class="inner-details position-relative z_index1">
                        <div class="director-contact-icon d-none"></div>
                        <div class="director-contact">
                          <h4 class="addess-title fw-600 fs-24">
                            {lang === "hi" ? "सामान्य पूछताछ" : "General Enquiry"}
                          </h4>
                          <div class="single-contact">
                            <div class="contact-title me-2 fs-17 fw-500">
                              <i class="fas fa-envelope"></i>
                            </div>
                            <div class="contct-info">
                              <a
                                href={`mailto:${apiData?.email1}`}
                                class="fs-18"
                              >
                                {apiData?.email1}
                              </a>
                              <a
                                href={`mailto:${apiData?.email2}`}
                                class="fs-18"
                              >
                                {apiData?.email2}
                              </a>
                            </div>
                          </div>
                          <div class="single-contact">
                            <div class="contact-title me-2 fs-17 fw-500">
                              <i class="fas fa-phone"></i>
                            </div>
                            <div class="contct-info">
                              <span class="fs-18">
                                {" "}
                                {apiData?.contactNumber}
                              </span>
                            </div>
                          </div>

                          <div class="single-contact contact-social-media">
                            <a href={apiData?.instagramLink} target="_blank">
                              <div class="contact-title  fs-17 fw-500">
                                <i class="fab fa-instagram"></i>
                              </div>
                            </a>
                            <a href={apiData?.youtubeLink} target="_blank">
                              <div class="contact-title  fs-17 fw-500">
                                <i class="fab fa-youtube"></i>
                              </div>{" "}
                            </a>
                            <a href={apiData?.linkedinLink} target="_blank">
                              <div class="contact-title  fs-17 fw-500">
                                <i class="fab fa-linkedin"></i>
                              </div>
                            </a>
                            <a href={apiData?.twitterLink} target="_blank">
                              <div class="contact-title  fs-17 fw-500">
                                <i class="fab fa-twitter"></i>
                              </div>
                            </a>
                            <a href={apiData?.facebookLink} target="_blank">
                              <div class="contact-title  fs-17 fw-500">
                                <i class="fab fa-facebook"></i>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {apiData?.googleMapLink && (
                    <iframe
                      src={apiData.googleMapLink}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Google Map"
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <div class="row row-gap mt-5">
            <div class="col-sm-6 col-xl-3">
              <div class="officer-card h-100">
                <div class="inner-officer-card">
                  <div class="officer-header">
                    <div class="officer-icon">
                      <i class="fas fa-user"></i>
                    </div>
                    <div class="officer-besic-info position-relative z_index1">
                      <h5 class="officer-title m-0 fw-600 fs-22">
                        Mr. Sumit Singh
                      </h5>
                      <p class="mb-0 officer-designation fs-16">
                        Senior Administrative Officer
                      </p>
                    </div>
                  </div>
                  <div class="officer-details">
                    <div class="officer-contact">
                      <div class="single-content">
                        <div class="contct-icon">
                          <i class="fas fa-phone fs-18"></i>
                        </div>
                        <div class="contact-info">
                          <p class="m-0 fs-16">
                            011-25843533, 011-25841787, 25842789 (Ext 295)
                          </p>
                        </div>
                      </div>
                      <div class="single-content">
                        <div class="contct-icon">
                          <i class="fas fa-envelope fs-18"></i>
                        </div>
                        <div class="contact-info">
                          <a
                            href="mailto:sumit.singh@icar.gov.in"
                            class="fs-16 m-0"
                          >
                            sumit.singh@icar.gov.in
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="officer-card h-100">
                <div class="inner-officer-card">
                  <div class="officer-header">
                    <div class="officer-icon">
                      <i class="fas fa-user"></i>
                    </div>
                    <div class="officer-besic-info position-relative z_index1">
                      <h5 class="officer-title m-0 fw-600 fs-22">
                        Mr. Rahul Kumar
                      </h5>
                      <p class="mb-0 officer-designation fs-16">
                        Senior Finance and Accounts Officer
                      </p>
                    </div>
                  </div>
                  <div class="officer-details">
                    <div class="officer-contact">
                      <div class="single-content">
                        <div class="contct-icon">
                          <i class="fas fa-phone fs-18"></i>
                        </div>
                        <div class="contact-info">
                          <p class="m-0 fs-16">
                            011-25842126, 011-25841787, 25842789 (Ext 292)
                          </p>
                        </div>
                      </div>
                      <div class="single-content">
                        <div class="contct-icon">
                          <i class="fas fa-envelope fs-18"></i>
                        </div>
                        <div class="contact-info">
                          <a
                            href="mailto:rahul.kumar@icar.gov.in"
                            class="fs-16 m-0"
                          >
                            rahul.kumar@icar.gov.in
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="officer-card h-100">
                <div class="inner-officer-card">
                  <div class="officer-header">
                    <div class="officer-icon">
                      <i class="fas fa-user"></i>
                    </div>
                    <div class="officer-besic-info position-relative z_index1">
                      <h5 class="officer-title m-0 fw-600 fs-22">
                        Mrs. Sangeeta Jain
                      </h5>
                      <p class="mb-0 officer-designation fs-16">
                        Assistant Administrative Officer
                      </p>
                    </div>
                  </div>
                  <div class="officer-details">
                    <div class="officer-contact">
                      <div class="single-content">
                        <div class="contct-icon">
                          <i class="fas fa-phone fs-18"></i>
                        </div>
                        <div class="contact-info">
                          <p class="m-0 fs-16">
                            011-25842150, 011-25841787, 25842789 (Ext 293)
                          </p>
                        </div>
                      </div>
                      <div class="single-content">
                        <div class="contct-icon">
                          <i class="fas fa-envelope fs-18"></i>
                        </div>
                        <div class="contact-info">
                          <a href="mailto:aao@nrcpb.org" class="fs-16 m-0">
                            aao@nrcpb.org
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="officer-card h-100">
                <div class="inner-officer-card">
                  <div class="officer-header">
                    <div class="officer-icon">
                      <i class="fas fa-user"></i>
                    </div>
                    <div class="officer-besic-info position-relative z_index1">
                      <h5 class="officer-title m-0 fw-600 fs-22">
                        Mr. Vipin Kumar
                      </h5>
                      <p class="mb-0 officer-designation fs-16">
                        Assistant Administrative Officer
                      </p>
                    </div>
                  </div>
                  <div class="officer-details">
                    <div class="officer-contact">
                      <div class="single-content">
                        <div class="contct-icon">
                          <i class="fas fa-phone fs-18"></i>
                        </div>
                        <div class="contact-info">
                          <p class="m-0 fs-16">
                            011-25842150, 25841787 (Ext 324)
                          </p>
                        </div>
                      </div>
                      <div class="single-content">
                        <div class="contct-icon">
                          <i class="fas fa-envelope fs-18"></i>
                        </div>
                        <div class="contact-info">
                          <a
                            href="mailto:vipin.kumar1@icar.gov.in"
                            class="fs-16 m-0"
                          >
                            vipin.kumar1@icar.gov.in
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
