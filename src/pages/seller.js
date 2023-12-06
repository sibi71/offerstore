import Commonseller from '@component/SellerLogin/Commonseller'
import Sellerlogin from '@component/SellerLogin/Sellerlogin'
import Layout from '@layout/Layout'
import React from 'react'

const seller = () => {
    const user = "false"
  return (
    <>
    {user ? (
       <Commonseller />
    ):(
        <Layout title="Seller">
        
     </Layout>
    )}
    </>
    
  )
}

export default seller