'use client'

import { ArrowBigLeft } from 'lucide-react'
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import '@splidejs/react-splide/css'
import Image from 'next/image'
import Link from 'next/link'
import { Destination } from '../types'

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
    gap: 32,
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
        gap: 16,
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
                <Link href={`/${destination.id}/destination`}>
                  <div className="bg-[#FFFEEE] rounded-3xl p-6 mb-10 transition-all duration-300 ease-in hover:mt-4 hover:cursor-pointer">
                    <div className="mb-8">
                      <Image
                        src={destination.imagePath}
                        alt={`Image ${index}`}
                        width={512} 
                        height={512}
                        className="w-full aspect-square object-cover mb-4 rounded-xl border-2 border-slate-900"
                      />
                      <div className="relative">
                        <p
                          className="absolute bottom-2 left-3 space-x-4"
                        >
                          <span className="rounded-full text-sm px-4 py-2 text-slate-950 bg-green-400 font-bold border border-slate-950">
                            From U$ {(destination.price).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                          </span>
                          <span className="rounded-full text-xs line-through px-4 py-2 text-slate-950 bg-white font-bold border border-slate-950">
                            {(destination.regularPrice).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                          </span>
                        </p>
                      </div>
                    </div>
                      <h3 className="text-3xl font-bold text-sky-950">
                        {destination.name}
                        <span className="font-normal text-base"> ({destination.destinationAirport})</span>
                      </h3>
                      <p className="text-lg">{destination.flightCompanyId}</p>
                  </div>
                </Link>
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