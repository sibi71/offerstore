import ProductModal from '@component/modal/ProductModal';
import CMSkeleton from '@component/preloader/CMSkeleton';
import useGetSetting from '@hooks/useGetSetting';
import Image from 'next/image';
import React from 'react'
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

const OfferCardTwo = ({product} ) => {
    const { loading, error, storeCustomizationSetting } = useGetSetting();
    const [modalOpen, setModalOpen] = useState(false);
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
           />                     
       )}
    <div className="text-center cursor-pointer p-3  rounded-lg capitalize "   >
        <div className="mx-auto homeOffer_container lg:h-fit h-fit md:h-52 bg-gray-50"  >
            <Image
            src={product.image[0]}
            alt="offers"
            width="300"
            height="300"
            className='homeOffer_img'
            onClick={() => handleModalOpen(!modalOpen, product._id)}
            />

            <div className='flex flex-col justify-start text-start   px-3 pb-5 '>

                <div className='offer_all'> 
                    <h2 className="text-md  ">
                    <CMSkeleton
                        count={1}
                        height={30}
                        // error={error}
                        loading={loading}
                        data={product.title}
                        
                    />
                    </h2>
                </div>
                
              
                <div className='flex lg:justify-between items-center sm:justify-center  mt-5'>
                
                <h2 className="text-base  text-green-600 font-semibold">
                    <CMSkeleton
                        count={1}
                        height={10}
                        // error={error}
                        loading={loading}
                        data={product.title}
                        
                    />
                    </h2>
            
                <button
                    onClick={() => handleAddItem(product)}
                    aria-label="cart"
                    className="h-9 w-9 flex items-center justify-center   text-red-600    transition-all "
                >
                    {" "}
                    <span className="text-xl">
                    <AiOutlineHeart />
                    </span>{" "}
                </button>
                </div>
                <p className='text-xs text-gray-500 '>Purchase all grocery products with more offers...</p>
                <div className='flex lg:justify-between sm:justify-center  items-center text-xs  lg:mt-2 ' >
                    <h5>+{product.stock}Pages</h5>
                    <h5>Till {(product.updatedAt).slice(5 , 10)}</h5>
                </div>
              
            </div>
        </div>
     </div>
  </>              
  )
}

export default OfferCardTwo