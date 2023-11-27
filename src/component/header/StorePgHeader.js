import Image from 'next/image'
import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { IoMdMail } from "react-icons/io";

const StorePgHeader = ({findstoredetils}) => {
  console.log(findstoredetils,"findstoredetils");
  const styling = {
    backgroundImage: `url('${findstoredetils.bgimg.src}')`,
   
}
  return (
    <div
     style={styling }
      className={`flex justify-center py-5 lg:py-5 bg-black w-full h-fit bg-cover bg-no-repeat bg-bottom mx-auto`}
    >
       
      <div className="flex mx-auto w-full h-fit max-w-screen-2xl px-3 sm:px-10">
      
        <div className="w-full h-fit flex justify-center  storepgheader capitalize ">
            <div className='flex justify-center bg-gray-50 storepgheader_img mr-5 p-8  '>
            {findstoredetils.img ? (
                      <Image
                        src={findstoredetils.img}
                        alt="product"
                        priority
                        
                        className='w-fit h-fit'
                        
                      />
                    ) : (
                      <Image
                        src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                        width={150}
                        height={50}
                        alt="product Image"
                      />
                    )}  
            </div>
          <div className=' font-serif  text-gray-50  storepgheader_title'>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2">
           {findstoredetils.title}
          </h2>
          <h3 className='mb-2 text-orange-500'>{findstoredetils.offers}  {findstoredetils.title} Coupon available </h3>
          <h5 className='flex justify-start mb-2 '><FaPhoneAlt size={20} className='text-gray-300'  />  { findstoredetils.moblie}</h5>
          <h5 className='flex justify-start mb-2'><IoMdMail size={24}   className='text-gray-300'/>  { findstoredetils.mail}</h5>
          <h5 className='flex justify-start '><TbWorld size={24}  className='text-gray-300'  />  { findstoredetils.website}</h5>
        
          </div>
        </div>
      </div>
    </div>
  )
}

export default StorePgHeader