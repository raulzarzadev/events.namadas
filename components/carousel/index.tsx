// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Image from 'next/image';

interface Image {
  src: string;
  text?: string;
}

const Carousel = ({ images = [] }: { images: Image[] | [] | undefined}) => {
 
  return (
    <div className="">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <img src={image.src} className='mx-auto' />
          </SwiperSlide>
        ))}
        
      </Swiper>
    </div>
  );
};

export default Carousel;
