'use client'

import { createDestinations, getCategories, getCompanies } from "../../action"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'

import { useForm, SubmitHandler, Controller } from "react-hook-form"
import QuillEditor from '../_components/QuillEditor'
import { useState, useEffect } from "react"
import Select from "react-select"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"

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

  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [slideImagesSrc, setSlideImagesSrc] = useState<string[]>([])

  const [isCADol, setIsCADol] = useState(false)
  const [showAirportStopover, setShowAirportStopover] = useState(false)

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

  const handleCheckboxChange = () => setShowAirportStopover(!showAirportStopover)

  const handleOneFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSlideImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImagesSrc: string[] = []
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newImagesSrc.push(reader.result as string)
          if (newImagesSrc.length === files.length) {
            setSlideImagesSrc(newImagesSrc)
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if(imageSrc && slideImagesSrc.length > 0) {
      const blob = await (await fetch(imageSrc)).blob()
      const formData = new FormData()
      formData.append('file', blob, `${uuidv4()}.png`)
  
      // Primeiro, faça o upload da imagem
      const uploadResponse = await fetch('/api/upload-photo', {
        method: 'POST',
        body: formData
      })
  
      const uploadData = await uploadResponse.json()

      if (uploadResponse.ok && uploadData.imagePath) {
        if(slideImagesSrc) {
          // Upload das imagens do slide
          const slideImagePaths: string[] = []
          for (const file of slideImagesSrc) {
            const slideImageBlob = await (await fetch(file)).blob()
            const slideFormData = new FormData()
            slideFormData.append('file', slideImageBlob, `${uuidv4()}.png`)

            const slideUploadResponse = await fetch('/api/upload-photo', {
              method: 'POST',
              body: slideFormData
            })

            const slideUploadData = await slideUploadResponse.json()
            if (slideUploadResponse.ok && slideUploadData.imagePath) {
              slideImagePaths.push(slideUploadData.imagePath)
            }
          }
            try {
              await createDestinations({
                ...data,
                image_path: uploadData.imagePath,
                images_slide: JSON.stringify(slideImagePaths),
                is_ca_dol: isCADol
              })
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
      }
    }
  }

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }))

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
                <option>Selecione</option>
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
              onChange={handleOneFileChange}
              required
            />
            {imageSrc && (
              <Image
                src={imageSrc}
                alt="Imagem principal"
                width={300}
                height={300}
                className="object-cover aspect-square w-1/2 mt-4 rounded-md"
              />
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
              onChange={handleSlideImagesChange}
              required
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {slideImagesSrc && slideImagesSrc.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Imagem ${index}`}
                width={300}
                height={300}
                className="object-cover rounded-md aspect-square w-full"
              />
            ))}
          </div>
        </div>
      </form>
    </main>
  )
}