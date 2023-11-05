import { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import SettingServices from "@services/SettingServices";
import Cookies from "js-cookie";
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
import { notifyError } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import Category from "@component/category/Category";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Maps from "@component/maps/Maps";
import Image from "next/image";
import map from "../../../public/maps.png"
const Sliderbar = () => {
    const [languages, setLanguages] = useState([]);
    const [currentLang, setCurrentLang] = useState({});
    const { lang, storeCustomizationSetting } = useGetSetting();
    const { isLoading, setIsLoading } = useContext(SidebarContext);
  
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
    }, []);
  return (
    <div className='sliderbar'>
        <div className='sliderbar_container'>
            <div className='sliderbar_title'>
                <h2>Filter</h2>
            </div>
            <div className='sliderbar_map'>
                <div className="sliderbar_title">
                    <input type="search" placeholder="search your nearby store" />
                    <div className="silderbar_btn">
                        <button>Nearbystore</button>
                        <button>YourLocaion</button>
                        <button>dubai mall</button>
                    </div>
                </div>
                <Image src={map} alt="map" />
            </div>
            

            <div>
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
            </div>

        </div>
    </div>
  )
}

export default Sliderbar