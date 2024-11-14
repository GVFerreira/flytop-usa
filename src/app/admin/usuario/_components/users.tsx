'use client'

import { deleteUser, getUsers } from "../../action"

import { useEffect, useState } from "react"
import { Pencil, Trash2 } from 'lucide-react'

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { toast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string
  email: string
}

export default function Users() {
  // Defina o estado como um array de Category
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchUsers() {
      const data: User[] = await getUsers()
      setUsers(data)
    }
    fetchUsers()
  }, [])

  async function handleDelete(id: string) {
    const user = await deleteUser(id)

    if (user.status === 200) {
      toast({
        title: "Sucesso",
        description: "Usuário excluído com sucesso"
      })
      setUsers(users.filter(user => user.id !== id))
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o usuário."
      })
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell>
              <p>{user.name}</p>
            </TableCell>
            <TableCell>
              <p>{user.email}</p>
            </TableCell>
            <TableCell className="h-full flex flex-row items-center justify-center gap-x-4">
              <Trash2 className="text-red-500 size-6 cursor-pointer" onClick={() => handleDelete(user.id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
