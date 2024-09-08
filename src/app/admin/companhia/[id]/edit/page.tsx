'use client'

import Image from 'next/image'
import { useRouter } from "next/navigation"
import { getUniqueCompany, submitFormAction, updateCompany } from "./action"

import { useState, useEffect } from "react"
import { useFormState } from "react-dom"
import { SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Upload } from "lucide-react"

interface Company {
  id: string
  name: string
  imagePath: string
}

export default function EditCompany({ params }: { params: { id: string } }) {
  const [initialData, setInitialData] = useState<Company | undefined>(undefined)
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>()
  const { register, handleSubmit, setValue, reset, formState } = useForm<Company>()

  const route = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyData = await getUniqueCompany(params.id)
        
        if (companyData) setInitialData(companyData)

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [params.id])

  useEffect(() => {
    if (initialData) {
      setUploadedImagePath(initialData.imagePath)
      reset(initialData)
    }
  }, [initialData, reset, setValue])

  const handleSingleImageUpload = async (file: File | null) => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      const { url } = await submitFormAction(null, formData)
      setValue('imagePath', url)
      setUploadedImagePath(url)
    }
  }

  const formSubmit: SubmitHandler<Company> = async (data) => {
    try {
      await updateCompany(data, params.id)
      toast({
        title: 'Sucesso',
        description: 'Companhia atualizada com sucesso.'
      })
      route.push("/admin/companhia")
    } catch (e) {
      console.log(e)
      toast({
        title: 'Erro',
        description: 'Um erro ocorreu ao atualizar a companhia.'
      })
    } finally {
      route.refresh()
    }
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Criar companhia aérea</h1>
      </div>
      <form onSubmit={handleSubmit(formSubmit)} className="w-1/2">
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="name">Nome da companhia</label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="name"
              type="text"
              required
              {...register('name')}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="file">Upload de imagem</label>
            <div className="relative w-full">
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="single_image"
                type="file"
                onChange={(e) => handleSingleImageUpload(e.target.files?.[0] || null)}
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <Upload className="size-4" />
              </div>
            </div>
            {uploadedImagePath ? (
              <Image
                src={uploadedImagePath}
                alt="Imagem principal"
                width={300}
                height={300}
                className="object-contain rounded-md aspect-square"
              />)
              :
              (
                <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                  <span>Carregando...</span>
                </div>
              )
            }
          </div>
          <Button type="submit" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? 'Salvando alterações...' : 'Atualizar'}
          </Button>
        </div>
      </form>
    </main>
  )
}