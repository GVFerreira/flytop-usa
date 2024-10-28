'use client'

import { getFeedbacks } from '../admin/action'
import Image from 'next/image'

import { useEffect, useState } from 'react'

// @ts-ignore
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

interface Feedbacks {
  id: string
  name: string
  imagePath: string
  slug: string
  createdAt: Date
}

export const Testemonials = () => {
  const [feedbacks, setFeedbacks] = useState<Feedbacks[]>([])

  useEffect( () => {
    const fetchData = async () => {
      try {
        const feedback = await getFeedbacks()
        if(feedback) setFeedbacks(feedback)

      } catch (e) {
        console.error('Error fetching data:', e)
      }
    }

    fetchData()
  }, [])
  
  const options = {
    type: 'loop',
    focus: 'center',
    perPage: 3,
    pagination: true,
    arrows: true,
    resetProgress: false,
    gap: 10,
    breakpoints: {
      1200: { perPage: 2},
      640 : { perPage: 1 },
    },
  }

  return (
    <Splide options={options} hasTrack={ false }>
      <SplideTrack>
          {
            feedbacks.map((feedback, index) => (
              <SplideSlide key={index} className="px-6">
                <Image
                  src={feedback.imagePath}
                  width={1080}
                  height={1920}
                  alt={`${feedback.name} - ${feedback.slug}`}
                  className="aspect-[9/16] object-contain w-10/12 mx-auto rounded-lg"
                />
              </SplideSlide>
            ))
          }
      </SplideTrack>
    </Splide>
  )
}