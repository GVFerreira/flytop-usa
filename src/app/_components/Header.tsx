'use client'

import { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChevronDown, Menu, X, Mail } from "lucide-react"
import Link from "next/link"
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
          <Link className="block md:inline text-base font-medium hover:text-opacity-75 py-2 md:py-0 px-4 md:px-0" href="/">
            Home
          </Link>
          <Link className="block md:inline text-base font-medium hover:text-opacity-75 py-2 md:py-0 px-4 md:px-0" href="/about">
            About
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <p className="flex text-base font-medium hover:text-opacity-75 py-2 md:py-0 px-4 md:px-0 items-center">
                Destinations
                <ChevronDown className="ml-1 w-4 h-4" />
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link className="block px-4 py-2 text-sm hover:bg-gray-100" href="#">
                  America
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="block px-4 py-2 text-sm hover:bg-gray-100" href="#">
                  Europe
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link className="block px-4 py-2 text-sm hover:bg-gray-100" href="#">
                  Asia
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="cta">
            <Link className="flex items-center" href="/contact">
              Get in touch
              <Mail className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
