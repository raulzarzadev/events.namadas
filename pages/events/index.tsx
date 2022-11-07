import { Router, useRouter } from "next/router";
import { useEffect } from "react";

const Events = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/')
  }, [])
  
  return <div></div>;
};

export default Events;