import React,{useEffect} from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { useMemo } from 'react';
import { useRef } from 'react';
const Maps = ({address}) => { 
  
   
  return (
    <div style={{height:"400px"}} ref={mapRef}></div>
  )
}

export default Maps