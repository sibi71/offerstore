import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { FiMail, FiMapPin, FiBell } from "react-icons/fi";

//internal import
import Layout from "@layout/Layout";
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import { notifySuccess } from "@utils/toast";
import InputArea from "@component/form/InputArea";
import PageHeader from "@component/header/PageHeader";
import useGetSetting from "@hooks/useGetSetting";
import CMSkeleton from "@component/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ProductCard from "@component/product/ProductCard";
import ProductServices from "@services/ProductServices";
import AttributeServices from "@services/AttributeServices";
import Storelogo from "@component/store/Storelogo";
import FeatureCategory from "@component/category/FeatureCategory";
import Sliderbar from "@component/sliderbar/Sliderbar";

const ContactUs = ({discountProducts}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { showingTranslateValue } = useUtilsFunction();
  const { storeCustomizationSetting, loading, error } = useGetSetting();

  const submitHandler = () => {
    notifySuccess(
      "your message sent successfully. We will products you shortly."
    );
  };

  return (
    <Layout title="products" description="This is products  page">
         <PageHeader
        headerBg={storeCustomizationSetting?.about_us?.header_bg}
       
      />
    
    <div className="flex justify-between">
       <Sliderbar />
       {storeCustomizationSetting?.home?.discount_product_status && (
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
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2 md:gap-3 lg:gap-3">
                        {discountProducts
                          ?.slice(
                            0,
                            storeCustomizationSetting?.home
                              ?.discount_product_limit
                          )
                          .map((product) => (

                            <>
                            <ProductCard
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

  const popularProducts = data?.products;

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
export default ContactUs;
