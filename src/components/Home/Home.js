import { Link, useNavigate } from "react-router-dom";
import Album from "../Album/Album";
import Director from "../Director/Director";
import NewsBox from "../NewsBox/NewsBox";
import Banner from "./Banner";
import axios from "axios";
import { useLanguage } from "../LanguageContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Home() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [Popup, setPopup] = useState([]);

  const getPopup = async () => {
    try {
      const res = await axios.get(`${API_URL}/PopupRoutes/get/web`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      const currentTime = new Date();

      const activeData = (res.data?.data || []).filter((item) => {
        const start = item.startTime ? new Date(item.startTime) : null;
        const end = item.endTime ? new Date(item.endTime) : null;

        return (
          item.isActive === true &&
          (!start || currentTime >= start) &&
          (!end || currentTime <= end)
        );
      });
      setPopup(activeData);
      showPopupsOneByOne(activeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showPopupsOneByOne = async (data) => {
    for (const item of data) {
      await new Promise((resolve) => {
        Swal.fire({
          customClass: {
            popup: "my-swal-popup onload-page-popup",
          },
          html: `
          <div class="popup-card-box" onclick="${item.url ? `window.open('${item.url}', '_blank')` : ""}">
          <div  class="popup-image-wrapper" style="text-align:center;display: flex;
                justify-content: center; cursor:pointer"  >
            <img class="w-100"
              src="${IMG_BASE_URL}/${item.photo}" />
          </div>
           ${item.title ? `<p class="popup-card-title">${item.title}</p>` : ""}
           </div>
        `,
          showCloseButton: true,
          showConfirmButton: false,
          allowOutsideClick: true,

          didClose: () => {
            resolve();
          },
        });
      });
    }
  };

  useEffect(() => {
    getPopup();
  }, []);

  // this is use for get slug
  const handlePageClick = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/pages/get/web/${id}`);

      const slug = res?.data?.data?.slug;
      // const designTemplate = res?.data?.data?.designTemplate?._id;

      if (slug) {
        navigate(`/${slug}`);
      }
    } catch (error) {
      console.error("Error fetching page slug:", error);
    }
  };

  const publicationResearchTitle =
    lang === "hi" ? "प्रकाशन / अनुसंधान" : "Publication / Research";
  const instituteDescription =
    lang === "hi"
      ? "राष्ट्रीय पादप जैव प्रौद्योगिकी संस्थान को फसल सुधार के लिए जैव प्रौद्योगिकी में नए उपकरण और तकनीक विकसित करने तथा महत्वपूर्ण उपलब्धियाँ प्राप्त करने की जिम्मेदारी सौंपी गई है।"
      : "National Institute For Plant Biotechnology has been entrusted with the responsibility of developing new tools and techniques and to deliver breakthrough in biotechnology for crop improvement.";
  return (
    <>
      <div className="headerOverlay"></div>
      <div className="main-wrapper">
        <Banner />
        <Director />
        <section className="research-section position-relative overflow-hidden">
          <div className="research-top-shape">
            <img src="images/shape/shape1_left.png" alt="" />
          </div>
          <div className="container position-relative z_index1">
            <div className="row align-items-center gy-3">
              <div className="col-lg-12">
                <div className="section-heading">
                  <h2 className="section-title fs-48 fw-600 mb-2">
                    {lang === "hi"
                      ? "पादप जैव प्रौद्योगिकी एवं अनुसंधान क्षेत्र"
                      : "Plant Biotechnology & Research Areas"}{" "}
                  </h2>
                  <p className="section-text fs-20 secondry-text m-0">
                    {lang === "hi"
                      ? "जीनोमिक्स और जैव प्रौद्योगिकी में तीव्र प्रगति ने फसल सुधार में क्रांतिकारी परिवर्तन किया है, जिससे उपज, तनाव सहनशीलता और पोषण गुणवत्ता से संबंधित जीनों की सटीक पहचान संभव हुई है। हालांकि, जलवायु परिवर्तन, उभरते रोगजनकों और घटती आनुवंशिक विविधता जैसी चुनौतियाँ उन्नत ओमिक्स तकनीकों और नवीन प्रजनन रणनीतियों के एकीकरण की मांग करती हैं। आईसीएआर-एनआईपीबी, दिल्ली में अनुसंधान का मुख्य केंद्र जीन खोज, क्रियात्मक जीनोमिक्स, जीनोम विश्लेषण, आनुवंशिक संशोधन और मेटाबोलोमिक्स पर है, ताकि फसलों की क्षमता और उनकी सहनशीलता को बढ़ाया जा सके।"
                      : "Rapid advances in genomics and biotechnology have revolutionized crop improvement by enabling precise identification of genes for yield, stress tolerance, and nutritional quality. However, challenges such as climate change, emerging pathogens, and declining genetic diversity demand integration of advanced omics and innovative breeding strategies. Research at ICAR-NIPB, Delhi focuses on gene discovery, functional genomics, genome analysis, genetic modification, and metabolomics to enhance crop potential and resilience. "}
                  </p>
                </div>
              </div>
              {/* <div className="col-lg-4">
                <a
                  onClick={() => handlePageClick("6a11796cd5ca81e12de72558")}
                  className="common-btn btn-style-one ms-lg-auto"
                >
                  <span className="btn-static-text">
                    {lang === "hi" ? "अनुसंधान देखें" : "Explore Research"}
                  </span>
                  <span className="btn-arrow">
                    <i className="fa-solid fa-arrow-right-long"></i>
                  </span>
                </a>
              </div> */}
            </div>
            <div className="row common-space row-gap">
              <div className="col-sm-6 col-xl-3">
                <div className="research-box h-100 slow-effect hover-effect text-center">
                  <a className="research-links fs-22 fw-500 d-block" href="#">
                    {lang === "hi" ? "जीन की खोज" : "Gene discovery"}
                  </a>
                  <div className="research-content">
                    <div className="research-image-area image-effect position-relative">
                      <img src="images/resources/crop_improvement.png" alt="" />
                    </div>
                    <p className="research-text m-0 mt-3 fs-15">
                      {lang === "hi"
                        ? "उच्च उपज और जलवायु-प्रतिरोधी फसल किस्मों का विकास"
                        : "Developing high-yield and climate-resilient crop varieties"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="research-box h-100 slow-effect hover-effect text-center">
                  <a className="research-links fs-22 fw-500 d-block" href="#">
                    {lang === "hi" ? "आनुवंशिक संशोधन" : "Genetic modification"}
                  </a>
                  <div className="research-content">
                    <div className="research-image-area image-effect position-relative">
                      <img src="images/resources/crop_improvement.png" alt="" />
                    </div>
                    <p className="research-text m-0 mt-3 fs-15">
                      {lang === "hi"
                        ? "आनुवंशिक इंजीनियरिंग, आणविक मार्कर, डीएनए विश्लेषण"
                        : "Genetic engineering, molecular markers, DNA analysis"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="research-box h-100 slow-effect hover-effect text-center">
                  <a className="research-links fs-22 fw-500 d-block" href="#">
                    {lang === "hi" ? "जीनोम विश्लेषण" : "Genome analysis "}
                  </a>
                  <div className="research-content">
                    <div className="research-image-area image-effect position-relative">
                      <img src="images/resources/crop_improvement.png" alt="" />
                    </div>
                    <p className="research-text m-0 mt-3 fs-15">
                      {lang === "hi"
                        ? "परिवर्तनशील पर्यावरणीय परिस्थितियों के लिए सतत समाधान"
                        : "Sustainable solutions for changing environmental conditions"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="research-box h-100 slow-effect hover-effect text-center">
                  <a className="research-links fs-22 fw-500 d-block" href="#">
                    {lang === "hi"
                      ? "खोज के लिए पाथवे विश्लेषण"
                      : " Pathway analysis for discovery"}
                  </a>
                  <div className="research-content">
                    <div className="research-image-area image-effect position-relative">
                      <img src="images/resources/crop_improvement.png" alt="" />
                    </div>
                    <p className="research-text m-0 mt-3 fs-15">
                      {lang === "hi"
                        ? "भविष्य की पीढ़ियों के लिए पादप विविधता का संरक्षण"
                        : "Preservation of plant diversity for future generations"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="research-bottom-shape">
            <img src="images/shape/shape1_right.png" alt="" />
          </div>
        </section>
        <NewsBox />
        <section className="programs-section section-padding position-relative">
          <div className="bg-shape"></div>
          <div className="container position-relative z_index1">
            <div className="row">
              <div className="col-lg-7">
                <div className="section-heading">
                  <div className="white-sub-title d-flex flex-wrap align-items-center gap-2 mb-2">
                    <span className="mini-logo d-inline-flex justify-content-center align-items-center bg-white">
                      <img src="images/resources/mini_logo.png" alt="" />
                    </span>
                    <span className="sub-heading-text fs-16 fw-500 ">
                      {lang === "hi"
                        ? "शिक्षा एवं प्रशिक्षण"
                        : "Education & Training"}
                    </span>
                  </div>
                  <h2 className="section-title fs-48 text-white fw-600 m-0">
                    {lang === "hi"
                      ? "शैक्षणिक कार्यक्रम एवं प्रशिक्षण"
                      : "Academic Programs & Training"}
                  </h2>
                </div>
              </div>
              <div className="col-lg-4 offset-lg-1">
                <p className="m-0 text-white">
                  {lang === "hi"
                    ? "संस्थान पादप जैव प्रौद्योगिकी और कृषि विज्ञान में स्नातकोत्तर शिक्षा एवं विशेष प्रशिक्षण कार्यक्रम प्रदान करता है।"
                    : "The institute offers postgraduate education and specialized training programs in plant biotechnology and agricultural sciences."}
                </p>
              </div>
            </div>
            <div className="row common-space row-gap">
              <div className="col-md-6 col-lg-4">
                <div className="programs-box h-100">
                  <div className="program-image-area text-center position-relative">
                    <img src="images/resources/msc_phd_programs.png" alt="" />
                  </div>
                  <div className="program-info-area text-center">
                    <h5 className="program-box-title fs-25 slow-effect">
                      {lang === "hi"
                        ? "एमएससी / पीएचडी कार्यक्रम"
                        : "MSc / PhD Programs"}
                    </h5>
                    <a className="common-btn btn-style-one mx-auto">
                      <span className="btn-static-text">
                        {lang === "hi" ? "अधिक विवरण" : "More Details"}
                      </span>
                      <span className="btn-arrow">
                        <i className="fa-solid fa-arrow-right-long"></i>{" "}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="programs-box h-100">
                  <div className="program-image-area text-center position-relative">
                    <img
                      src="images/resources/research_fellowships.png"
                      alt=""
                    />
                  </div>
                  <div className="program-info-area text-center">
                    <h5 className="program-box-title fs-25 slow-effect">
                      {lang === "hi"
                        ? "अनुसंधान फेलोशिप"
                        : "Research Fellowships"}
                    </h5>
                    <a className="common-btn btn-style-one mx-auto">
                      <span className="btn-static-text">
                        {lang === "hi" ? "अधिक विवरण" : "More Details"}
                      </span>
                      <span className="btn-arrow">
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-md-6 col-lg-4"
                onClick={() => handlePageClick("6a224c44f2fcc50bcfa6ed73")}
              >
                <div className="programs-box h-100">
                  <div className="program-image-area text-center position-relative">
                    <img src="images/resources/training_programs.png" alt="" />
                  </div>
                  <div className="program-info-area text-center">
                    <h5 className="program-box-title fs-25 slow-effect">
                      {lang === "hi"
                        ? "प्रशिक्षण कार्यक्रम"
                        : "Training Programs"}
                    </h5>
                    <a className="common-btn btn-style-one mx-auto">
                      <span className="btn-static-text">
                        {lang === "hi" ? "अधिक विवरण" : "More Details"}
                      </span>
                      <span className="btn-arrow">
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="publication-section section-padding pb-0">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-heading text-center">
                  <h2 className="section-title fs-48 fw-600 m-0">
                    {publicationResearchTitle}
                  </h2>
                </div>
              </div>
            </div>
            <div className="row common-space row-gap">
              <div
                onClick={() => handlePageClick("69fd5fcee54a380e472cd21c")}
                className="col-sm-6 col-lg-3"
                style={{ cursor: "pointer" }}
              >
                <div className="publication-box position-relative">
                  <img
                    src="images/resources/research_publications.jpg"
                    alt=""
                  />
                  <a className="publication-title position-absolute text-white fs-20 ">
                    {lang === "hi"
                      ? "अनुसंधान प्रकाशन"
                      : "Research Publications"}
                  </a>
                </div>
              </div>
              <div
                className="col-sm-6 col-lg-3"
                style={{ cursor: "pointer" }}
                onClick={() => handlePageClick("69fd7240e54a380e472ce487")}
              >
                <div className="publication-box position-relative">
                  <img src="images/resources/annual_reports.jpg" alt="" />
                  <a className="publication-title position-absolute text-white fs-20 ">
                    {lang === "hi" ? "वार्षिक रिपोर्ट" : "Annual Reports"}
                  </a>
                </div>
              </div>
              <div
                className="col-sm-6 col-lg-3"
                style={{ cursor: "pointer" }}
                onClick={() => handlePageClick("69fd74e7e54a380e472cebca")}
              >
                <div className="publication-box position-relative">
                  <img src="images/resources/newsletter.jpg" alt="" />
                  <a className="publication-title position-absolute text-white fs-20 ">
                    {lang === "hi" ? "समाचार पत्रिका" : "Newsletter"}
                  </a>
                </div>
              </div>
              <div
                className="col-sm-6 col-lg-3"
                style={{ cursor: "pointer" }}
                onClick={() => handlePageClick("69fd78fde54a380e472ceec6")}
              >
                <div className="publication-box position-relative">
                  <img src="images/resources/other.jpg" alt="" />
                  <a className="publication-title position-absolute text-white fs-20 ">
                    {lang === "hi" ? "अन्य" : "Other"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="achievements-section section-padding">
          <div className="container">
            <div className="inner-achievements">
              <div className="row">
                <div className="col-lg-6">
                  <div className="achievement-image h-100">
                    <img
                      className="w-100"
                      src="images/resources/achievement_bg.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="achievement-content h-100">
                    <div className="section-heading">
                      <div className="sub-title theme-bg d-flex flex-wrap align-items-center gap-2 mb-2">
                        <span className="mini-logo d-inline-flex justify-content-center align-items-center bg-white">
                          <img src="images/resources/mini_logo.png" alt="" />
                        </span>
                        <span className="sub-heading fs-16 fw-500 ">
                          {lang === "hi"
                            ? "उपलब्धियाँ एवं मुख्य बिंदु"
                            : "Achievements & Highlights"}
                        </span>
                      </div>
                      <h2 className="section-title fs-48 fw-600 mb-2">
                        {lang === "hi"
                          ? "संस्थागत उपलब्धियाँ और मील के पत्थर"
                          : "Institutional Achievements and Milestones"}
                      </h2>
                    </div>
                    <div className="funfact-section">
                      <div className="funfact-box">
                        <div className="research-icon">
                          <img
                            className="slow-effect icon-effect1"
                            src="images/icons/crop_inprovement.svg"
                            alt=""
                          />
                        </div>
                        <div className="counter-info">
                          <h2
                            className="counter fs-30 fw-600 mb-0"
                            data-target="300"
                          >
                            41
                          </h2>
                          <span>+</span>
                        </div>
                        <div className=" fs-18 fw-500">
                          {lang === "hi"
                            ? "उत्कृष्टता के वर्ष"
                            : "Years of Excellence"}
                        </div>
                      </div>
                      <div className="funfact-box">
                        <div className="research-icon">
                          <img
                            className="slow-effect icon-effect1"
                            src="images/icons/crop_inprovement.svg"
                            alt=""
                          />
                        </div>
                        <div className="counter-info">
                          <h2
                            className="counter fs-30 fw-600 mb-0"
                            data-target="150"
                          >
                            46
                          </h2>
                          <span>+</span>
                        </div>
                        <div className=" fs-18 fw-500">
                          {lang === "hi"
                            ? "वित्तपोषित अनुसंधान परियोजनाएँ"
                            : "Funded Research Projects"}
                        </div>
                      </div>
                      <div className="funfact-box">
                        <div className="research-icon">
                          <img
                            className="slow-effect icon-effect1"
                            src="images/icons/crop_inprovement.svg"
                            alt=""
                          />
                        </div>
                        <div className="counter-info">
                          <h2
                            className="counter fs-30 fw-600 mb-0"
                            data-target="300"
                          >
                            2000 
                          </h2>
                          <span>+</span>
                        </div>
                        <div className=" fs-18 fw-500">
                          {lang === "hi"
                            ? "वैज्ञानिक प्रकाशन"
                            : "Scientific Publications"}
                        </div>
                      </div>
                      <div className="funfact-box">
                        <div className="research-icon">
                          <img
                            className="slow-effect icon-effect1"
                            src="images/icons/crop_inprovement.svg"
                            alt=""
                          />
                        </div>
                        <div className="counter-info">
                          <h2
                            className="counter fs-30 fw-600 mb-0"
                            data-target="50"
                          >
                            0
                          </h2>
                          <span>+</span>
                        </div>
                        <div className=" fs-18 fw-500">
                          {lang === "hi"
                            ? "वैश्विक सहयोग"
                            : "Global Collaborations"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="institute-section position-relative overflow-hidden section-padding">
          <div className="institute-top-shape">
            <img src="images/shape/shape2_right.png" alt="" />
          </div>
          <div className="container position-relative z_index1">
            <div className="row">
              <div className="col-md-9 mx-auto">
                <div className="section-heading">
                  <p className="section-text fs-20 secondry-text text-center m-0">
                    {instituteDescription}
                  </p>
                </div>
              </div>
            </div>
            <div className="row common-space row-gap institute-row">
              <div className="col-sm-6 col-lg-4 institute-col">
                <div className="institute-box text-center h-100 slow-effect hover-effect">
                  <div className="institute-icon">
                    <img
                      className="slow-effect icon-effect1"
                      src="images/icons/student_corner.svg"
                      alt=""
                    />
                  </div>
                  <p className="institute-title fs-22 fw-500 d-block">
                    {lang === "hi" ? "छात्र कोना" : "Student Corner"}
                  </p>
                  <a href="#" className="common-btn btn-white mx-auto">
                    <span className="btn-static-text">
                      {/* {lang === "hi" ? "अनुसंधान देखें" : "Explore Research"} */}
                      {lang === "hi" ? "देखें" : "Explore"}
                    </span>
                    <span className="btn-arrow">
                      <i className="fa-solid fa-arrow-right-long"></i>
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 institute-col">
                <div className="institute-box text-center h-100 slow-effect hover-effect">
                  <div className="institute-icon">
                    <img
                      className="slow-effect icon-effect1"
                      src="images/icons/student_corner.svg"
                      alt=""
                    />
                  </div>
                  <p className="institute-title fs-22 fw-500 d-block">
                    {lang === "hi" ? "कर्मचारी कोना" : "Staff Corner"}{" "}
                  </p>
                  <Link
                    // onClick={() => handlePageClick("69fec96a5dda769842169c67")}
                    onClick={() => handlePageClick("6a1150b0d5ca81e12de702d4")}
                    className="common-btn btn-white mx-auto"
                  >
                    <span className="btn-static-text">
                      {lang === "hi" ? "देखें" : "Explore"}
                    </span>
                    <span className="btn-arrow">
                      <i className="fa-solid fa-arrow-right-long"></i>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 institute-col">
                <div className="institute-box text-center h-100 slow-effect hover-effect">
                  <div className="institute-icon">
                    <img
                      className="slow-effect icon-effect1"
                      src="images/icons/student_corner.svg"
                      alt=""
                    />
                  </div>
                  <p className="institute-title fs-22 fw-500 d-block">
                    {lang === "hi" ? "आउटरीच कार्यक्रम" : "Outreach Programme"}
                  </p>
                  <Link
                    onClick={() => handlePageClick("6a0d2ff8cb0e96c74657f31d")}
                    className="common-btn btn-white mx-auto"
                  >
                    <span className="btn-static-text">
                      {lang === "hi" ? "देखें" : "Explore"}
                    </span>
                    <span className="btn-arrow">
                      <i className="fa-solid fa-arrow-right-long"></i>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 institute-col">
                <div className="institute-box text-center h-100 slow-effect hover-effect">
                  <div className="institute-icon">
                    <img
                      className="slow-effect icon-effect1"
                      src="images/icons/student_corner.svg"
                      alt=""
                    />
                  </div>
                  <p className="institute-title fs-22 fw-500 d-block">
                    {lang === "hi" ? "समितियाँ" : "Committees"}
                  </p>
                  <Link
                    onClick={() => handlePageClick("69feccdc5dda76984216a252")}
                    className="common-btn btn-white mx-auto"
                  >
                    <span className="btn-static-text">
                      {lang === "hi" ? "देखें" : "Explore"}
                    </span>
                    <span className="btn-arrow">
                      <i className="fa-solid fa-arrow-right-long"></i>{" "}
                    </span>
                  </Link>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 institute-col">
                <div className="institute-box text-center h-100 slow-effect hover-effect">
                  <div className="institute-icon">
                    <img
                      className="slow-effect icon-effect1"
                      src="images/icons/student_corner.svg"
                      alt=""
                    />
                  </div>
                  <p className="institute-title fs-22 fw-500 d-block">
                    {lang === "hi"
                      ? "एसएआईएफ @ आईसीएआर-एनआईपीबी"
                      : "SAIF @ICAR-NIPB"}
                  </p>
                  <Link
                    onClick={() => handlePageClick("69fece065dda76984216a5a0")}
                    className="common-btn btn-white mx-auto"
                  >
                    <span className="btn-static-text">
                      {lang === "hi" ? "देखें" : "Explore"}
                    </span>
                    <span className="btn-arrow">
                      <i className="fa-solid fa-arrow-right-long"></i>{" "}
                    </span>
                  </Link>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 institute-col">
                <div className="institute-box text-center h-100 slow-effect hover-effect">
                  <div className="institute-icon">
                    <img
                      className="slow-effect icon-effect1"
                      src="images/icons/student_corner.svg"
                      alt=""
                    />
                  </div>
                  <p className="institute-title fs-22 fw-500 d-block">
                    {lang === "hi" ? "सूचना का अधिकार" : "RTI"}{" "}
                  </p>
                  <Link
                    onClick={() => handlePageClick("69fecf8d5dda76984216aa1d")}
                    className="common-btn btn-white mx-auto"
                  >
                    <span className="btn-static-text">
                      {lang === "hi" ? "देखें" : "Explore"}
                    </span>
                    <span className="btn-arrow">
                      <i className="fa-solid fa-arrow-right-long"></i>{" "}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="institute-bottom-shape">
            <img src="images/shape/shape2_left.png" alt="" />
          </div>
        </section>
        <Album />
      </div>
    </>
  );
}

export default Home;
