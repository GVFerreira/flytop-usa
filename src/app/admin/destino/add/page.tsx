'use client'

import Image from 'next/image'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useFormState } from "react-dom"
import Select from "react-select"

import { submitFormAction } from "./actions"
import { createDestinations, getCategories, getCompanies } from "../../action"

export default function AddDestination() {
  interface Category {
    id: string;
    name: string;
    slug: string;
  }

  interface Company {
    id: string;
    name: string;
  }

  const [categories, setCategories] = useState<Category[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: Category[] = await getCategories()
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
        const data: Company[] = await getCompanies()
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

  const [showAirportStopover, setShowAirportStopover] = useState(false)
  const handleCheckboxChange = () => {
    setShowAirportStopover(!showAirportStopover)
  }

  const router = useRouter()
  const form = useForm()
  const { setValue } = form

  const formSubmit = form.handleSubmit(async (data) => {
    const formattedData = {
      ...data,
      categories: data.categories.map((category: { value: string }) => category.value)
    }

    try {
      await createDestinations(formattedData)
      toast({
        title: 'Sucesso',
        description: 'Destino criado com sucesso'
      })
    } catch (e) {
      console.log(e)
      toast({
        title: 'Erro',
        description: 'Um erro ocorreu ao criar o destino'
      })
    } finally {
      router.push("/admin/destino")
      router.refresh()
    }
  })

  const initialState = {
    url: '',
  }
  const [state, formAction] = useFormState(submitFormAction, initialState)

  useEffect(() => {
    setValue('image_path', state.url)
  }, [state.url, setValue])

  const categoryOptions = categories.map((category: Category) => ({
    value: category.id,
    label: category.name
  }))

  if (!isClient) {
    return null
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Criar destino</h1>
      </div>
      <div className="grid grid-cols-2 space-x-4">
        <form onSubmit={formSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="destination_name">Destino</label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="destination_name"
                type="text"
                required
                {...form.register('destination_name')}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="subtitle">Subtítulo de oferta</label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="subtitle"
                type="text"
                required
                {...form.register('subtitle')}
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
                  {...form.register('price')}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="regular_price">Valor convencional</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="regular_price"
                  type="number"
                  required
                  {...form.register('regular_price')}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="departure_date">Datas de ida</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="departure_date"
                  required
                  {...form.register('departure_date')}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="return_date">Datas de volta</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="return_date"
                  required
                  {...form.register('return_date')}
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="flight_company">Companhia aérea</label>
              <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="flight_company"
                required
                {...form.register('flight_company')}
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
                {...form.register('departure_city')}
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
                  {...form.register('departure_airport')}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="destination_airport">Aeroporto de destino</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="destination_airport"
                  type="text"
                  maxLength={3}
                  placeholder="Exemplo: VCP"
                  required
                  {...form.register('destination_airport')}
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="category">Categoria</label>
              <Select
                options={categoryOptions}
                isMulti
                isSearchable
                name="category"
                onChange={(selectedOptions) => setValue('categories', selectedOptions)}
              />
              <span className="text-sm text-zinc-500">Cadastre previamente a categoria.</span>
            </div>
            <div className="mt-0">
              <input
                className="w-full h-0"
                id="image_path"
                type="text"
                required
                {...form.register('image_path')}
              />
            </div>
            <div className="flex items-center">
              <input
                className="mr-2 rounded focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600"
                id="flight_stopover"
                value="true"
                type="checkbox"
                {...form.register('flight_stopover', { required: false })}
                onChange={handleCheckboxChange}
              />
              <label className="font-medium dark:text-gray-300" htmlFor="flight_stopover">Voo com conexão?</label>
            </div>
            {showAirportStopover && (
              <div>
                <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="stopover_airport">Aeroporto de conexão</label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="stopover_airport"
                  type="text"
                  required
                  {...form.register('stopover_airport')}
                />
              </div>
            )}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Salvando...' : 'Salvar destino'}
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
