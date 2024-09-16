'use client'

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { createCategory } from "../../action"

export default function AddCategory() {
  const route = useRouter()

  const form = useForm()

  const formSubmit = form.handleSubmit(async (data) => {
    try {
      await createCategory(data)
      toast({
        title: 'Sucesso',
        description: 'Categoria criada com sucesso'
      })
    } catch (e) {
      console.log(e)
      toast({
        title: 'Erro',
        description: 'Um erro ocorreu ao criar a categoria'
      })
    } finally {
      route.push("/admin/categoria")
      route.refresh()
    }
  })

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Criar categoria</h1>
      </div>
      <form onSubmit={formSubmit} className="grid grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="name">Categoria</label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="name"
              type="text"
              required
              {...form.register('name')}
            />
          </div>
          <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="is_airport"
                {...form.register("is_airport")}
              />
              <label htmlFor="is_airport">Esta categoria é um aeroporto?</label>
            </div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Salvando...' : 'Criar categoria'}
          </Button>
        </div>
      </form>
    </main>
  )
}