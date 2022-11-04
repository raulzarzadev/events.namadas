import { useEffect, useState } from "react"

export default function useDevice(){
  const [isMobile, setIsMobile]=useState<boolean>(true)
    useEffect(() => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // true for mobile device
        // console.log('mobile device');
        setIsMobile(true);
      } else {
        // false for not mobile device
        // console.log('not mobile device');
        setIsMobile(false);
      }
    }, [navigator.userAgent]);
    
  return {isMobile}
}