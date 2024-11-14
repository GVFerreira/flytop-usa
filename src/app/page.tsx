'use client'

import { getCategories, getHeroHeader } from './actions'
import Link from "next/link"

import { useState, useEffect } from 'react'
import { Plane, Send, Tag } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import NewsletterSection from "./_components/Newsletter-Section"
import { Testemonials } from "./_components/Testemonials"
import { HeroHeader } from "./_components/HeroHeader"
import { Companies } from "./_components/Companies"
import Accordion from "./_components/AccordionFAQ"
import Header from "./_components/Header"
import Footer from "./_components/Footer"

export const revalidate = 0

type Category = {
  id: string
  name: string
  slug: string
  isAirport: boolean | null
}

type HeroHeaderData = {
  id: string
  name: string
  slug: string | null
  subtitle: string
  price: number
  regularPrice: number
  isCADol: boolean
  departureDates: string
  returnDates: string
  departureCity: string
  departureAirport: string
  destinationAirport: string
  flightStopover: boolean | null
  airportStopover: string | null
  flightCompanyId: string
  imagePath: string
  imageSlide: string
  company: {
    id: string
    name: string
    slug: string
    imagePath: string
  }
  categories: {
    id: string
    destinationId: string
    categoryId: string
    category: {
      id: string
      name: string
      slug: string
      isAirport: boolean | null
    }
  }[]
  updatedAt: Date
  createdAt: Date
}

export default function Home() {
  const [heroHeader, setHeroHeader] = useState<HeroHeaderData[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      const heroData = await getHeroHeader()
      const categoriesData = await getCategories()
  
      // Sanitizando os dados do Hero Header
      const sanitizedHeroData = heroData.map(item => ({
        ...item,
        categories: item.categories.map(category => ({
          ...category,
          category: {
            ...category.category,
            isAirport: category.category.isAirport ?? null // Se for undefined, converte para null
          }
        }))
      }))
  
      setHeroHeader(sanitizedHeroData) // Definindo o hero header com os dados sanitizados
      setCategories(categoriesData)
      setLoading(false)
    }
  
    fetchData()
  }, [])
  
  // Função para filtrar com base na seleção
  const handleCategoryChange = (categoryId: string) => setSelectedCategory(categoryId)

  return (
    <>
      <Header />
      <NewsletterSection />
      <main className="w-full">
        <section className="py-10 bg-white">
          <div className="container md:flex md:justify-between md:items-end md:space-x-10 mb-10">
            <div>
              <h1 className="text-6xl leading-[4.3rem] text-sky-950 font-bold mb-6">We connect successful people to the best flights in the world</h1>
              <p className="mb-4 mr-20">Choose your flight below and save up to 50% on your next flight.</p>
            </div>
            <Button variant="cta" size="lg"><Link href="/destinations">View All Destinations</Link></Button>
          </div>
          <div className="container">
            <form action="" className="bg-sky-50 w-full md:w-1/2 mx-auto py-1 px-6 rounded-3xl md:rounded-full my-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center py-2">
                <Label className="text-center md:text-xl">Choose the nearest airport for you</Label>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full md:w-1/3 bg-white rounded-full py-6">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All airports</SelectItem>
                    {categories.filter(category => category.isAirport).map((category, index) => (
                      <SelectItem key={index} value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </form>
            {loading ?
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex flex-col items-center justify-center space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
            :
            <HeroHeader 
              data={heroHeader.filter(item => 
                selectedCategory === 'all' ? item.categories.some(cat => cat.category.slug === "hero-header") : item.categories.some(cat => cat.categoryId === selectedCategory)
              ).slice(0, 8)} 
            />
          
            }
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="container">
            <h2 className="text-lg text-center text-sky-950 font-bold mb-6">Airlines we fly</h2>
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

        <section className="py-10 bg-[#7ABED5] flex flex-col items-start justify-center">
          <div className="container">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl text-sky-950 font-bold mb-6">Who are we?</h2>
              <p className="mb-4 text-sky-800">From travelers, for travelers. With more than 5 years of experience, we are experts in finding cheap flights, both domestic and international. Our offers are usually 30% to 50% cheaper than regular airline prices. If its not an amazing offer, we won&apos;t send it!.</p>
              <Link href="/about"><Button variant="outline">About us</Button></Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="md:container">
            <h2 className="text-4xl mb-10 text-center">Offers that some of our members have already <b>taken advantage of</b></h2>
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
