'use client'

import { getDestinations, getCategories } from '../actions'
import Image from 'next/image'
import Link from 'next/link'

import { useState, useMemo, useEffect } from 'react'

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { ListOrdered, Plane } from 'lucide-react'
import { Pagination } from '@/components/ui/pagination'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import Header from '../_components/Header'
import Footer from '../_components/Footer'

interface Destination {
  id: string
  name: string
  slug?: string | null
  subtitle: string
  price: number
  regularPrice: number
  imagePath: string
  departureCity: string
  destinationAirport: string
  createdAt: Date
  company: Company
  categories: Category[]
}

interface Category {
  id: string
  name: string
  slug: string
  isAirport: boolean | null
}

interface Company {
  id: string
  name: string
  slug: string
}

export default function Destinations() {
  const [selectedFilters, setSelectedFilters] = useState<{ category: string[] }>({ category: [] })
  const [sortBy, setSortBy] = useState<string>('price-asc')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const itemsPerPage = 12

  useEffect(() => {
    async function fetchData() {
      try {
        const destinations = await getDestinations()
  
        // Formata os destinos normalmente
        const formattedDestinations = destinations.map(destination => ({
          ...destination,
          categories: destination.categories.map((categoryRelation: any) => ({
            id: categoryRelation.category.id,
            name: categoryRelation.category.name,
            slug: categoryRelation.category.slug,
            isAirport: categoryRelation.category.isAirport ?? null
          }))
        }))
        setDestinations(formattedDestinations)
  
        // Filtra as categorias para remover aquelas com slug 'hero-header'
        const categories = await getCategories()
        const filteredCategories = categories.filter(category => category.slug !== 'hero-header')
  
        setCategories(filteredCategories)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
  
    fetchData()
  }, [])
  
  

  // Filtragem e ordenação de destinos
  const filteredDestinations = useMemo(() => {
    return destinations
      .filter(destination => {
        if (
          selectedFilters.category.length > 0 &&
          !destination.categories.some(category => selectedFilters.category.includes(category.name))
        ) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        const first = new Date(a.createdAt).getTime()
        const second = new Date(b.createdAt).getTime()

        switch (sortBy) {
          case 'date-asc':
            return first - second
          case 'date-desc':
            return second - first
          default:
            return 0
        }
      })
  }, [destinations, selectedFilters, sortBy])

  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage)
  const currentDestinations = filteredDestinations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleFilterChange = (type: string, value: string) => {
    if (type === 'category') {
      setSelectedFilters(prev => ({
        ...prev,
        category: prev.category.includes(value)
          ? prev.category.filter(item => item !== value)
          : [...prev.category, value]
      }))
    }
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-[240px_1fr] gap-8">
          <div className="grid gap-6">
            <Accordion type="single" collapsible>
              <AccordionItem value="category">
                <AccordionTrigger className="text-base font-semibold">Category</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {categories.map(category => (
                      <Label key={category.id} className="flex items-center gap-2 font-normal">
                        <Checkbox
                          checked={selectedFilters.category.includes(category.name)}
                          onCheckedChange={() => handleFilterChange('category', category.name)}
                        />
                        {`${category.isAirport ? "From: " + category.name : category.name}`}
                      </Label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="grid gap-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Destinations</h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ListOrdered className="h-4 w-4" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]">
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSortChange}>
                    <DropdownMenuRadioItem value="date-asc">Date: Older to Newer</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="date-desc">Date: Newer to Older</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              { currentDestinations && currentDestinations.map((destination, index) => (
                <Link href={`/${destination.slug}/destination`} key={index}>
                  <div className="bg-[#FFFEEE] rounded-3xl p-4 hover:cursor-pointer">
                    <div className="mb-4 relative">
                      <Image
                        src={destination.imagePath}
                        alt={`Image ${index}`}
                        width={512} 
                        height={512}
                        className="w-full aspect-square object-cover mb-4 rounded-xl border-2 border-slate-900"
                      />
                      <div className="absolute top-3 left-2">
                        <span className="rounded-full text-sm line-through px-4 py-2 text-slate-950 bg-white font-bold border border-slate-950">
                          was U$ {(destination.regularPrice).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-green-600">
                        From U$ {(destination.price).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </p>
                      <h3 className="text-xl font-bold text-sky-950">{destination.name} <span className="font-normal text-base"> ({destination.destinationAirport})</span></h3>
                      <p>From: {destination.departureCity}</p>
                      <p className="flex gap-2"><Plane /> {destination.company.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center">
              {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
