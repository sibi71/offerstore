import { useRouter } from "next/router";
import React, { useContext, useRef } from "react";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

//internal import
import {storelogodata} from "../../data/localdata"
import Image from "next/image";
import { SidebarContext } from "@context/SidebarContext";
const Storelogo = () => {
  const { setIsLoading, isLoading } = useContext(SidebarContext);
  
  console.log(storelogodata);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleMoreInfo = (slug) => {
    setModalOpen(false);

    router.push(`/product/${slug}`);
    setIsLoading(!isLoading);
  };
  return (
      <>
      <Swiper
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
         
        }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        navigation={false}

        modules={[Autoplay, Pagination, Navigation]}
        
        allowTouchMove={false}
        loop={true}
      
        breakpoints={{
          // when window width is >= 640px
          375: {
            width: 375,
            slidesPerView: 2,
          },
          // when window width is >= 768px
          414: {
            width: 414,
            slidesPerView: 3,
          },
          // when window width is >= 768px
          660: {
            width: 660,
            slidesPerView: 4,
          },

          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 6,
          },

          // when window width is >= 768px
          991: {
            width: 991,
            slidesPerView: 6,
          },

          // when window width is >= 768px
          1140: {
            width: 1140,
            slidesPerView: 7,
          },
          1680: {
            width: 1680,
            slidesPerView: 8,
          },
          1920: {
            width: 1920,
            slidesPerView: 9,
          },
        }}
       
        className="mySwiper category-slider  store-slider  mx-auto"
      >

        {storelogodata.map((storelogo, i) => (
              <SwiperSlide key={i} className="group">
                <div
                  className="text-center cursor-pointer p-3  "
                >
                  <div className=" p-2 mx-auto w-60 h-60  flex justify-center items-center content-center ">
                    
                      <Image
                        src={storelogo.img}
                        alt="storelogo"
                        width="300"
                        height="300"
                        className=""
                      />
                   
                  </div>

                </div>
              </SwiperSlide>
            ))}
        {/* {error ? (
          <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
            <span> {error}</span>
          </p>
        ) : (
          <div>
           
          </div>
        )} */}
        <button ref={prevRef} className="prev">
          <IoChevronBackOutline />
        </button>
        <button ref={nextRef} className="next">
          <IoChevronForward />
        </button>
      </Swiper>
    </>
  )
}

export default Storelogo