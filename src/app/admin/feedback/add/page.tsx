'use client'

import { submitFormAction } from "./actions"
import { createFeedback } from "../../action"
import { useRouter } from "next/navigation"
import Image from 'next/image'

import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function AddFeedback() {
  const { setValue, handleSubmit, formState, register } = useForm()
  const [uploadedImagePath, setUploadedImagePath] = useState<string>("")
  const initialState = {
    url: '',
  }
  const [state, formAction] = useFormState(submitFormAction, initialState)
  
  const route = useRouter()

  const formSubmit = handleSubmit(async (data) => {
    try {
      await createFeedback(data)
      toast({
        title: 'Sucesso',
        description: 'Feedback criado com sucesso.'
      })
    } catch (e) {
      console.log(e)
      toast({
        title: 'Erro',
        description: 'Um erro ocorreu ao criar o feedback.'
      })
    } finally {
      route.push("/admin/feedback")
      route.refresh()
    }
  })

  useEffect(() => {
    setValue('image_path', uploadedImagePath)
  }, [uploadedImagePath, setValue])

  const handleSingleImageUpload = async (file: File | null) => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      const { url } = await submitFormAction(null, formData)
      setUploadedImagePath(url)
    }
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Criar feedback</h1>
      </div>
      <form onSubmit={formSubmit}>
        <div className="space-y-4 w-1/2">
          <div>
            <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="name">Nome do cliente</label>
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
                id="file"
                type="file"
                onChange={(e) => handleSingleImageUpload(e.target.files?.[0] || null)}
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <Upload className="size-4" />
              </div>
            </div>
            {uploadedImagePath && (
              <div className="mt-4">
                <Image
                  src={uploadedImagePath}
                  alt="Imagem principal"
                  width={200}
                  height={200}
                  className="object-cover rounded-md"
                />
              </div>
            )}
          </div>
          <Button
              type="submit"
              disabled={formState.isSubmitting}
            >
            {formState.isSubmitting ? 'Salvando...' : 'Criar feedback'}
          </Button>
        </div>
      </form>
    </main>
  )
}