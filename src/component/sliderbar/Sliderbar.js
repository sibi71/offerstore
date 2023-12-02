import { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import SettingServices from "@services/SettingServices";
import Cookies from "js-cookie";
import { Disclosure } from "@headlessui/react";
import {
  FiGift,
  FiAlertCircle,
  FiHelpCircle,
  FiShoppingBag,
  FiFileText,
  FiUsers,
  FiPocket,
  FiPhoneIncoming,
  FiMinus,
} from "react-icons/fi";
import {SiGooglenearby} from "react-icons/si"
import { TbMapSearch } from "react-icons/tb";
import { notifyError } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import Category from "@component/category/Category";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Maps from "@component/maps/Maps";
import Image from "next/image";
import { headeritems, headeritemsslider, sliderlngdata, storesdata } from "src/data/localdata";
import { ImLocation2 } from "react-icons/im";
import { FaFilter, FaStore,FaHome  } from "react-icons/fa";
import { SearchCircleIcon } from "@heroicons/react/solid";
import { IoIosPricetags, IoMdSearch } from "react-icons/io";
import { RiPinDistanceFill,RiMentalHealthFill } from "react-icons/ri";
import { Box, Slider } from "@mui/material";
import { IoAdd, IoPricetags } from "react-icons/io5";
import { MdCategory,MdCardTravel, MdOutlineFastfood, MdOutlineTwoWheeler } from "react-icons/md";
import { IoPhonePortraitOutline, IoPower } from "react-icons/io5"
import { GiClothes } from "react-icons/gi";
import { BiSolidOffer } from "react-icons/bi";


const Sliderbar = () => {
    const [languages, setLanguages] = useState([]);
    const [currentLang, setCurrentLang] = useState({});
    const { lang, storeCustomizationSetting } = useGetSetting();
    const { isLoading, setIsLoading } = useContext(SidebarContext);

    //  const sliders = document.querySelector("#range")
    // const sliderValue = document.querySelector(".value")
  
    const { showingTranslateValue } = useUtilsFunction();
  
    const handleLanguage = (lang) => {
      setCurrentLang(lang);
      Cookies.set("lang", lang?.iso_code, {
        sameSite: "None",
        secure: true,
      });
    };


    const marks = [
    
    ];
    
function valuetext(value) {
      return `${value}`;
    }

  
 
    useEffect(() => {
      (async () => {
        {
          try {
            const res = await SettingServices.getShowingLanguage();
            setLanguages(res);
  
            const result = res?.find((language) => language?.iso_code === lang);
            setCurrentLang(result);
          } catch (err) {
            notifyError(err);
            console.log("error on getting lang", err);
          }
        }
      })();

      // sliders.addEventListener("input", (event) => {
      //   const tempSliderValue = event.target.value; 
      
      //   sliderValue.textContent = tempSliderValue;
      
      //   const progress = (tempSliderValue / sliders.max) * 100;
     
      //   sliders.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
      //   })
     
    }, []);
 
    

  


    
  return (
    <div className='sliderbar mb-10 ml-10 h-fit'>
        <div className='sliderbar_container'>
          <div className="bg-gray-50 px-4 py-3  rounded-md sliderbar_top mb-5">
          <div className=' mb-3 flex  px-4 py-3 justify-between  rounded-md'>
            
                  <div className="flex flex-row"> 
                <FaFilter size={20}  className="text-orange-600"/>
                  <h2>fillter</h2>
                </div>
                <div className="cursor-pointer">
                  <h2 className="text-gray-400 ">reset</h2>
                </div>
          </div>
            <div className='sliderbar_map '>
                <div className="sliderbar_title mb-3">
                  <div className="sliderbar_input  ">
                  <button > <IoMdSearch  size={24}/></button>
                    <input type="search" placeholder="search "  /> 
                  </div>
                 
                </div>

                <div className="sliderbar_location">
                {
                      sliderlngdata.map((location ,index)=>{
                        return(
                          <div key={index} className="flex items-center m-3">
                           <input type="checkbox" id={location.lng} className="outline-none cursor-pointer rounded-md "/>
                            <h2 className="ml-2 cursor-pointer  ">{location.lng}</h2>
                          </div>
                    
                        )

                      })
                    }

                </div>
                
            </div>

            </div>
            <div className="bg-gray-50 px-4 py-3  rounded-md sliderbar_top mb-5">
              <div className="">
                 <h2 className="flex "><RiPinDistanceFill size={24} className="text-orange-600" />  Distance Range</h2>
                <span className="text-sm text-gray-400 ">use slider or enter min and  max Distance</span>
              </div>
              <div className="sliderbar_distance flex justify-evenly mt-2">
                <div className="sliderbardistance_min flex items-center">
                    <h2>MIN</h2>
                    <div className="sliderbardistance_min_km ml-2">
                      <span>KM</span>
                    <input type="number" placeholder="" />
                    </div>
                </div>
                <span className="" >-</span>
                <div className="sliderbardistance_max flex  items-center">
                    <h2>MAX</h2>
                    <div className="sliderbardistance_max_km ml-2">
                      <span>KM</span>
                    <input type="number" />
                    </div>
                </div>
              </div>
              <div className="silderbar_range">
              <Box sx={{ width: 320 }}>
                
              <Slider
                  aria-label="Always visible"
                  defaultValue={80}
                  getAriaValueText={valuetext}
                  step={10}
                  marks={marks}
                  valueLabelDisplay="on" 
                  className="sliderbar_rangeinput"
                />
              </Box>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3  rounded-md sliderbar_top mb-5">
          <div className=' mb-3 flex  px-4 py-3 justify-between  rounded-md'>
                  <div className="flex flex-row"> 
                <FaStore size={20}  className="text-orange-600"/>
                  <h2>Stores</h2>
                </div>
                
          </div>
            <div className='sliderbar_map '>
                <div className="sliderbar_title mb-3">
                  <div className="sliderbar_input  ">
                  <button > <IoMdSearch  size={24}/></button>
                    <input type="search" placeholder="search "  /> 
                  </div>
                 
                </div>

                <div className="sliderbar_location">
                {
                      storesdata.map((location ,index)=>{
                        return(
                          <div key={index} className="flex items-center m-3">
                           <input type="checkbox" id={location.title} className="outline-none cursor-pointer rounded-md "/>
                            <h2 className="ml-2 cursor-pointer  ">{location.title}</h2>
                          </div>
                    
                        )

                      })
                    }

                </div>
                
            </div>

            </div>
            <div className="bg-gray-50 px-4 py-3  rounded-md sliderbar_top mb-5">
              <div className="">
                 <h2 className="flex "><IoPricetags  size={24} className="text-orange-600" /> Prices Range</h2>
                <span className="text-sm text-gray-400 ">use slider or enter min and  max Distance</span>
              </div>
              <div className="sliderbar_distance flex justify-evenly mt-2">
                <div className="sliderbardistance_min flex items-center">
                    <h2>MIN</h2>
                    <div className="sliderbardistance_min_km ml-2">
                      <span>AED</span>
                    <input type="number" placeholder="" />
                    </div>
                </div>
                <span className="" >-</span>
                <div className="sliderbardistance_max flex  items-center">
                    <h2>MAX</h2>
                    <div className="sliderbardistance_max_km ml-2">
                      <span>AED</span>
                    <input type="number" />
                    </div>
                </div>
              </div>
              <div className="silderbar_range">
              <Box sx={{ width: 320 }}>
                
              <Slider
                  aria-label="Always visible"
                  defaultValue={80}
                  getAriaValueText={valuetext}
                  step={10}
                  marks={marks}
                  valueLabelDisplay="on"
                />
              </Box>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3  rounded-md sliderbar_top mb-5" >
                <div className=' mb-3 flex  px-4 py-3 justify-center rounded-md border-orange-600 border-solid border-2'>
                      <div className="flex flex-row "> 
                      <MdCategory size={20}  />
                      <h2>Category</h2>
                    </div>
              </div>
                {
                  headeritems.map((menuitem ,index)=>{
                    return(
                  <Disclosure key={index} >
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full px-4 py-3  text-base font-medium text-left text-gray-600 hover:text-orange-600   sliderbar_menu focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 capitalize rounded-md">
                         <div>
                         
                         <span>
                          {menuitem.title}
                          </span>
                         </div>
                         
                          {
                            !open ? (<IoAdd
                              className={`w-5 h-5 text-orange-600 `}
                            />):(<FiMinus />)
                          }
                          
                        </Disclosure.Button>

                            {
                              menuitem.option?(
                                <Disclosure.Panel className="px-4 text-sm leading-7 text-gray-500   sliderbar_container ">
                                  {
                                    menuitem.option?.map((option,index)=>{
                                      return(
                                        <div key={index} className="sliderbar_option hover:text-blue-500 p-1 cursor-pointer">
                                          <Link href={"#"} >{option.optiontitle}</Link>
                                        </div>
                                      )
                                    })
                                  }
                        </Disclosure.Panel>
                              ):("")
                            }
                        
                        
                      
                        
                      </>
                    )}
                  </Disclosure>
                    )
                  })
                }
           </div>
        </div>
    </div>
  )
}

export default Sliderbar