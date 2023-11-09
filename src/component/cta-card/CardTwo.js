import React from "react";
import Image from "next/image";
import Link from "next/link";

//internal import
import useGetSetting from "@hooks/useGetSetting";
import CMSkeleton from "@component/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const CardTwo = () => {
  const { storeCustomizationSetting, error, loading } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <>
      <div className="w-full bg-blue-600 shadow-sm lg:px-10 lg:py-10 p-6 ">
        <div className="flex justify-between items-center text-gray-50">
          <div className="lg:w-4/6 2xl:4/6" >
            <span className="text-base lg:text-lg ">
              <CMSkeleton
                count={1}
                height={20}
                error={error}
                loading={loading}
                data={storeCustomizationSetting?.home?.quick_delivery_subtitle}
              />
            </span>
            <h2 className="font-serif text-lg lg:text-2xl font-bold mb-1 ">
              <CMSkeleton
                count={1}
                height={30}
                error={error}
                loading={loading}
                data={storeCustomizationSetting?.home?.quick_delivery_title}
              />
            </h2>
            <p className="text-sm font-sans leading-6">
              <CMSkeleton
                count={4}
                height={20}
                error={error}
                loading={loading}
                data={
                  storeCustomizationSetting?.home?.quick_delivery_description
                }
              />
            </p>
         
          </div>
          <div className="w-1/5 flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-center">
            {/* <Image
              width={373}
              height={250}
              alt="Quick Delivery to Your Home"
              className="block w-auto object-contain"
              src={
                storeCustomizationSetting?.home?.quick_delivery_img ||
                "/cta/delivery-boy.png"
              }
            /> */}
               <Link
              href={`${storeCustomizationSetting?.home?.quick_delivery_link}`}
            >
              <a
                className="lg:w-2/3 2xl:w-1/2  text-md font-serif font-medium inline-block  px-10 py-3 bg-emerald-500 text-center text-white rounded-full hover:text-white contact-btn"
                target="_blank"
              >
                {showingTranslateValue(
                  storeCustomizationSetting?.home?.quick_delivery_button
                )}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTwo;
