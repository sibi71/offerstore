//internal import
import Layout from "@layout/Layout";
import Coupon from "@component/coupon/Coupon";
import PageHeader from "@component/header/PageHeader";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { storesdata } from "src/data/localdata";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ProductServices from "@services/ProductServices";
import AttributeServices from "@services/AttributeServices";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import OfferCardTwo from "@component/offer/OfferCardTwo";
import ProductCard from "@component/product/ProductCard";
import CMSkeleton from "@component/preloader/CMSkeleton";

const Offer = ({ popularProducts, discountProducts, attributes }) => {
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
      "your message sent successfully. We will offers you shortly."
    );
  };

  return (
    <Layout title="My Favourites" description="this is My Favourites page">
      <div className="flex justify-center items-center flex-col ">
        {/* fav stores */}
        <div className="text-xl font-medium capitalize py-10 px-3 sm:px-10">
          <h2 className="lg:mb-5 text-xl lg:text-2xl  font-serif font-semibold" >Stores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-2 md:gap-3 lg:gap-5">
                        {
                          storesdata.map((store ,index)=>{
                            return (
                            
                              <div key={index} className="stores_container bg-gray-50  p-2 ">
                                {store?.img ? (
                                    <Link href={`/${store.title}`}>
                                      <Image
                                        src={store.img}
                                        width={120}
                                        height={60}
                                        alt="store"
                                        className="object-contain transition duration-150 ease-linear transform hover:scale-105  "
                                      />
                                      </Link>
                                    ) : (
                                      <Image
                                        src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                                        width={150}
                                        height={150}
                                        alt="store"
                                        className="object-cover transition duration-150 ease-linear transform hover:scale-105"
                                      />
                                    )}
                                   <div>
                                </div>
                                {/* <span className="store_offer ">{store.offers}</span> */}
                                <div className="stores_details w-28 ">
                                <h5 className="">{store.title}</h5>
                                <p>{store.offers} Coupons</p>
                                </div>
                                <span className="fav_icon " ><AiFillHeart size={24}  /></span>
                               
                              </div>
                            
                            )
                          })
                        }
                      </div>
        </div>

         {/* fav offers */}
         <div className="text-xl font-medium capitalize  px-3 sm:px-10"> 
        <h2  className="lg:m-5 text-xl lg:text-2xl  font-serif font-semibold">Offers</h2>

         {storeCustomizationSetting?.home?.popular_products_status && (
              <div className=""> 
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-2 md:gap-3 lg:gap-3">
                        {popularProducts
                          ?.slice(
                            0,
                            storeCustomizationSetting?.home
                              ?.popular_product_limit
                          )
                          .map((product) => (

                            <>
                              <OfferCardTwo
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

         {/* discounted products */}
         {storeCustomizationSetting?.home?.discount_product_status && (
              <div
                id="discount"
                className="bg-gray-50 lg:py-5 py-5 mx-auto max-w-screen-2xl px-3 sm:px-10"
              >
                <div className="mb-10 flex justify-start">
                  <div className="justify-start w-full lg:w-2/5">
                    <h2 className="text-xl lg:text-2xl mb-2 font-serif font-semibold">
                      <CMSkeleton
                        count={1}
                        height={30}
                        // error={error}
                        loading={loading}
                        data={
                          storeCustomizationSetting?.home?.latest_discount_title
                        }
                      />
                    </h2>
                    <p className="text-base font-sans text-gray-600 leading-6">
                      <CMSkeleton
                        count={5}
                        height={20}
                        // error={error}
                        loading={loading}
                        data={
                          storeCustomizationSetting?.home
                            ?.latest_discount_description
                        }
                      />
                    </p>
                  </div>
                </div>
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
                        {discountProducts
                          ?.slice(
                            0,
                            storeCustomizationSetting?.home
                              ?.latest_discount_product_limit
                          )
                          .map((product) => (
                            <ProductCard
                              key={product._id}
                              product={product}
                              attributes={attributes}
                            />
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
export default Offer;
