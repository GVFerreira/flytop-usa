'use server'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import Image from 'next/image'
import { getDestinations } from "../../action"
import { Pencil } from 'lucide-react'


export default async function Destinations() {
  const destinations = await getDestinations()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Imagem</TableHead>
          <TableHead className="max-w-[150px]">Destino</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Conexão</TableHead>
          <TableHead>Datas</TableHead>
          <TableHead>Ações</TableHead>
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
            <TableCell>{destination.flightStopover ? destination.airportStopover  : "Não"}</TableCell>
            <TableCell className="hidden md:table-cell">{new Date(destination.departureDates).toDateString()} | {new Date(destination.returnDates).toDateString()}</TableCell>
            <TableCell>
              <a href={`/admin/destino/${destination.id}/edit`} className="flex bg-yellow-500 rounded-full size-10"><Pencil className="size-4 m-auto"/></a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
