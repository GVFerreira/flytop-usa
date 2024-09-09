'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Destination } from '../types'

type DestinationDataTable = {
  data: Destination[]
}

export const HeroHeader = ({data}: DestinationDataTable) => { 
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {
        data.map((destination, index) => (
          <article key={index}>
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
                        was {(destination.regularPrice).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-bold text-sky-950">
                      {destination.name}
                      <span className="font-normal text-base"> ({destination.destinationAirport})</span>
                    </h3>
                    <p>From: {destination.departureCity}</p>
                  </div>
                  <Image src={destination.company.imagePath} width={100} height={50} alt={destination.company.name} className="w-32 mix-blend-multiply"/>
                </div>
                <p className="font-semibold">{destination.subtitle}</p>
              </div>
            </Link>
          </article>
        ))
      }
    </div>
  )
}

export const revalidate = 0