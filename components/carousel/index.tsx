// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import Image from 'next/image'
import { EventImage } from '@firebase/Events/event.model'

const Carousel = ({
  images = []
}: {
  images?: EventImage[] | [] | undefined
}) => {
  return (
    <div className="">
      <Swiper
        className=""
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => {}}
        onSlideChange={() => {}}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i} className="">
            <div className="relative w-full h-72 ">
              <Image
                src={image?.url ?? '/images/defaultEventImage.jpeg'}
                objectFit="cover"
                layout="fill"
              />
            </div>
            {/* <PreviewImage image={image?.src || image?.url}  previewSize='full'/> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carousel
