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
} from "react-icons/fi";
import {SiGooglenearby} from "react-icons/si"
import {BiCategory, BiCurrentLocation} from "react-icons/bi"

import { notifyError } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import Category from "@component/category/Category";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Maps from "@component/maps/Maps";
import Image from "next/image";
import map from "../../../public/maps.png"
import { headeritems } from "src/data/localdata";
import { ImLocation2 } from "react-icons/im";
const Sliderbar = () => {
    const [languages, setLanguages] = useState([]);
    const [currentLang, setCurrentLang] = useState({});
    const { lang, storeCustomizationSetting } = useGetSetting();
    const { isLoading, setIsLoading } = useContext(SidebarContext);
     const sliders = document.getElementById("range")
    const sliderValue = document.querySelector(".value")
  
    const { showingTranslateValue } = useUtilsFunction();
  
    const handleLanguage = (lang) => {
      setCurrentLang(lang);
      Cookies.set("lang", lang?.iso_code, {
        sameSite: "None",
        secure: true,
      });
    };
 
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
    <div className='sliderbar mb-10'>
        <div className='sliderbar_container'>
            <div className='sliderbar_maintitle mb-3 flex  '>
            <BiCategory size={24} /><h2 > Filter</h2>
            </div>
            <div className='sliderbar_map '>
                <div className="sliderbar_title mb-3">
                  <div className="sliderbar_input  ">
                    <input type="search" placeholder="search your nearby store"  /> 
                    <button > <ImLocation2 size={24} /></button>
                  </div>

                  <div className="sliderbar_range">
                  <div class="range">
                      <div class="range-slider">
                        <label for="range">Select a KM Range:</label><br />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value="0"
                          class="range-input"
                          id="range"
                          step="25"
                        />
                        <div class="sliderticks">
                          <span>0</span>
                          <span>25 </span>
                          <span>50 </span>
                          <span>75 </span>
                          <span>100 </span>
                        </div>
                      </div>

                      <div class="value">0</div>
                    </div>  
                 
                  
                  </div>
                  
                  
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d925134.3210715873!2d54.568041327437584!3d25.0745656650172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1699472456334!5m2!1sen!2sin" 
                width="350"
                height="300" 
                style={{border:0}}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            {
              headeritems.map((menuitem ,index)=>{
                return(
                  <Disclosure key={index} >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-3  text-base font-medium text-left text-gray-600 hover:text-orange-600   sliderbar_menu focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 capitalize">
                      <span>
                       {menuitem.title}
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180 text-orange-600" : ""
                        } w-5 h-5 text-orange-600`}
                      />
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
            

            {/* <div>
            {storeCustomizationSetting?.navbar
                      ?.categories_menu_status && (
                      <Popover className="relative font-serif">
                        <Popover.Button className="group inline-flex items-center py-2 hover:text-emerald-600 focus:outline-none">
                          <span className="font-serif text-sm font-medium">
                            {showingTranslateValue(
                              storeCustomizationSetting?.navbar?.categories
                            )}
                          </span>

                          <ChevronDownIcon
                            className="ml-1 h-3 w-3 group-hover:text-emerald-600"
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 -ml-1 mt-1 transform w-screen max-w-xs c-h-65vh bg-white">
                            <div className="rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-scroll flex-grow scrollbar-hide w-full h-full">
                              <Category />
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </Popover>
                    )}
            </div> */}
           

        </div>
    </div>
  )
}

export default Sliderbar