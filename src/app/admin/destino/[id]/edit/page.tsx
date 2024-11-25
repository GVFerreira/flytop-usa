'use client'

import Image from 'next/image'
import { useRouter } from "next/navigation"
import { submitFormAction, getUniqueDestination, updateDestination } from "./action"
import { getCategories, getCompanies } from "../../../action"

import { useState, useEffect } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import QuillEditor from '../../_components/QuillEditor'
import Select from "react-select"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Switch } from '@/components/ui/switch'

interface Category {
  id: string
  name: string
  slug: string
}

interface Company {
  id: string
  name: string
}

interface FormData {
  name: string
  subtitle: string
  price: number
  regularPrice: number
  isCADol: boolean
  departureDates: string
  returnDates: string
  flightCompanyId: string
  departureCity: string
  departureAirport: string
  destinationAirport: string
  categories: string[]
  imagePath: string
  imagesSlide: string[]
  flightStopover: boolean
  stopoverAirport?: string
}

interface Option {
  value: string
  label: string
}

export default function EditDestination({ params }: { params: { id: string } }) {
  const [initialData, setInitialData] = useState<FormData | undefined>(undefined)

  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<{ value: string; label: string }[]>([])
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([])

  const [companies, setCompanies] = useState<Company[]>([])

  const [defaultSelectedOptions, setDefaultSelectedOptions] = useState<Option[]>([])

  const [isCADol, setIsCADol] = useState(false)
  const [showAirportStopover, setShowAirportStopover] = useState(false)

  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>()
  const [uploadedImagesSlide, setUploadedImagesSlide] = useState<string[]>()

  const router = useRouter()
  const { register, handleSubmit, setValue, reset, formState, control } = useForm<FormData>()

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const destinationData = await getUniqueDestination(params.id)
        if (destinationData) {
          setInitialData(destinationData)
        }
        
        const [categoriesData, companiesData] = await Promise.all([
          getCategories(),
          getCompanies()
        ])

        setCategories(categoriesData)
        setCompanies(companiesData)
        
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [params.id]) 

  // Update form with initial data
  useEffect(() => {
    if (initialData) {
      setValue('flightCompanyId', initialData.flightCompanyId)
      setValue('categories', initialData.categories)
      setShowAirportStopover(initialData.flightStopover)
      setIsCADol(initialData.isCADol)
      setUploadedImagePath(initialData.imagePath)
      setUploadedImagesSlide(initialData.imagesSlide)
      reset(initialData)
    }
  }, [initialData, reset, setValue])

  // Set categories
  useEffect(() => {
    const options = categories.map(category => ({
      value: category.id,
      label: category.name
    }))
  
    setCategoryOptions(options)
  }, [categories])

  useEffect(() => {
    if (categoryOptions.length > 0 && initialData?.categories) {
      const preSelected = categoryOptions.filter(option =>
        initialData.categories.includes(option.value)
      )
      setDefaultSelectedOptions(preSelected)
    }
  }, [categoryOptions, initialData?.categories])
  
  const handleCategoryChange = (selectedOptions: any) => {
    setSelectedCategories(selectedOptions || [])
    setDefaultSelectedOptions(selectedOptions)
    setValue('categories', selectedOptions ? selectedOptions.map((option: any) => option.value) : [])
  }

  const handleCheckboxChange = () => setShowAirportStopover(!showAirportStopover)

  const handleSingleImageUpload = async (file: File | null) => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      const { url } = await submitFormAction(null, formData)
      setValue('imagePath', url)
      setUploadedImagePath(url)
    }
  }

  const handleMultipleImageUpload = async (files: FileList | null) => {
    if (files) {
      // Obter URLs das imagens carregadas
      const uploadedUrls = await Promise.all(
        Array.from(files).map(async (file) => {
          const formData = new FormData()
          formData.append('file', file)
          const { url } = await submitFormAction(null, formData)
          return url
        })
      )
  
      // Atualize o estado com o array de URLs
      setUploadedImagesSlide(uploadedUrls)
      setValue('imagesSlide', uploadedUrls)
    }
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await updateDestination({
        ...data,
        isCADol
      }, params.id)
      toast({
        title: 'Sucesso',
        description: 'Destino atualizado com sucesso'
      })
      router.push("/admin/destino")
    } catch (e) {
      console.error(e)
      toast({
        title: 'Erro',
        description: 'Um erro ocorreu ao atualizar o destino'
      })
    } finally {
      router.refresh()
    }
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Editar destino</h1>
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
                {...register('name')}
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
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="regularPrice">Valor convencional</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="regularPrice"
                  type="number"
                  required
                  {...register('regularPrice')}
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="regular_price">Valor em dólar canadense?</label>
              <Switch
                checked={isCADol}
                onCheckedChange={() => setIsCADol(!isCADol)}
              />
              {isCADol && <p>Sim, o valor é em dólar canadense</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="departureDates">Datas de ida</label>
                <Controller
                  name="departureDates"
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
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="returnDates">Datas de volta</label>
                <Controller
                  name="returnDates"
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
                {...register('flightCompanyId')}
              >
                {companies.map(company => (
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
              </select>
              <span className="text-sm text-zinc-500">Cadastre previamente a companhia aérea.</span>
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="departureCity">Cidade de origem</label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="departureCity"
                type="text"
                required
                {...register('departureCity')}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="departureAirport">Aeroporto de saída</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="departureAirport"
                  type="text"
                  maxLength={3}
                  placeholder="Exemplo: GRU"
                  required
                  {...register('departureAirport')}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="destinationAirport">Aeroporto de destino</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="destinationAirport"
                  type="text"
                  maxLength={3}
                  placeholder="Exemplo: GIG"
                  required
                  {...register('destinationAirport')}
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300">Categorias</label>
              <Select
                id="categories"
                placeholder="Selecione"
                options={categoryOptions}
                value={defaultSelectedOptions}
                onChange={handleCategoryChange}
                isMulti
                required
              />
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="flightStopover"
                {...register("flightStopover")}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="flightStopover">Haverá escala?</label>
            </div>
            {showAirportStopover && (
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="stopoverAirport">Aeroporto da escala</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="stopoverAirport"
                  type="text"
                  maxLength={3}
                  placeholder="Exemplo: MIA"
                  {...register('stopoverAirport')}
                />
              </div>
            )}
          </div>
          <div>
            <div className="space-y-4 mt-4">
              <div>
                <Button type="submit" disabled={formState.isSubmitting}>
                  {formState.isSubmitting ? "Salvando alterações..." : "Atualizar"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {/* Upload de uma única imagem */}
          <div>
            <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="single_image">Imagem principal</label>
            <input
              className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="single_image"
              type="file"
              onChange={(e) => handleSingleImageUpload(e.target.files?.[0] || null)}
            />
            {uploadedImagePath ? (
              <Image
                src={uploadedImagePath}
                alt="Imagem principal"
                width={300}
                height={300}
                className="object-cover aspect-square w-1/2 mt-4 rounded-md"
              />)
              :
              (
                <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                  <span>Carregando...</span>
                </div>
              )
            }
            
          </div>
          {/* Upload de múltiplas imagens */}
          <div>
            <label className="block mb-1 font-mediumtext-gray-300" htmlFor="imagesSlide">Imagens para o carrossel</label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="imagesSlide"
              type="file"
              multiple
              onChange={(e) => handleMultipleImageUpload(e.target.files)}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
          {uploadedImagesSlide && uploadedImagesSlide.length > 0 ? (
            uploadedImagesSlide.map((imageUrl, index) => (
                <Image
                  key={index}
                  src={imageUrl}
                  alt={`Imagem do carrossel ${index + 1}`}
                  width={300}
                  height={300}
                  className="object-cover rounded-md aspect-square w-full"
                />
              ))
            ) : (
              <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                <span>Carregando...</span>
              </div>
            )
          }
          </div>
        </div>
      </form>
    </main>
  )
}