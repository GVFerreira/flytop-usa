'use client'

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { useFormState } from "react-dom"
import { submitFormAction } from "./actions"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Image from 'next/image'
import { createCompany } from "../../action"

export default function AddCompany() {
  const route = useRouter()
  const form = useForm()

  const formSubmit = form.handleSubmit(async (data) => {
    try {
      await createCompany(data)
      toast({
        title: 'Sucesso',
        description: 'Companhia criada com sucesso.'
      })
    } catch (e) {
      console.log(e)
      toast({
        title: 'Erro',
        description: 'Um erro ocorreu ao criar a companhia.'
      })
    } finally {
      route.push("/admin/companhia")
      route.refresh()
    }
  })

  const { setValue } = form
  const initialState = {
    url: '',
  }
  const [state, formAction] = useFormState(submitFormAction, initialState)

  useEffect(() => {
    setValue('image_path', state.url)
  }, [state.url, setValue])

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Criar companhia aérea</h1>
      </div>
      <div className="grid grid-cols-2 space-x-4">
        <form onSubmit={formSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="name">Nome da companhia</label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="name"
                type="text"
                required
                {...form.register('name')}
              />
            </div>
            <div>
              <input
                className="w-full h-0"
                id="image_path"
                type="text"
                required
                {...form.register('image_path')}
              />
            </div>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Salvando...' : 'Criar categoria'}
            </Button>
          </div>
        </form>
        <div>
          <form action={formAction} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="file">Upload de imagem</label>
              <div className="relative w-full">
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="file"
                  name="file"
                  type="file"
                />
                <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  <Upload className="size-4" />
                </div>
              </div>
            </div>

            <Button variant="secondary">Enviar Imagem</Button>

            {state.url && (
              <Image src={state.url} alt={state.url} width={512} height={512} className="mt-12"/>
            )}
          </form>
        </div>
      </div>
    </main>
  )
}