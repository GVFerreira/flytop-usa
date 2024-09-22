'use client'

import React from 'react'

import { Button } from '@/components/ui/button'

const handleBuyClick = (departureCity: string, destinationCity: string, flightCompany: string) => {
  if (window.Intercom) {
    const message = `I would like to know more about the flight from ${departureCity} to ${destinationCity} with ${flightCompany}.`
    
    // Rastreia o evento
    window.Intercom('trackEvent', {
      departure_city: departureCity,
      destination_city: destinationCity,
      flight_company: flightCompany,
    })

    // Abre o Intercom com a mensagem pré-definida
    window.Intercom('showNewMessage', message)
  } else {
    console.error('Intercom is not loaded')
  }
}

const BuyButton = ({ departureCity, destinationCity, flightCompany }: {departureCity: string, destinationCity: string, flightCompany: string}) => (
  <Button
    onClick={() => handleBuyClick(departureCity, destinationCity, flightCompany)}
    variant="cta"
    className="buy-button w-1/2 mx-auto mt-6"
  >
    BUY NOW
  </Button>
)

export default BuyButton;
