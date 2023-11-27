import Layout from '@layout/Layout';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { storepagebtn, storesdata } from 'src/data/localdata';
import Image from 'next/image';
import PageHeader from '@component/header/PageHeader';
import Sliderbar from '@component/sliderbar/Sliderbar';
import useGetSetting from '@hooks/useGetSetting';
import StorePgHeader from '@component/header/StorePgHeader';
import CMSkeleton from '@component/preloader/CMSkeleton';
import Category from '@component/category/Category';
import Coupon from '@component/coupon/Coupon';



const storedetails = () => {
   const router = useRouter()
   const { title } = router.query
   const [tap,setTap] =useState({name:"all"})
  const [active,setActive] = useState(0)
  const [work ,setWork] = useState([])
   

   const findstoredetils = storesdata.find((data)=>{
      return data.title == title
   })
  
   const { loading, error, storeCustomizationSetting } = useGetSetting();


   useEffect(()=>{
    if(tap.name === "all"){
      setWork(findstoredetils.offer)
    }
    else{
     
      const newwork = findstoredetils.offer.filter((data)=>{
        return (
          data.category.toLowerCase() === tap.name
        )
      });
      setWork(newwork)
     
    }
  },[ findstoredetils, tap]);
  
  console.log(work.offer,"work");
  console.log(tap,"tap");
  
  const activeTap = (e,index)=>{
    
    setTap({name:e.target.textContent.toLowerCase()})
    setActive(index)
  
  }


  
  return (
   
     <Layout>
         <StorePgHeader 
         findstoredetils={findstoredetils}  
         />
       <div className="flex justify-between sm:justify-center ">
       <Sliderbar />
        <div className='storepagebtn'>
          <div className='storepagebtn_btn'>
          {storepagebtn.map((btn , index)=>{
            return(
              <button 
              onClick={(e)=>activeTap(e,index)} key={index}
             className={`${active === index ? "storeactive" : " "}`}>
            {btn}  
            </button>
            )
          })}
          </div>
        
          <div className=" lg:py-5 py-10 mx-auto px-3 sm:px-10 bg-gray-100 mb-5 max-w-screen-2xl shadow-md rounded-md">
               <div className='p-2 mb-5 mx-auto max-w-screen-2xl bg-gray-400 capitalize rounded-md '>
               <h1 className='text-gray-50 ml-2'>{tap.name}</h1>
               </div>
                <div className="flex">

                  <div className="w-full">
                    {loading ? (
                      <CMSkeleton
                        count={80}
                        height={20}
                        error={error}
                        loading={loading}
                      />
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2 md:gap-3 lg:gap-3 ">
                       {work.map((item ,index) =>{
                        return (
                          <div className='bg-gray-50 p-5 rounded-md cursor-pointer  flex justify-center flex-col text-center ' key={index}>
                             <Image
                          src={item.img}
                          width={300}
                          height={400}
                          alt="store"
                          className="transition duration-150 ease-linear transform group-hover:scale-105 rounded-t-md "
                        />
                        <div className='mt-5' >
                        <h5><span className='text-orange-600'>Buy on </span> {findstoredetils.title}</h5>
                        <span className='text-sm'>Valid till:{item.time}</span>
                        </div>
                        
                        </div>
                         
                        )
                       })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* coupons */}
              <div className="bg-gray-50 lg:py-16 py-10 mx-auto max-w-screen-2xl px-3 sm:px-10  bg-gray-100 mb-5 max-w-screen-2xl shadow-md rounded-md mb-5 w-full">
               
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
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-1 gap-5 md:gap-3 lg:gap-5 ">
                       <Coupon />
                      </div>
                    )}
                  </div>
                </div>
              </div>

               {/* offers */}
               
          </div>
             </div>
                 
     </Layout>
    
  )
}

export default storedetails
