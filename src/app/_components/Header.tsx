'use client'

import { useState } from 'react'

import { Button } from "@/components/ui/button"

import { Menu, X, Mail } from "lucide-react"
import Logotipo from "./Logotipo"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className='bg-[#FFFEEE]'>
      <div className="container flex justify-between items-center py-4">
        <Logotipo />
        <button
          onClick={handleToggleMenu}
          className="md:hidden flex items-center text-black"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <nav className={`md:flex items-center md:space-x-12 ${menuOpen ? 'block' : 'hidden'} absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-white shadow-md py-6 px-8 md:shadow-none md:py-0 md:bg-transparent z-10 md:z-auto`}>
          <a className="block md:inline text-base font-medium hover:text-opacity-75 py-2 md:py-0 px-4 md:px-0" href="/">
            Home
          </a>
          <a className="block md:inline text-base font-medium hover:text-opacity-75 py-2 md:py-0 px-4 md:px-0" href="/about">
            About
          </a>
          <a className="block md:inline text-base font-medium hover:text-opacity-75 py-2 md:py-0 px-4 md:px-0" href="/destinations">
            Destinations
          </a>
          <Button variant="cta">
            <a className="flex items-center" href="/contact">
              Get in touch
              <Mail className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}
