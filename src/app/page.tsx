import { Button } from "@/components/ui/button"

import Header from "./_components/Header"
import { HeroHeader } from "./_components/HeroHeader"
import { Testemonials } from "./_components/Testemonials"
import Accordion from "./_components/AccordionFAQ"
import { Companies } from "./_components/Companies"
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
          <div className="container md:flex justify-between items-end mb-10">
            <div>
              <span className="font-semibold">last updates</span>
              <h1 className="text-5xl text-sky-950 font-bold mb-6">Choose your flight</h1>
              <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi necessitatibus hic, vitae voluptatem quaerat exercitationem.</p>
            </div>
            <Button variant="cta" size="lg"><Link href="/destinations">View All Destinations</Link></Button>
          </div>
          <HeroHeader data={destinations}/>
        </section>

        <section className="py-10 bg-[#FFFEEE]">
          <div className="container">
            <h2 className="text-4xl text-sky-950 text-center font-bold mb-6">You might be interested</h2>
            <p className="text-center mb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, perspiciatis.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <article className="w-full rounded-xl border-2 border-slate-900" style={{backgroundImage: "url(https://source.unsplash.com/random/1050x312?sig=1)", backgroundSize: "cover", backgroundPosition: "center", }}>
                <div className="bg-zinc-800/70 p-4 rounded-lg">
                  <h3 className="text-2xl font-bold text-slate-50">Destination</h3>
                  <p className="text-slate-300">Additional information</p>
                  <p className="text-slate-300 font-semibold mb-4">U$ 299.00</p>
                  <Button variant="cta">Buy</Button>
                </div>
              </article>
              <article className="w-full rounded-xl border-2 border-slate-900" style={{backgroundImage: "url(https://source.unsplash.com/random/1050x312?sig=2)", backgroundSize: "cover", backgroundPosition: "center", }}>
                <div className="bg-zinc-800/70 p-4 rounded-lg">
                  <h3 className="text-2xl font-bold text-slate-50">Destination</h3>
                  <p className="text-slate-300">Additional information</p>
                  <p className="text-slate-300 font-semibold mb-4">U$ 299.00</p>
                  <Button variant="cta">Buy</Button>
                </div>
              </article>
              <article className="w-full rounded-xl border-2 border-slate-900" style={{backgroundImage: "url(https://source.unsplash.com/random/1050x312?sig=3)", backgroundSize: "cover", backgroundPosition: "center", }}>
                <div className="bg-zinc-800/70 p-4 rounded-lg">
                  <h3 className="text-2xl font-bold text-slate-50">Destination</h3>
                  <p className="text-slate-300">Additional information</p>
                  <p className="text-slate-300 font-semibold mb-4">U$ 299.00</p>
                  <Button variant="cta">Buy</Button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="py-10 bg-[#7ABED5] flex flex-col items-start justify-center lg:bg-about-us-main bg-contain bg-no-repeat bg-right min-h-[500px]">
          <div className="container">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl text-sky-950 font-bold mb-6">Who we are?</h2>
              <p className="mb-4 text-sky-800">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore ad rerum officia cumque id laborum earum voluptatem facere blanditiis, nam porro deleniti debitis sequi? Porro laborum, sint ducimus harum repellendus dolore perferendis mollitia dolorem nihil repudiandae nesciunt incidunt necessitatibus ipsa expedita quos tenetur quasi sit tempore at modi explicabo pariatur.</p>
              <Link href="/about"><Button variant="outline">About us</Button></Link>
            </div>
          </div>
        </section>

        <section className="py-10 bg-[#FFFEEE]">
          <div className="container">
            <h2 className="text-lg text-center text-sky-950 font-bold mb-6">Most used airlines in the world</h2>
          </div>
          <Companies />
        </section>

        <section className="bg-sky-950 py-10">
          <div className="container">
            <h2 className="text-4xl text-center text-slate-50 font-bold mb-10">How Fly Top works?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-sky-100 space-y-4 p-5 rounded-xl border-2 border-sky-300 shadow-xl">
                <Send className="size-12 mx-auto text-primary"/>
                <h3 className="text-2xl text-sky-950 text-center font-bold">Send a message</h3>
                <p className="text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis quam, nam labore corrupti eos voluptas! Quisquam reiciendis velit, unde autem ullam ratione numquam natus quidem.</p>
              </div>
              <div className="bg-sky-100 space-y-4 p-5 rounded-xl border-2 border-sky-300 shadow-xl">
                <Tag className="size-12 mx-auto text-primary"/>
                <h3 className="text-2xl text-sky-950 text-center font-bold">When the price drops, you will know!</h3>
                <p className="text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis quam, nam labore corrupti eos voluptas! Quisquam reiciendis velit, unde autem ullam ratione numquam natus quidem.</p>
              </div>
              <div className="bg-sky-100 space-y-4 p-5 rounded-xl border-2 border-sky-300 shadow-xl">
                <Plane className="size-12 mx-auto text-primary"/>
                <h3 className="text-2xl text-sky-950 text-center font-bold">Your flight is issued immediately.</h3>
                <p className="text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis quam, nam labore corrupti eos voluptas! Quisquam reiciendis velit, unde autem ullam ratione numquam natus quidem.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-[#FFFEEE]">
          <div className="md:container">
            <Testemonials />
          </div>
        </section>

        <section className="bg-primary text-slate-50 py-10">
          <div className="container md:grid md:grid-cols-2">
            <h2 className="text-4xl font-bold mb-6">Último CTA da página</h2>
            <div>
              <p className="text-slate-200 mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem distinctio porro soluta aliquam minima nesciunt quisquam voluptas architecto atque iure.</p>
              <Button variant="cta">Click here</Button>
            </div>
          </div>
        </section>

        <section className="py-10 bg-[#FFFEEE]">
          <div className="container md:grid md:grid-cols-2 md:gap-10">
            <div>
              <h2 className="text-4xl font-bold mb-6">FAQs</h2>
              <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, recusandae. Explicabo excepturi quisquam officia velit?</p>
              <Button>Contact</Button>
            </div>
            <div className="mt-10 md:m-0">
              <Accordion
                question="Lorem 1?"
                answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni pariatur, blanditiis quisquam quam voluptates nulla architecto officiis quis minus aut natus, quas expedita saepe laborum."
                open
              />
              <Accordion
                question="Lorem 2?"
                answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni pariatur, blanditiis quisquam quam voluptates nulla architecto officiis quis minus aut natus, quas expedita saepe laborum."
              />
              <Accordion
                question="Lorem 3?"
                answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni pariatur, blanditiis quisquam quam voluptates nulla architecto officiis quis minus aut natus, quas expedita saepe laborum."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
