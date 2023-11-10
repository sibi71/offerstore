import React from "react";
import Link from "next/link";
import Image from "next/image";

//internal import
import useGetSetting from "@hooks/useGetSetting";
import CMSkeleton from "@component/preloader/CMSkeleton";
import { BsPatchCheckFill } from "react-icons/bs";

const FooterTop = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();

  return (
    <div
      id="downloadApp"
      className="bg-indigo-50 py-15 lg:py-5 bg-repeat bg-center overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 md:gap-3 lg:gap-1 items-center">
          <div className="flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-start">
            <Image
              src={
                storeCustomizationSetting?.home?.daily_need_img_left ||
                "/app-download-img-left.png"
              }
              alt="app download"
              width={600}
              height={500}
              className="block items-center"
            />
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif mb-3">
              <CMSkeleton
                count={1}
                height={30}
                // error={error}
                loading={loading}
                data={storeCustomizationSetting?.home?.daily_need_title}
              />
            </h3>
            <p className="text-base opacity-90 leading-7  p-2">
              {/* <CMSkeleton
                count={5}
                height={10}
                error={error}
                loading={loading}
                data={storeCustomizationSetting?.home?.daily_need_description}
              /> */} 
              <ul className=" flex items-start flex-col w-fit footer_mobliedowmlad ">
                <li className="flex justify-center items-center mb-1    "><BsPatchCheckFill  className="text-orange-600  m-2  "/>  <span >Buy a products with a coupons</span></li>
                <li className="flex justify-center items-center mb-1    "><BsPatchCheckFill  className="text-orange-600 m-2  "/> <span > Find offers on shops nearby</span></li>
                <li className="flex justify-center items-center mb-1    "><BsPatchCheckFill  className="text-orange-600 m-2 "/>  <span >Search across your location via application</span></li>
                <li className="flex justify-center items-center mb-1    "><BsPatchCheckFill className="text-orange-600 m-2 " />  <span >Find latest coupons and offers</span></li>
                <li className="flex justify-center items-center mb-1  "><BsPatchCheckFill className="text-orange-600 m-2 " /> <span > Share your coupons with your friends and get benefits</span></li>
              </ul>
            </p>
            <div className="mt-8">
              <Link
                href={`${storeCustomizationSetting?.home?.daily_need_app_link}`}
              >
                <a className="mx-2" target="_blank" rel="noreferrer">
                  <Image
                    width={170}
                    height={50}
                    className="mr-2 rounded-md"
                    src={
                      storeCustomizationSetting?.home?.button1_img ||
                      "/app/app-store.svg"
                    }
                    alt="app store"
                  />
                </a>
              </Link>
              <Link
                href={`${storeCustomizationSetting?.home?.daily_need_google_link}`}
              >
                <a target="_blank" rel="noreferrer">
                  {
                    <Image
                      width={170}
                      height={50}
                      src={
                        storeCustomizationSetting?.home?.button2_img ||
                        "/app/play-store.svg"
                      }
                      alt=""
                      className="block w-auto object-contain rounded-md"
                    />
                  }
                </a>
              </Link>
            </div>
          </div>
          {/* <div className="md:hidden lg:block">
            <div className="flex-grow hidden lg:flex md:flex lg:justify-end">
              <Image
                src={
                  storeCustomizationSetting?.home?.daily_need_img_right ||
                  "/app-download-img.png"
                }
                width={500}
                height={394}
                alt="app download"
                className="block w-auto"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
