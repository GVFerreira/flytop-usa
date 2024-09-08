'use client'

import { Destination } from '../types'
import { Button } from '@/components/ui/button'

type Destinations = {
  data: Destination[]
}

export const NineCards = ({data}: Destinations) => { 
  return (
    <>
      {
        data.map((destination, index) => (
          <article key={index} className="w-full rounded-xl border-2 border-slate-900 bg-cover bg-center" style={{backgroundImage: `url(${destination.imagePath})`}}>
            <div className="bg-zinc-800/70 p-4 rounded-lg">
              <h3 className="text-2xl font-bold text-slate-50">{destination.name}</h3>
              <p className="text-slate-300">{destination.destinationAirport}</p>
              <p className="text-slate-300 font-semibold mb-4">U$ {(destination.regularPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <Button variant="cta">Buy</Button>
            </div>
          </article>
        ))
      }
    </>
  )
}