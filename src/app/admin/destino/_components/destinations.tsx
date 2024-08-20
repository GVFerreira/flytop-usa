'use client' // Mudança aqui

import Image from 'next/image'
import { useRouter } from "next/navigation"
import { getDestinations, deleteDestination } from "../../action"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Pencil, Trash2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useState, useEffect } from 'react'

export default function Destinations() {
  const router = useRouter()
  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    async function fetchDestinations() {
      const data: any = await getDestinations()
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
          <TableHead>Datas</TableHead>
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
                alt="Product image"
              />
            </TableCell>
            <TableCell className="font-medium">{destination.name}</TableCell>
            <TableCell className="hidden md:table-cell">{destination.price}</TableCell>
            <TableCell>{destination.flightStopover ? destination.airportStopover : "Não"}</TableCell>
            <TableCell className="hidden md:table-cell">{new Date(destination.departureDates).toDateString()} | {new Date(destination.returnDates).toDateString()}</TableCell>
            <TableCell className="h-auto flex flex-row justify-center gap-x-4">
              <a href={`/admin/destino/${destination.id}/edit`} >
                <Pencil className="text-yellow-500 size-6 cursor-pointer" />
              </a>
              <Trash2 className="text-red-500 size-6 cursor-pointer" onClick={() => handleDelete(destination.id, destination.imagePath)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
