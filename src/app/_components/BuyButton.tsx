'use client'

import React from 'react'

import { Button } from '@/components/ui/button'

const handleBuyClick = (departureCity: string, destinationCity: string, flightCompany: string) => {
  if (window.Intercom) {
    window.Intercom('trackEvent', {
      departure_city: departureCity,
      destination_city: destinationCity,
      flight_company: flightCompany
    })
    
    window.Intercom('show')

    setTimeout(() => {
      const message = `Eu gostaria de saber mais sobre o voo de ${departureCity} para ${destinationCity} com a ${flightCompany}.`
      
      // Acessa o campo de mensagem e preenche
      const intercomMessageField = document.querySelector<HTMLInputElement>('.intercom-composer-textarea')
      if (intercomMessageField) {
        intercomMessageField.value = message;
        // Dispara um evento para garantir que o texto seja atualizado
        intercomMessageField.dispatchEvent(new Event('input', { bubbles: true }))
      }
    }, 1000)
  } else {
    console.error('Intercom is not loaded')
  }
}

const BuyButton = ({ departureCity, destinationCity, flightCompany }: {departureCity: string, destinationCity: string, flightCompany: string}) => (
  <Button
    onClick={() => handleBuyClick(departureCity, destinationCity, flightCompany)}
    variant="cta"
    className="buy-button mt-6"
  >
    BUY NOW
  </Button>
)

export default BuyButton;
