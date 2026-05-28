import axios from "axios";
import { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import { useNavigate } from "react-router-dom";

function Album() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();

  const [AlbumData, setAlbumData] = useState();
  const navigate = useNavigate();

  const getAlbum = async (page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/album/get/web`);
      const activeData = (response?.data?.data || []).filter(
        (item) => item.isActive === true && item.type?.en === "Album",
      );

      setAlbumData(activeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAlbum();
  }, []);

  // console.log("AlbumData", AlbumData);

  const handlePageClick = async (id) => {
    try {
      const res = await axios.get(
        `${API_URL}/pages/get/web/6a0ab96f07b0993cce5eec2a`,
      );

      const slug = res?.data?.data?.slug;
      if (slug) {
        navigate(`/${slug}/gallery/${id}`);
      }
    } catch (error) {
      console.error("Error fetching page slug:", error);
    }
  };

  const handlePageClickAllAlbuma = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/pages/get/web/${id}`);

      const slug = res?.data?.data?.slug;
      if (slug) {
        navigate(`/${slug}`);
      }
    } catch (error) {
      console.error("Error fetching page slug:", error);
    }
  };
  return (
    <>
      <section className="gallry-section section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div class="gallery-heading-area align-items-center">
                <div className="section-heading">
                  <h2 className="section-title fs-48 fw-600 mb-2">
                    {lang === "hi" ? "हमारी गैलरी" : "Our Gallery"}
                  </h2>
                </div>
                <a
                  onClick={() =>
                    handlePageClickAllAlbuma("6a0ad53107b0993cce5f0ee6")
                  }
                  className="common-btn btn-style-one"
                >
                  <span className="btn-static-text">
                    {lang === "hi" ? "सब देखें" : "View All"}
                  </span>
                  <span className="btn-arrow">
                    <i className="fa-solid fa-arrow-right-long"></i>{" "}
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="row common-space gallery-row">
            {/* {AlbumData?.data?.map((item, index) => (
              <div className="col-md-3" key={item.id || index}>
                <img
                  src={`${IMG_BASE_URL}/${item?.coverPic}`}
                  className="gallery-img"
                  alt="gallery"
                />
              </div>
            ))} */}
            {AlbumData?.slice(0, 4).map((item, index) => (
              <div
                className="col-sm-6 col-lg-3 gallery-col"
                key={item.id || index}
                onClick={() => handlePageClick(item?.id)}
              >
               <div className="gallery-area h-100 overflow-hidden">
                 <div class="gallery-image-area overflow-hidden">
                  <img
                    src={`${IMG_BASE_URL}/${item?.coverPic}`}
                    className="gallery-img"
                    alt="gallery"
                  />
                </div>
                <p className="desination-title fs-16 fw-500 m-0 slow-effect">
                  {item?.title?.[lang]}
                </p>
               </div>
              </div>
            ))}
            {/* <div className="col-md-3">
              <img src="images/gallery/image2.jpg" className="gallery-img" />
            </div>
            <div className="col-md-3">
              <img src="images/gallery/image3.jpg" className="gallery-img" />
            </div>
            <div className="col-md-3">
              <img src="images/gallery/image4.jpg" className="gallery-img" />
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Album;
