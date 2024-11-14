'use client'

import React, { useEffect, useRef } from 'react'
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

import Image from 'next/image'

type CarouselProps = {
  imageSlideFromDB: string
  imageThumb: string
}

export function SynchronizedCarousel({ imageSlideFromDB, imageThumb }: CarouselProps) {
  const mainRef = useRef<Splide>(null)
  const thumbsRef = useRef<Splide>(null)

  useEffect(() => {
    if (mainRef.current && thumbsRef.current) {
      mainRef.current.sync(thumbsRef.current.splide)
    }
  }, [])

  const images = JSON.parse(imageSlideFromDB)

  return (
    <div>
      {/* Main Carousel */}
      <Splide
        options={{
          type: 'slide',
          rewind: true,
          pagination: false,
          arrows: false,
        }}
        ref={mainRef}
        className="mb-4"
      >
        <SplideSlide>
          <Image src={`${process.env.NEXT_PUBLIC_APP_URL}/${imageThumb}`} alt="Thumbnail" width={1024} height={1024} quality={70} priority className="aspect-square object-cover w-full rounded-xl border-2 border-slate-900" />
        </SplideSlide>
        {images.map((imageUrl: string, index: number) => (
          <SplideSlide key={index}>
            <Image src={`${process.env.NEXT_PUBLIC_APP_URL}/${imageUrl}`} alt={`Slide ${index + 1}`} width={1024} height={1024} quality={70} className="aspect-square object-cover w-full rounded-xl border-2 border-slate-900" />
          </SplideSlide>
        ))}
      </Splide>

      {/* Thumbnails Carousel */}
      <Splide
        options={{
          fixedWidth: 100,
          fixedHeight: 100,
          gap: 10,
          rewind: true,
          pagination: false,
          arrows: false,
          isNavigation: true,
          breakpoints: {
            600: {
              fixedWidth: 60,
              fixedHeight: 60,
            },
          },
        }}
        ref={thumbsRef}
      >
        <SplideSlide className="rounded-2xl">
          <Image src={`${process.env.NEXT_PUBLIC_APP_URL}/${imageThumb}`} alt="Thumbnail" width={1024} height={1024} className="aspect-square object-cover w-full rounded-xl" />
        </SplideSlide>
        {images.map((imageUrl: string, index: number) => (
          <SplideSlide key={index} className="rounded-2xl">
            <Image src={`${process.env.NEXT_PUBLIC_APP_URL}/${imageUrl}`} alt={`Thumbnail ${index + 1}`} width={1024} height={1024} className="aspect-square object-cover w-full rounded-xl" />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}
