import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { IoAdd, IoBagAddSharp, IoRemove } from "react-icons/io5";
import { useCart } from "react-use-cart";

//internal import

import Price from "@component/common/Price";
import Stock from "@component/common/Stock";
import { notifyError } from "@utils/toast";
import useAddToCart from "@hooks/useAddToCart";
import Discount from "@component/common/Discount";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ProductModal from "@component/modal/ProductModal";
import useGetSetting from "@hooks/useGetSetting";
import { AiOutlineHeart } from "react-icons/ai";
const Storecard = ({ product, attributes }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const { items, addItem, updateItemQuantity, inCart } = useCart();
    const { handleIncreaseQuantity } = useAddToCart();
    const { globalSetting } = useGetSetting();
    const { showingTranslateValue } = useUtilsFunction();
  
    const currency = globalSetting?.default_currency || "$";

    const handleAddItem = (p) => {
        if (p.stock < 1) return notifyError("Insufficient stock!");
    
        if (p?.variants?.length > 0) {
          setModalOpen(!modalOpen);
          return;
        }
        const { slug, variants, categories, description, ...updatedProduct } =
          product;
        const newItem = {
          ...updatedProduct,
          title: showingTranslateValue(p?.title),
          id: p._id,
          variant: p.prices,
          price: p.prices.price,
          originalPrice: product.prices?.originalPrice,
        };
        addItem(newItem);
      };
    
      const handleModalOpen = (event, id) => {
        setModalOpen(event);
      };
    
      return (
        <>
          {modalOpen && (
            <ProductModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              product={product}
              currency={currency}
              attributes={attributes}
            />
          )}
    
          <div className="group box-border overflow-hidden flex  homeOffer_container  pe-0 flex-col items-center  relative ">
            <div
              onClick={() => handleModalOpen(!modalOpen, product._id)}
              className="relative flex justify-center lg:h-72 h-72 md:h-52 cursor-pointer "
            >
              {/* <div className="left-3">
                <Stock product={product} stock={product.stock} card />
              </div> */}
    
              <Discount product={product} />
    
              {product?.image[0] ? (
                <Image
                  src={product.image[0]}
                  width={350}
                  height={300}
                  alt="product"
                  className="  transition duration-150 ease-linear transform group-hover:scale-105 homeOffer_img"
                />
              ) : (
                <Image
                  src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                  width={210}
                  height={210}
                  alt="product"
                  className="object-cover transition duration-150 ease-linear transform group-hover:scale-105"
                />
              )}
            </div>
            <div className="w-full px-3 lg:px-4 pb-4 overflow-hidden">
             
              <h5 className='text-xl lg:text-3xl mb-2 font-serif font-semibold text-gray-50 storeoffers_time'>40 <span>%</span></h5>
              <div className="flex justify-between items-center text-heading text-sm sm:text-base space-s-2 md:text-base lg:text-xl">
                {/* <Price
                  card
                  product={product}
                  currency={currency}
                  price={
                    product?.isCombination
                      ? product?.variants[0]?.price
                      : product?.prices?.price
                  }
                  originalPrice={
                    product?.isCombination
                      ? product?.variants[0]?.originalPrice
                      : product?.prices?.originalPrice
                  }
                />
                  */}
                   <div className="relative mb-1">
                <span className="text-gray-400 font-medium text-xs d-block mb-1">
                  {product.unit}
                </span>
                <h2 className="text-heading truncate mb-0 block text-sm font-medium text-gray-600 capitalize">
                  <span className="line-clamp-2">
                    {showingTranslateValue(product?.title)}
                  </span>
                </h2>
              
              </div>
    
                {inCart(product._id) ? (
                  <div>
                    {items.map(
                      (item) =>
                        item.id === product._id && (
                          <div
                            key={item.id}
                            className="h-9 w-auto flex flex-wrap items-center justify-evenly py-1 px-2 bg-emerald-500 text-white rounded"
                          >
                            <button
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <span className="text-dark text-base">
                                <IoRemove />
                              </span>
                            </button>
                            <p className="text-sm text-dark px-1 font-serif font-semibold">
                              {item.quantity}
                            </p>
                            <button
                              onClick={() =>
                                item?.variants?.length > 0
                                  ? handleAddItem(item)
                                  : handleIncreaseQuantity(item)
                              }
                            >
                              <span className="text-dark text-base">
                                <IoAdd />
                              </span>
                            </button>
                          </div>
                        )
                    )}{" "}
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddItem(product)}
                    aria-label="cart"
                    className="h-9 w-9 flex items-center justify-center border border-gray-200 rounded-full text-orange-600 hover:bg-orange-600 hover:bg-emerald-500 hover:text-white transition-all"
                  >
                    {" "}
                    <span className="text-xl">
                      <AiOutlineHeart/>
                    </span>{" "}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      );
}

export default Storecard