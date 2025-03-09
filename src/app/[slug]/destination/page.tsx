import type { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"

import Footer from "../../_components/Footer"
import Header from "../../_components/Header"
import ShareButton from "./_components/share-button"

import { getDestination } from "../../actions"
import { SynchronizedCarousel } from "./_components/carousel"
import BuyButton from "@/app/_components/BuyButton"

interface Props {
  params: {slug: string}
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const destination = await getDestination(params.slug)
 
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
    const destination = await getDestination(params.slug)

    if(destination) {
      return (
        <>
          <Header />
          <main style={{flex: "1 1 0"}} className="flex flex-col justify-center">
            <section className="py-10 bg-white">
              <div className="container grid grid-cols-1 md:gap-20 gap-10 md:grid-cols-2 items-start">
                <div>
                  <SynchronizedCarousel imageSlideFromDB={destination.imageSlide} imageThumb={destination.imagePath}/>
                </div>
                <div className="bg-[#FFFEEE] flex flex-col gap-y-4 px-6 md:px-12 py-5 md:py-10 rounded-xl shadow-lg">
                  <p>Created at: {`${new Date(destination.createdAt).toLocaleDateString('pt-BR')}`}</p>
                  <div className="flex flex-row gap-x-4 justify-start items-center">
                    <h1 className="text-4xl text-sky-950 font-bold">{(destination.name)?.toUpperCase()}</h1>
                    <ShareButton title={destination.name} url={`https://flytoptravels.com/${destination.slug}/destination`}/>
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
                    <Image src={destination.company.imagePath} width={150} height={75} alt={destination.company.name} className="mix-blend-multiply"/>
                  </p>

                  <div>
                    <p className="text-4xl text-green-800 font-bold mb-2">
                      <span className="text-lg">{destination.isCADol ? "CA$" : "U$"} </span>
                      {(destination.price)?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>

                    <p className="text-lg line-through text-sky-950 font-bold mb-2">
                      <span className="text-lg">WAS </span>
                      {(destination.regularPrice)?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div><span className="text-lg font-bold">Departure date:</span> <div dangerouslySetInnerHTML={{ __html: destination.departureDates}}></div></div>
                    <div><span className="text-lg font-bold">Return date:</span> <div dangerouslySetInnerHTML={{ __html: destination.returnDates}}></div></div>
                  </div>

                  <BuyButton departureCity={destination.departureCity} destinationCity={destination.name} flightCompany={destination.company.name}/>
                </div>
              </div>
            </section>
          </main>
          <Footer/>
        </>
      )
    }

    return (
      <>
        <Header />
        <main style={{flex: "1 1 0"}} className="flex flex-col justify-center items-center">
          <h1 className="text-4xl leading-[3rem] text-sky-950 font-bold mb-6 text-center md:text-6xl md:leading-[4.3rem]">Destination not found</h1>
        </main>
        <Footer/>
      </>
    )
  } catch(e: any) {
    return <h1>{e}</h1>
  }
}