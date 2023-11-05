import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//internal import
import SettingServices from "@services/SettingServices";
import { addSetting, removeSetting } from "@redux/slice/settingSlice";
import { storeCustomization } from "@utils/storeCustomizationSetting";

const useGetSetting = () => {
  const lang = Cookies.get("lang");
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const settings = useSelector((state) => state.setting.settingItem);

  const globalSetting = settings.find(
    (value) => value.name === "globalSetting"
  );

  const storeCustomizationSetting = settings.find(
    (value) => value.name === "storeCustomizationSetting"
  );

  useEffect(() => {
    // Function to fetch and add the setting
    const fetchAndAddSetting = async () => {
      try {
        setLoading(true);
        console.log("storeCustomizationSetting setting not available");
        const res = await SettingServices.getStoreCustomizationSetting();
        const storeCustomizationSettingData = {
          ...res,
          name: "storeCustomizationSetting",
        };
        // console.log("Object.keys(res).length", Object.keys(res).length);
        if (Object.keys(res).length > 0) {
          dispatch(addSetting(storeCustomizationSettingData));
        } else {
          console.log(
            "store customization setting not available in db! use local one"
          );
          const storeCustomizationData = {
            ...storeCustomization?.setting,
            name: "storeCustomizationSetting",
          };
          dispatch(addSetting(storeCustomizationData));
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.log("Error on getting storeCustomizationSetting setting", err);
      }
    };

    const fetchGlobalSetting = async () => {
      try {
        setLoading(true);
        console.log("globalSetting setting not available");
        const res = await SettingServices.getGlobalSetting();
        const globalSettingData = {
          ...res,
          name: "globalSetting",
        };

        dispatch(addSetting(globalSettingData));

        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.log("Error on getting storeCustomizationSetting setting", err);
      }
    };

    // Check if the setting is not in the store and fetch it
    if (!storeCustomizationSetting) {
      fetchAndAddSetting();
    }

    if (!globalSetting) {
      fetchGlobalSetting();
    }

    // Check if the "lang" value is not set and set a default value
    if (!lang) {
      Cookies.set("lang", "en", {
        sameSite: "None",
        secure: true,
      });
    }

    // Set an interval to remove the setting from the store every 5 minutes
    const interval = setInterval(() => {
      dispatch(removeSetting("storeCustomizationSetting"));
      dispatch(removeSetting("globalSetting"));
      // Fetch and add the setting again after removing it
      fetchAndAddSetting();
      fetchGlobalSetting();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [storeCustomizationSetting, globalSetting, lang]);

  return {
    lang,
    error,
    loading,
    globalSetting,
    storeCustomizationSetting,
  };
};

export default useGetSetting;
