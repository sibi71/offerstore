//internal import
import Layout from "@layout/Layout";
import Coupon from "@component/coupon/Coupon";
import PageHeader from "@component/header/PageHeader";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Offer = () => {
  const { storeCustomizationSetting  } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  console.log( storeCustomizationSetting?.offers , "data offer");

  return (
    <Layout title="My Favourites" description="this is My Favourites page">
    
    </Layout>
  );
};

export default Offer;
