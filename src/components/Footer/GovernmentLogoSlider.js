import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper/modules";
import axios from "axios";

const GovernmentLogoSlider = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const IMG_BASE_URL = process.env.REACT_APP_API_BASE_URL_img;

  const [apiData, setApiData] = useState();

  const getData = async (apiName) => {
    try {
      const res = await axios.get(
        `${API_URL}/AssociatedOrganizationRoutes/get/web`,
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="gallery-section section-padding logo-section">
      <div className="government-logo-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={5}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                  },
                  576: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  992: {
                    slidesPerView: 5,
                  },
                }}
              >
                {apiData?.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <a
                        href={item?.relatedLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={`${IMG_BASE_URL}/${item?.photo}`}
                          alt={item?.photoTitle}
                          className="img-fluid"
                        />
                      </a>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernmentLogoSlider;
