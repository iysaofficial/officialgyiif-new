import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const galleryImages = [
  "/assets/img/slider/1-min.png",
  "/assets/img/slider/2-min.png",
  "/assets/img/slider/3-min.png",
  "/assets/img/slider/4-min.png",
  "/assets/img/slider/5-min.png",
  "/assets/img/slider/6-min.png",
  // Tambahkan path gambar lain sesuai kebutuhan
];

const GallerySlider = () => (
  <div
    style={{
      background: "linear-gradient(to right, #6372F9 0%, #5ca9fb 100%)",
      padding: "5px 0",
      marginBottom: "0",
      marginTop: "0",
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
      {galleryImages.map((src, i) => (
        <SwiperSlide
          key={i}
          style={{
            width: "230px",
            flexShrink: 0,
            borderRadius: "16px",
            overflow: "hidden",
            background: "linear-gradient(to right, #6372F9 0%, #5ca9fb 100%)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
            marginRight: "8px",
          }}
        >
          <img
            src={src}
            alt={`Gallery ${i + 1}`}
            style={{
              width: "100%",
              height: "160px",
              objectFit: "cover",
              borderRadius: "16px",
              display: "block",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default GallerySlider;