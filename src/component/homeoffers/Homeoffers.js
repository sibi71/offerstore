import ProductModal from '@component/modal/ProductModal';
import CMSkeleton from '@component/preloader/CMSkeleton';
import useGetSetting from '@hooks/useGetSetting';
import Image from 'next/image';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
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

    console.log(popularProducts);

    const handleModalOpen = (event, id) => {
        setModalOpen(event);
        console.log(id);
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
            slidesPerView: 4,
          },

          // when window width is >= 768px
          1140: {
            width: 1140,
            slidesPerView: 4,
          },
          1680: {
            width: 1680,
            slidesPerView: 5,
          },
          1920: {
            width: 1920,
            slidesPerView: 5,
          },
        }}
       
       
      >
            {popularProducts
                          ?.slice(
                            0,
                            storeCustomizationSetting?.home
                              ?.popular_product_limit
                          )
                          .map((product,index) => (
                            <>
                             {modalOpen && (
                                <ProductModal
                                    modalOpen={modalOpen}
                                    setModalOpen={setModalOpen}
                                    product={product}
                                    />
                                )}
                            <SwiperSlide key={index} className="group" >
                            <div className="text-center cursor-pointer p-3  rounded-lg capitalize "   >
                              <div className="mx-auto homeOffer_container lg:h-fit h-fit md:h-52 bg-gray-50"  >
                                
                                  <Image
                                    src={product.image[0]}
                                    alt="offers"
                                    width="300"
                                    height="350"
                                    className='homeOffer_img'
                                    onClick={() => handleModalOpen(!modalOpen, product._id)}
                                  />

                                  <div className='flex flex-col justify-start text-start  w-full px-3 pb-5 '>

                                  <div className='homeoffer_brandslogo'> 
                                  <h2 className="text-md  ">
                                    <CMSkeleton
                                      count={1}
                                      height={30}
                                      // error={error}
                                      loading={loading}
                                      data={product.title}
                                      
                                    />
                                  </h2></div>
                                 
                                  <p className='text-xs text-gray-500 mt-5'>Purchase all grocery products with more offers...</p>

                                 
                                  <button
                                onClick={() => handleAddItem(product)}
                                aria-label="cart"
                                className="h-9 w-9 flex items-center justify-center  rounded-full text-orange-600  hover:bg-orange-600 hover:text-white transition-all homeoffers_time"
                            >
                              {" "}
                              <span className="text-xl">
                                <AiOutlineHeart />
                              </span>{" "}
                            </button>
                                  </div>
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