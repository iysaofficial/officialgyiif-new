import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const eventPhotos = [
  "https://res.cloudinary.com/dtik1z1qd/image/upload/v1777348018/GYIIF_IYMIA_2026-153_jj6ejy.jpg",
  "https://res.cloudinary.com/dtik1z1qd/image/upload/v1777348018/GYIIF_IYMIA_2026-121_xixdfa.jpg",
  "https://res.cloudinary.com/dtik1z1qd/image/upload/v1777348018/GYIIF_IYMIA_2026-73_w6wyvr.jpg",
  "https://res.cloudinary.com/dtik1z1qd/image/upload/v1777348018/GYIIF_IYMIA_2026-38_hbrcha.jpg",
  "https://res.cloudinary.com/dtik1z1qd/image/upload/v1777348017/GYIIF_IYMIA_2026-39_ir7y7a.jpg",
  "https://res.cloudinary.com/dtik1z1qd/image/upload/v1777348017/GYIIF_IYMIA_2026-52_iozcqx.jpg",
  "https://res.cloudinary.com/dtik1z1qd/image/upload/v1776840250/nsif_2_kood8y.jpg",
  "https://res.cloudinary.com/dtik1z1qd/image/upload/v1776840247/nsif_3_dc8pjp.jpg",
];

const afterevent = (props) => {
  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>After event</h2>
        </div>
        <div className="row">
          <div className="testimonial mx-auto text-center">
            <iframe
              width="80%"
              height="350"
              src="https://www.youtube.com/embed/VSoDE3tMVIY?si=rRO-RBrxN_sTLOvB"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Photo Slideshow Strip */}
      <div
        style={{
          background: "linear-gradient(to right, #e8e8e8 0%, #f5f5f5 50%, #e8e8e8 100%)",
          padding: "5px 0",
          marginTop: "30px",
        }}
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={"auto"}
          autoplay={{ delay: 2000 }}
          loop={true}
          style={{ padding: "5px 0" }}
        >
          {eventPhotos.map((src, i) => (
            <SwiperSlide
              key={i}
              style={{
                width: "300px",
                flexShrink: 0,
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                marginRight: "8px",
              }}
            >
              <img
                src={src}
                alt={`GYIIF IYMIA 2026 - ${i + 1}`}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  display: "block",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default afterevent;

