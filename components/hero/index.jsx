import Carousel from '@comps/carousel'
import Link from 'next/link'

const Hero = () => {
  const images = [
    {
      src: 'https://placeimg.com/800/200/people/sepia',
      text: ''
    },
    {
      src: 'https://placeimg.com/800/200/nature',
      text: ''
    },
    {
      src: 'https://placeimg.com/800/200/tech',
      text: ''
    }
  ]

  return (
    <div>
      <Carousel images={images}/>
      <div className='flex w-full justify-center my-2'>
        <Link href={'/new-event'} >
          <a className='btn btn-outline'>
          Crea un evento gratis!
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Hero
