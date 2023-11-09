import React from "react";

//internal import
import Coupon from "@component/coupon/Coupon";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const OfferCard = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <div className="w-full group">
      <div className="bg-gray-50 h-full border-2 border-gray-200 transition duration-150 ease-linear  rounded shadow">
        <div className="bg-blue-500 text-gray-50 px-6 py-2 rounded-t border-b flex items-center justify-center">
          <h3 className="text-base font-serif font-medium ">
            {showingTranslateValue(
              storeCustomizationSetting?.home?.discount_title
            )}
          </h3>
        </div>
        <div className="overflow-hidden">
          <Coupon couponInHome />
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
