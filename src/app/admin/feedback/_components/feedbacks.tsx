'use client'

import { getFeedbacks } from "../../action"
import Image from 'next/image'

import { useState, useEffect } from "react"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Trash2 } from 'lucide-react'

interface Feedbacks {
  id: string
  name: string
  imagePath: string
  slug: string
  createdAt: Date
}

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedbacks[]>([])

  useEffect( () => {
    const fetchData = async () => {
      try {
        const feedback = await getFeedbacks()
        if(feedback) setFeedbacks(feedback)

      } catch (e) {
        console.error('Error fetching data:', e)
      }
    }

    fetchData()
  }, [])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-[160px]">Imagem</TableHead>
          <TableHead>Nome do cliente</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feedbacks.map((feedback, index) => (
          <TableRow key={index}>
            <TableCell>
              <Image
                src={feedback.imagePath}
                width={1080}
                height={1920}
                alt={`${feedback.name}`}
                className="aspect-[9/16] object-cover w-24 mx-auto rounded"
              />
            </TableCell>
            <TableCell>
              <p>{feedback.name}</p>
            </TableCell>
            <TableCell className="h-full flex flex-row items-stretch justify-center gap-x-4">
              <Trash2 className="text-red-500 size-6 cursor-pointer" /* onClick={() => handleDelete(destination.id, destination.imagePath)} */ />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
