import ProductModal from '@component/modal/ProductModal';
import useGetSetting from '@hooks/useGetSetting';
import Image from 'next/image';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
const Homeoffers = ({ popularProducts }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const { loading, error, storeCustomizationSetting } = useGetSetting();

    const handleModalOpen = (event, id) => {
        setModalOpen(event);
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
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        
        allowTouchMove={false}
        loop={true}
        className="mySwiper category-slider homeoffers-slider  my-10"
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
            slidesPerView: 4,
          },

          // when window width is >= 768px
          991: {
            width: 991,
            slidesPerView: 2,
          },

          // when window width is >= 768px
          1140: {
            width: 1140,
            slidesPerView: 4,
          },
          1680: {
            width: 1680,
            slidesPerView: 3,
          },
          1920: {
            width: 1920,
            slidesPerView: 3,
          },
        }}
       
       
      >
            {popularProducts
                          ?.slice(
                            0,
                            storeCustomizationSetting?.home
                              ?.popular_product_limit
                          )
                          .map((product) => (
                            <>
                             {modalOpen && (
                                <ProductModal
                                    modalOpen={modalOpen}
                                    setModalOpen={setModalOpen}
                                    product={product}
                                    />
                                )}
                            <SwiperSlide key={product.id} className="group "   onClick={() => handleModalOpen(!modalOpen, product._id)}  >
                            <div className="text-center cursor-pointer p-3  rounded-lg">
                              <div className="bg-white p-2 mx-auto w-72 h-96 rounded-md shadow-md border-solid border-2 border-black-500" >
                                
                                  <Image
                                    src={product.image[0]}
                                    alt="storelogo"
                                    width="500"
                                    height="680"
                                    
                                  />
                               
                              </div>
            
                            </div>
                          </SwiperSlide>
                            </>
                           
                            

                           
                         
                          ))}
              
            
       
            
            
        {/* {error ? (
          <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
            <span> {error}</span>
          </p>
        ) : (
          <div>
           
          </div>
        )} */}
        <button ref={prevRef} className="prev prevhome">
          <IoChevronBackOutline />
        </button>
        <button ref={nextRef} className="next nexthome">
          <IoChevronForward />
        </button>
      </Swiper>
      </>
  )
}

export default Homeoffers