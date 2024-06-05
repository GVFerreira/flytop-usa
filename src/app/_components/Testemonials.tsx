'use client'

// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import { ArrowBigLeft, Star, StarHalf } from 'lucide-react'
import Image from 'next/image'
import Logotipo from './Logotipo'


export const Testemonials = () => {
  const options = {
    type: 'loop',
    focus: 'center',
    perPage: 1,
    pagination: true,
    arrows: true,
    resetProgress: false,
    gap: 32,
  }

  function generateSlides( length = 10, sig = 0 ): Array<{ src: string, alt: string }> {
    return Array.from( { length } ).map( ( value, index ) => {
      index = sig || index;
  
      return {
        src: `https://source.unsplash.com/random/512x512?sig=${ index }`,
        alt: `Image ${ index + 1 }`
      }
    } )
  }

  return (
    <Splide options={options} hasTrack={ false }>
      <SplideTrack>
          {
            generateSlides().map((slide: { src: string; alt: string; }, index) => (
              <SplideSlide key={slide.src} className="px-14 md:px-10">
                <div className="mb-10 md:grid md:grid-cols-2">
                  <Image src={slide.src} alt={slide.alt} className="w-full md:w-10/12 md:mx-auto mb-4 rounded-xl border-2 border-slate-900" width={512} height={512}/>
                  <div className="h-full flex flex-col justify-center items-start">
                    <div className='text-orange-600 w-8/12 md:w-3/12 grid grid-cols-5 mb-4'>
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                    </div>
                    <q className='font-bold text-sky-950'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sit placeat a suscipit fugiat dignissimos dolor rerum, accusantium expedita nihil.</q>
                    <div className='grid grid-cols-2 py-4'>
                      <h3 className="text-lg font-bold text-sky-900 pr-2 border-r border-r-sky-800">Customer {index}</h3>
                      <div className='flex justify-center items-center'>
                        <Logotipo/>
                      </div>
                    </div>
                  </div>
                </div>
              </SplideSlide>
            ))
          }
      </SplideTrack>
    </Splide>
  )
}