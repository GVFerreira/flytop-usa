'use client'

import { useState, useRef } from 'react'
import { useEffect } from 'react'

interface AccordionType {
  question: string,
  answer: string,
  open?: boolean
}

export default function Accordion({ question, answer, open }: AccordionType) {
  const [isOpen, setIsOpen] = useState(open)
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState('0px')

  useEffect(() => {
    if (isOpen) {
      setMaxHeight(`${contentRef.current?.scrollHeight}px`)
    } else {
      setMaxHeight('0px')
    }
  }, [isOpen])

  const handleToggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div onClick={handleToggleAccordion} className={`cursor-pointer mb-3 rounded-lg ${isOpen ? 'bg-sky-200' : 'bg-sky-100'} transform transition-all duration-500 ease-in`}>
      <div className="flex items-center justify-between w-full p-5">
        <h4 className="text-lg text-start font-bold w-full">{question}</h4>
        <span className="bg-primary rounded-full text-slate-200 w-4 h-4 relative">
          <svg xmlns="http://www.w3.org/2000/svg" className={`absolute top-0 left-0 w-4 h-4 ${isOpen ? 'rotate-0' : 'rotate-90'} transform transition-all duration-500 ease-in`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
          </svg>
        </span>
      </div>

      <div
        ref={contentRef}
        style={{ maxHeight }}
        className={`overflow-hidden transition-all duration-500 ease-in-out`}
      >
        <p className="text-justify text-md text-gray-700 pt-2 pb-8 px-4">
          {answer}
        </p>
      </div>
    </div>
  )
}
