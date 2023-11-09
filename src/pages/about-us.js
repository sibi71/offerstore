
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

const AboutUs = ({popularProducts}) => {
 
  
  const { loading, error, storeCustomizationSetting } = useGetSetting();

 
  return (
    <Layout title="About Us"> 
       <Storelogo />
       <div className="flex justify-between ">
       <Sliderbar />
       {storeCustomizationSetting?.home?.popular_products_status && (
              <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10">
               
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
                      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-4 gap-2 md:gap-3 lg:gap-5">
                        {popularProducts
                          ?.slice(
                            0,
                            storeCustomizationSetting?.home
                              ?.popular_product_limit
                          )
                          .map((product) => (

                            <>
                            <Storecard
                            key={product._id}
                            product={product} 
                            />
                            

                            </>
                         
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
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
