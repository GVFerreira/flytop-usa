'use client'

import { createDestinations, getCategories, getCompanies } from "../../action"
import { submitFormAction } from "./actions"
import Image from 'next/image'
import { useRouter } from "next/navigation"

import { useForm, SubmitHandler, Controller } from "react-hook-form"
import QuillEditor from '../_components/QuillEditor'
import { useState, useEffect } from "react"
import Select from "react-select"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Company {
  id: string;
  name: string;
}

interface FormData {
  destination_name: string;
  subtitle: string;
  price: number;
  regular_price: number;
  departure_date: string;
  return_date: string;
  flight_company: string;
  departure_city: string;
  departure_airport: string;
  destination_airport: string;
  categories: string[];
  image_path: string;
  images_slide: string[];
  flight_stopover: boolean;
  stopover_airport?: string;
}

export default function AddDestination() {
  const [categories, setCategories] = useState<Category[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [uploadedImagePath, setUploadedImagePath] = useState<string>("")
  const [uploadedImagesSlide, setUploadedImagesSlide] = useState<string[]>([])
  const [showAirportStopover, setShowAirportStopover] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const router = useRouter()
  const { register, handleSubmit, setValue, formState, control } = useForm<FormData>()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies()
        setCompanies(data)
      } catch (error) {
        console.error('Error fetching companies:', error)
      }
    }
    fetchCompanies()
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleCheckboxChange = () => setShowAirportStopover(!showAirportStopover)

  const handleSingleImageUpload = async (file: File | null) => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      const { url } = await submitFormAction(null, formData)
      setUploadedImagePath(url)
    }
  }

  const handleMultipleImageUpload = async (files: FileList | null) => {
    if (files) {
      const uploadedUrls = await Promise.all(
        Array.from(files).map(async (file) => {
          const formData = new FormData()
          formData.append('file', file)
          const { url } = await submitFormAction(null, formData)
          return url
        })
      )
      setUploadedImagesSlide((prevUrls) => [...prevUrls, ...uploadedUrls])
    }
  }

  useEffect(() => {
    setValue('image_path', uploadedImagePath)
  }, [uploadedImagePath, setValue])

  useEffect(() => {
    setValue('images_slide', uploadedImagesSlide)
  }, [uploadedImagesSlide, setValue])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await createDestinations(data)
      toast({
        title: 'Sucesso',
        description: 'Destino criado com sucesso'
      })
      router.push("/admin/destino")
    } catch (e) {
      console.error(e)
      toast({
        title: 'Erro',
        description: 'Um erro ocorreu ao criar o destino'
      })
    } finally {
      router.refresh()
    }
  }

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }))

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['clean'] // Botão para limpar formatação
    ]
  }

  if (!isClient) return null

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Criar destino</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-2 gap-8">
        <div>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="destination_name">Destino</label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="destination_name"
                type="text"
                required
                {...register('destination_name')}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="subtitle">Subtítulo de oferta</label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="subtitle"
                type="text"
                required
                {...register('subtitle')}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="price">Valor FlyTop</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="price"
                  type="number"
                  required
                  {...register('price')}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="regular_price">Valor convencional</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="regular_price"
                  type="number"
                  required
                  {...register('regular_price')}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="departure_dates">Datas de ida</label>
                <Controller
                  name="departure_date"
                  control={control}
                  render={({ field }) => (
                    <QuillEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="return_date">Datas de volta</label>
                <Controller
                  name="return_date"
                  control={control}
                  render={({ field }) => (
                    <QuillEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="flight_company">Companhia aérea</label>
              <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="flight_company"
                required
                {...register('flight_company')}
              >
                <option value="0" disabled>Selecione</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              <span className="text-sm text-zinc-500">Cadastre previamente a companhia aérea.</span>
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="departure_city">Cidade de origem</label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="departure_city"
                type="text"
                required
                {...register('departure_city')}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="departure_airport">Aeroporto de saída</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="departure_airport"
                  type="text"
                  maxLength={3}
                  placeholder="Exemplo: GRU"
                  required
                  {...register('departure_airport')}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="destination_airport">Aeroporto de destino</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="destination_airport"
                  type="text"
                  maxLength={3}
                  placeholder="Exemplo: GIG"
                  required
                  {...register('destination_airport')}
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="categories">Categorias</label>
              <Select
                id="categories"
                isMulti
                placeholder="Selecione"
                onChange={(selectedOptions) =>
                  setValue(
                    'categories',
                    selectedOptions.map((option) => option.value)
                  )
                }
                options={categoryOptions}
              />
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="flight_stopover"
                {...register("flight_stopover")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="flight_stopover">Haverá escala?</label>
            </div>
            {showAirportStopover && (
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="stopover_airport">Aeroporto da escala</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="stopover_airport"
                  type="text"
                  maxLength={3}
                  placeholder="Exemplo: MIA"
                  {...register('stopover_airport')}
                />
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <Button type="submit" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? "Aguarde..." : "Adicionar"}
            </Button>
          </div>
        </div>
        <div>
          {/* Upload de uma única imagem */}
          <div>
            <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="single_image">Imagem principal</label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="single_image"
              type="file"
              onChange={(e) => handleSingleImageUpload(e.target.files?.[0] || null)}
            />
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
          {/* Upload de múltiplas imagens */}
          <div className="mt-8">
            <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="images_slide">Imagens para o carrossel</label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="images_slide"
              type="file"
              multiple
              onChange={(e) => handleMultipleImageUpload(e.target.files)}
            />
          </div>
          <div className="mt-4 space-y-4">
            {uploadedImagesSlide.map((url, index) => (
              <div key={index} className="relative">
                <Image
                  src={url}
                  alt={`Imagem ${index}`}
                  width={200}
                  height={200}
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </main>
  )
}