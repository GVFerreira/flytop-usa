'use client'

import { useRouter } from "next/navigation"
import { getUniqueCategory, updateCategory } from "./action"

import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface Category {
  id: string
  name: string
  slug: string
}

export default function EditCategory({ params }: { params: { id: string } }) {
  const [initialData, setInitialData] = useState<Category | undefined>(undefined)
  const { register, handleSubmit, setValue, reset, formState } = useForm<Category>()

  const route = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getUniqueCategory(params.id)
        
        if (categoryData) setInitialData(categoryData)

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [params.id])

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset, setValue])

  const formSubmit: SubmitHandler<Category> = async (data) => {
    try {
      await updateCategory(data, params.id)
      toast({
        title: 'Sucesso',
        description: 'Categoria atualizada com sucesso'
      })
      route.push("/admin/categoria")
    } catch (e) {
      console.log(e)
      toast({
        title: 'Erro',
        description: 'Um erro ocorreu ao atualizar a categoria'
      })
    } finally {
      route.refresh()
    }
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Editar categoria</h1>
      </div>
      <form onSubmit={handleSubmit(formSubmit)} className="grid grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="name">Categoria</label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="name"
              type="text"
              required
              {...register('name')}
            />
          </div>
          <Button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? 'Salvando alterações...' : 'Atualizar'}
          </Button>
        </div>
      </form>
    </main>
  )
}