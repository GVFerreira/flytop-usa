'use client'

// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import '@splidejs/react-splide/css'
import { ArrowBigLeft } from 'lucide-react'
import Image from 'next/image'
import { Destination } from '../types'
import Link from 'next/link'

type DestinationDataTable = {
  data: Destination[]
}

export const HeroHeader = ({data}: DestinationDataTable) => {
  const options = {
    type: 'loop',
    focus: 'left',
    perPage: 4,
    pagination: true,
    arrows: false,
    resetProgress: false,
    autoScroll: {
      speed: 0.3
    },
    breakpoints: {
      1440: {
        perPage: 3
      },
      1024: {
        perPage: 2
      },
      600: {
        perPage: 1
      },
    }
  }
  
  return (
    <Splide options={options} hasTrack={ false } extensions={{AutoScroll}}>
      <SplideTrack>
          {
            data.map((destination, index) => (
              <SplideSlide key={index}>
                <div className="px-2 mb-10 transition-all duration-300 ease-in hover:mt-4 hover:cursor-pointer">
                  <Link href={`/${destination.id}/destination`}>
                    <Image src={`https://source.unsplash.com/random/512x512?${destination.name + ' tourist attraction'}?sig=${ index }`} alt={`Image ${index}`} className="w-full mb-4 rounded-xl border-2 border-slate-900" width={512} height={512}/>
                    <h3 className="text-3xl font-bold text-sky-950">{destination.name} <span className="font-normal text-base">({destination.destination_airport})</span></h3>
                    <p className="text-lg">{destination.flight_company}</p>
                    <p className="text-lg font-semibold">U$ {destination.value}</p>
                  </Link>
                </div>
              </SplideSlide>
            ))
          }
      </SplideTrack>
      <div className="splide__arrows absolute bottom-0 right-20">
        <button className="splide__arrow splide__arrow--prev">
          <ArrowBigLeft />
        </button>
        <button className="splide__arrow splide__arrow--next">
          <ArrowBigLeft />
        </button>
      </div>
    </Splide>
  )
}