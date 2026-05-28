import axios from "axios";
import { useEffect, useState } from "react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Parallax,
  EffectFade,
} from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useLanguage } from "../LanguageContext";

function Banner() {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;
  const { lang } = useLanguage();

  const [bannerData, setBannerData] = useState([]);

  const getBanner = async () => {
    try {
      const response = await axios.get(`${API_URL}/BannerRoutes/get/web`);
      const activeData = (response.data?.data || []).filter(
        (item) => item.isActive === true,
      );
      setBannerData(activeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <section className="hero-slider hero-style">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Parallax, EffectFade]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="swiper-container"
      >
        {bannerData?.map((item, index) => (
          <SwiperSlide key={item?.id || index}>
            <div
              className="slide-inner slide-bg-image d-flex align-items-center justify-content-center"
              style={{
                backgroundImage: `url(${IMG_BASE_URL}/${item?.bannerImage})`,
              }}
            >
              <div className="container">
                <div className="slider-content">
                  <div className="slide-title">
                    <h1 className="banner-slider-title fw-500 text-white">
                      {item?.title?.[lang]}
                    </h1>
                  </div>

                  <div className="slide-text">
                    <p className="banner-slider-text text-white fs-18">
                      {item?.subTitle?.[lang]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-prev">
        <i className="fa-solid fa-chevron-left"></i>
      </div>

      <div className="custom-next">
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </section>
  );
}

export default Banner;
