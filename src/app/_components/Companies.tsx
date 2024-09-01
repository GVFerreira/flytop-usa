'use client'

import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import '@splidejs/react-splide/css'
import Image from 'next/image'
// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'


export const Companies = () => {

  const companies = [
    'aeromexico',
    'air-canada',
    'air-france',
    'alaska',
    'american-airlines',
    'avianca',
    'azul',
    'british',
    'delta',
    'iberia',
    'latam',
    'qantas',
    'qatar',
    'south-african',
    'swiss',
    'tap',
    'turkish',
    'united-airlines'
  ]

  return (
    <Splide
      options={{
        pagination: false,
        arrows: false,
        gap: 32,
        type: 'loop',
        drag: 'free',
        perPage: 7,
        autoScroll: {
          autoStart: true,
          speed: 0.6,
          pauseOnHover: true,
        },
        breakpoints: {
          1440: {
            perPage: 7
          },
          1024: {
            perPage: 3
          },
          600: {
            perPage: 3,
            gap: 10,
          }
        },
      }}
      extensions={{AutoScroll}}
      hasTrack={false}
    >
      <SplideTrack>
        {
          companies.map((company, index) => (
            <SplideSlide key={index} className="flex justify-center items-center">
              <Image
                src={`/companies/${company}.svg`}
                alt={`${company}`}
                width={80}
                height={30}
                className="w-8/12 mx-auto my-auto"
              />
            </SplideSlide>
          ))
        }
      </SplideTrack>
    </Splide>
  )
}
