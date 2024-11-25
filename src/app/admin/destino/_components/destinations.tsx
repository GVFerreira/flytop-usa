'use client'

import Image from 'next/image'
import { useRouter } from "next/navigation"
import { getDestinations, deleteDestination } from "../../action"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useState, useEffect } from 'react'

// Defina o tipo Destination
interface Destination {
  id: string
  name: string
  slug: string | null
  price: number
  isCADol: boolean | null
  flightStopover: boolean | null
  airportStopover: string | null
  departureAirport: string
  destinationAirport: string
  imagePath: string
}

export default function Destinations() {
  const router = useRouter()
  
  // Defina o estado como um array de Destination
  const [destinations, setDestinations] = useState<Destination[]>([])

  useEffect(() => {
    async function fetchDestinations() {
      const data: Destination[] = await getDestinations()
      setDestinations(data)
    }
    fetchDestinations()
  }, [])

  async function handleDelete(id: string, urlImage: string) {
    const destination = await deleteDestination(id, urlImage)

    if (destination.status === 200) {
      toast({
        title: "Sucesso",
        description: "Destino excluído com sucesso"
      })
      setDestinations(destinations.filter(destination => destination.id !== id))
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o destino"
      })
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Imagem</TableHead>
          <TableHead className="max-w-[150px]">Destino</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Conexão</TableHead>
          <TableHead>De / Para</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {destinations.map((destination, index) => (
          <TableRow key={index}>
            <TableCell>
              <Image
                src={destination.imagePath}
                className="aspect-square rounded-md object-cover"
                height="64"
                width="64"
                alt="Image indisponível"
              />
            </TableCell>
            <TableCell className="font-medium">{destination.name}</TableCell>
            <TableCell className="hidden md:table-cell">{destination.isCADol ? "CA$" : "U$"} {destination.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
            <TableCell>{destination.flightStopover ? destination.airportStopover : "Não"}</TableCell>
            <TableCell className="hidden md:table-cell">{`${destination.departureAirport} / ${destination.destinationAirport}`} </TableCell>
            <TableCell className="h-full flex flex-row items-center justify-center gap-x-4">
              <a href={`/admin/destino/${destination.id}/edit`} >
                <Pencil className="text-yellow-500 size-6 cursor-pointer" />
              </a>
              <Trash2 className="text-red-500 size-6 cursor-pointer" onClick={() => handleDelete(destination.id, destination.imagePath)} />
              <a href={`/${destination.slug}/destination`} target='_blank'>
                <Eye className="text-blue-500 size-6 cursor-pointer" />
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
