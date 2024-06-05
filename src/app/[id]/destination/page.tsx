import Image from "next/image"
import Footer from "../../_components/Footer"
import Header from "../../_components/Header"
import { getDestination } from "../../actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Props {
  params: {id: string}
}

export default async function Destination({params}: Props) {

 

  const destination = await getDestination(params.id)

  function normalizedate(date: Date) {
    const now = new Date(date)
    const day = (now.getDate() + 1).toString().padStart(2, '0')
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const year = now.getFullYear()

    return `${day}/${month}/${year}`
  }

  return (
    <>
      <Header />
      <main style={{flex: "1 1 0"}} className="flex flex-col justify-center">
        <section className="py-10 bg-white">
          <div className="container grid grid-cols-1 md:gap-20 gap-10 md:grid-cols-2">
            <Image
              src={`https://source.unsplash.com/random/512x512?${destination?.name + ' tourist attraction'}`}
              alt={`Image ${destination?.destination_airport}`}
              className="w-full md:w-10/12 mx-auto mb-4 rounded-xl border-2 border-slate-900"
              width={512}
              height={512}
            />
            <div className="bg-[#FFFEEE] px-6 md:px-12 py-5 md:py-10 rounded-xl shadow-lg">
              <h1 className="text-4xl text-sky-950 font-bold mb-2">{(destination?.name)?.toUpperCase()}</h1>
              <h2 className="text-lg">Airport: {destination?.name} ({destination?.destination_airport})</h2>
              <p className="mb-6">Flight company: {destination?.flight_company}</p>
              <p className="text-4xl text-sky-950 font-bold mb-2">
                <span className="text-lg">U$</span>
                {(destination?.value)?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <br />
              {/* @ts-ignore */}
              <p>Departure date: {normalizedate(destination?.departure_date)}</p>
              {/* @ts-ignore */}
              <p>Return date: {normalizedate(destination?.return_date)}</p>
              <br />
              <p>Origin airport: {destination?.departure_airport}</p>
              <p>Destination airport: {destination?.destination_airport}</p>

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