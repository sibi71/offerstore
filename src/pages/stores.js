
import { useEffect, useRef, useMemo } from "react";
import Image from "next/image";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@component/header/PageHeader";
import CMSkeleton from "@component/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Storelogo from "@component/store/Storelogo";
import { useRouter } from "next/router";
import { SidebarContext } from "@context/SidebarContext";
import { useContext } from "react";
import ProductCard from "@component/product/ProductCard";
import ProductScreen from "./product/[slug]";
import ProductServices from "@services/ProductServices";
import AttributeServices from "@services/AttributeServices";
import FeatureCategory from "@component/category/FeatureCategory";
import Sliderbar from "@component/sliderbar/Sliderbar";
import Storecard from "@component/homeoffers/Storecard";

import { Loader } from "@googlemaps/js-api-loader";
import Homeoffers from "@component/homeoffers/Homeoffers";
import { mostviewsstore, storelogodata, storeoptiondata, storesdata } from "src/data/localdata";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";

const AboutUs = ({popularProducts}) => {
 
  const { showingTranslateValue } = useUtilsFunction();
  const { loading, error, storeCustomizationSetting } = useGetSetting();

 
  return (
    <Layout title="stores"> 
      <PageHeader
        headerBg={storeCustomizationSetting?.about_us?.header_bg}
        title={showingTranslateValue(storeCustomizationSetting?.about_us?.title)}
      />
       <div className="flex justify-between sm:justify-center   ">
       <Sliderbar />
     
              <div className="bg-gray-50 lg:py-16 py-10 mx-auto  px-3 sm:px-10">
               
                <div className="flex">
                  <div className="w-full">
                    {loading ? (
                      <CMSkeleton
                        count={20}
                        height={20}
                        error={error}
                        loading={loading}
                      />
                    ) : ( 
                      <>
                      <div className="mb-5">
                        <h2 className="mb-2 text-2xl font-semibold capitalize">Most Viewed Stores</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-3 lg:gap-5">
                        {
                          mostviewsstore.map((store ,index)=>{
                            return (
                              <div key={index} className="stores_container bg-gray-50  flex justify-items-center p-2">
                                {store?.img ? (
                                      <Image
                                        src={store.img}
                                        width={130}
                                        height={60}
                                        alt="store"
                                        className=" transition duration-150 ease-linear transform group-hover:scale-105 homeOffer_img  flex justify-items-center "
                                      />
                                    ) : (
                                      <Image
                                        src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                                        width={150}
                                        height={150}
                                        alt="store"
                                        className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
                                      />
                                    )}
                                   <div>
                                </div>
                               
                               
                              </div>
                            )
                          })
                        }
                      </div>
                      </div>
                      <div className="mb-5 flex capitalize storeoption_details ">
                        {
                          storeoptiondata.map((storeoption,index)=>{
                            return(
                              <div key={index} className="stores_option ">
                                <span className={`storesoption${index}`}>{storeoption.title}</span>
                              </div>
                            )
                          })
                        }
                      </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 md:gap-3 lg:gap-5">
                        {
                          storesdata.map((store ,index)=>{
                            return (
                              <Link href={`/${store.title}`}>
                              <div key={index} className="stores_container bg-gray-50  p-2 ">
                                {store?.img ? (
                                      <Image
                                        src={store.img}
                                        width={120}
                                        height={60}
                                        alt="store"
                                        className=" transition duration-150 ease-linear transform group-hover:scale-105 homeOffer_img "
                                      />
                                    ) : (
                                      <Image
                                        src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                                        width={150}
                                        height={150}
                                        alt="store"
                                        className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
                                      />
                                    )}
                                   <div>
                                </div>
                                <span className="store_offer ">{store.offers}</span>
                                <div className="stores_details w-28 ">
                                <h5 className="">{store.title}</h5>
                                <p>{store.offers} Coupons</p>
                                </div>
                                <span className="store_icon" ><AiOutlineHeart size={24} /></span>
                               
                              </div>
                              </Link>
                            )
                          })
                        }
                      </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
          
             </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { cookies } = context.req;
  const { query, _id } = context.query;

  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: _id ? _id : "",
      title: query ? query : "",
    }),

    AttributeServices.getShowingAttributes(),
  ]);

  const popularProducts = data?.products.filter((p) => p.prices.discount < 1);

  const discountProducts = data?.products.filter(
    (p) => p.prices?.discount >= 1
  );

  return {
    props: {
      popularProducts: popularProducts.slice(0, 50),
      discountProducts: discountProducts,
      cookies: cookies,
     attributes,
    },
  };
};


export default AboutUs;
