import { Button } from "@/components/ui/button"

import Header from "./_components/Header"
import { HeroHeader } from "./_components/HeroHeader"
import { NineCards } from "./_components/NineCards"
import { Testemonials } from "./_components/Testemonials"
import { Companies } from "./_components/Companies"
import Accordion from "./_components/AccordionFAQ"
import Link from "next/link"

import { Plane, Send, Tag } from "lucide-react"
import Footer from "./_components/Footer"

import { getHeroHeader } from './actions'

export default async function Home() {
  const destinations = await getHeroHeader()

  return (
    <>
      <Header />
      <main className="w-full">
        <section className="py-10 bg-white">
          <div className="container md:flex md:justify-between md:items-end md:space-x-10 mb-10">
            <div>
              <h1 className="text-5xl leading-[3.5rem] text-sky-950 font-bold mb-6 md:text-7xl md:leading-[5rem]">We connect successful people to the best flights in the world</h1>
              <p className="mb-4 mr-20">Choose your flight below and save up to 50% on your next flight.</p>
            </div>
            <Button variant="cta" size="lg"><Link href="/destinations">View All Destinations</Link></Button>
          </div>
          <div className="container">
            <HeroHeader data={destinations}/>
          </div>
        </section>

        <section className="pt-10 pb-20">
          <div className="container">
            <h2 className="text-4xl text-sky-950 text-center font-bold mb-6">You may also be interested</h2>
            <p className="text-center mb-10">Didn&apos;t find your ideal trip above? Here are other flights you can take.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <NineCards data={destinations}/>
            </div>
          </div>
        </section>

        <section className="py-10 bg-[#7ABED5] flex flex-col items-start justify-center lg:bg-about-us-main bg-contain bg-no-repeat bg-right min-h-[500px]">
          <div className="container">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl text-sky-950 font-bold mb-6">Who are we?</h2>
              <p className="mb-4 text-sky-800">From travelers, for travelers. With more than 5 years of experience, we are experts in finding cheap flights, both domestic and international. Our offers are usually 30% to 50% cheaper than regular airline prices. If its not an amazing offer, we won&apos;t send it!.</p>
              <Link href="/about"><Button variant="outline">About us</Button></Link>
            </div>
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="container">
            <h2 className="text-lg text-center text-sky-950 font-bold mb-6">Airline we fly</h2>
          </div>
          <Companies />
        </section>

        <section className="bg-sky-950 py-20">
          <div className="container">
            <h2 className="text-4xl text-center text-slate-50 font-bold mb-10">How Fly Top works?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-sky-100 space-y-4 p-5 rounded-xl border-2 border-sky-300 shadow-xl">
                <Send className="size-12 mx-auto text-primary"/>
                <h3 className="text-2xl text-sky-950 text-center font-bold">Send a message.</h3>
                <p className="text-center">We are available in our chat to arrange your next flight. Send a message informing your trip of interest and one of our consultants will assist you.</p>
              </div>
              <div className="bg-sky-100 space-y-4 p-5 rounded-xl border-2 border-sky-300 shadow-xl">
                <Tag className="size-12 mx-auto text-primary"/>
                <h3 className="text-2xl text-sky-950 text-center font-bold">When the price drops, you&apos;ll know!</h3>
                <p className="text-center">Whether via newsletter, social media or on our homepage, we always have the freshest offers for the best flights.</p>
              </div>
              <div className="bg-sky-100 space-y-4 p-5 rounded-xl border-2 border-sky-300 shadow-xl">
                <Plane className="size-12 mx-auto text-primary"/>
                <h3 className="text-2xl text-sky-950 text-center font-bold">Your flight is issued immediately.</h3>
                <p className="text-center">Our service prioritizes agility and effectiveness. Once payment has been made, we have a team ready to start issuing your tickets.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="md:container">
            <Testemonials />
          </div>
        </section>

        <section className="bg-primary text-slate-50 py-10">
          <div className="container md:grid md:grid-cols-2">
            <h2 className="text-4xl font-bold mb-6">What is our mission?</h2>
            <div>
              <p className="text-slate-200 mb-4">Our mission is to ensure that our customers never pay full price for an airline ticket again.</p>
              <Button variant="cta">Click here</Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container md:grid md:grid-cols-2 md:gap-10">
            <div>
              <h2 className="text-4xl font-bold mb-6">FAQs</h2>
              <p className="mb-4">Have questions? Read.</p>
              <Button>Contact</Button>
            </div>
            <div className="mt-10 md:m-0">
              <Accordion
                question="Is FlyTop a travel agency and issues airline tickets?"
                answer="Yes, FLY TOP TRAVELS LLC is a travel agency and is headquartered in the state of Florida. We are specialists in economy and business class tickets and last minute tickets at incredible prices!"
                open
              />
              <Accordion
                question="How does FlyTop get such good prices?"
                answer="We have a team that monitors special fare availability on the world's main airlines on a daily basis. While it's difficult to predict the time or date when the cheapest flights will appear, the good news is that cheap flights are popping up all the time."
              />
              <Accordion
                question="How does the FlyTop community work?"
                answer="We have created the largest cheap tickets community. You can access it on our Facebook, X, or by subscribing to our newsletter."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
