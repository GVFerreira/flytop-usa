import type { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"

import Footer from "../../_components/Footer"
import Header from "../../_components/Header"
import ShareButton from "./_components/share-button"
import { Button } from "@/components/ui/button"

import { getDestination } from "../../actions"
import { SynchronizedCarousel } from "./_components/carousel"

interface Props {
  params: {id: string}
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const destination = await getDestination(params.id)
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  if (destination) {
    return {
      title: destination.name,
      description: destination.subtitle,
      openGraph: {
        images: [`${destination.company.imagePath}`, ...previousImages],
      },
    }
  }

  return {
    title: 'FlyTop Travels'
  }
}

export default async function Destination({params}: Props) {
  try {
    const destination = await getDestination(params.id)
  
    if(destination) {
      return (
        <>
          <Header />
          <main style={{flex: "1 1 0"}} className="flex flex-col justify-center">
            <section className="py-10 bg-white">
              <div className="container grid grid-cols-1 md:gap-20 gap-10 md:grid-cols-2">
                <div>
                  <SynchronizedCarousel imageSlideFromDB={destination.imageSlide} imageThumb={destination.imagePath}/>
                  {/* <Image
                    src={destination.imagePath}
                    alt={`Image ${destination.destinationAirport}`}
                    className="aspect-square object-cover w-full md:w-10/12 mx-auto mb-4 rounded-xl border-2 border-slate-900"
                    width={512}
                    height={512}
                  /> */}
                </div>
                <div className="bg-[#FFFEEE] flex flex-col gap-y-4 px-6 md:px-12 py-5 md:py-10 rounded-xl shadow-lg">
                  <div className="flex flex-row gap-x-4 justify-start items-center">
                    <h1 className="text-4xl text-sky-950 font-bold">{(destination.name)?.toUpperCase()}</h1>
                    <ShareButton title={destination.name} url={`https:flytoptravels.com/${destination.id}/destination`}/>
                  </div>
                  <div>
                    <p className="font-semibold">{destination.subtitle}</p>
                  </div>
                  <div>
                    <h2 className="text-lg">Airport destination: {destination.name} ({destination.destinationAirport})</h2>
                    <h2 className="text-lg">Airport origin: {destination.departureCity} ({destination.departureAirport})</h2>
                  </div>
                  <p className="flex flex-row justify-start items-center gap-x-2">
                    <span>Flight company:</span>
                    <Image src={destination.company.imagePath} width={150} height={75} alt={destination.company.name}/>
                  </p>

                  <div>
                    <p className="text-4xl text-green-800 font-bold mb-2">
                      <span className="text-lg">U$ </span>
                      {(destination.price)?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>

                    <p className="text-lg line-through text-sky-950 font-bold mb-2">
                      <span className="text-lg">WAS </span>
                      {(destination.regularPrice)?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                  </div>

                  <div>
                    <p>Departure date: {destination.departureDates}</p>
                    <p>Return date: {destination.returnDates}</p>
                  </div>
    
                  <Link href="#">
                    <Button variant="cta" className="mt-6">BUY NOW</Button>
                  </Link>
                </div>
              </div>
            </section>
          </main>
          <Footer/>
        </>
      )
    }

    return <h1>Destination not found</h1>

  } catch(e: any) {
    return <h1>{e}</h1>
  }
}