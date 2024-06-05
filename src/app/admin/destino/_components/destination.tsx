'use server'

import { Button } from "@/components/ui/button"
import { UploadIcon } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { getUniqueDestination } from "../../action"


export default async function EditDestinationForm({ params }: { params: { id: string }}) {
  const [showAirportStopover, setShowAirportStopover] = useState(false)

  const handleCheckboxChange = () => {
    setShowAirportStopover(!showAirportStopover)
  }

  const form = useForm()
  const route = useRouter()


  const editSubmit = form.handleSubmit(async (data) => {
    try {
      // await createDestinations(data)
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
      route.push("/admin/destino")
    }
  })

  const destination = await getUniqueDestination(params.id)

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Editar destino</h1>
      </div>
      <form onSubmit={editSubmit} className="grid grid-cols-2 space-x-4">
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="destination_name">
              Destino
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="destination_name"
              type="text"
              value={destination?.name}
              required
              {...form.register('destination_name')}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="value">
              Valor
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="value"
              type="number"
              required
              {...form.register('value')}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="departure_date">
                Ida
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="departure_date"
                type="date"
                required
                {...form.register('departure_date')}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="return_date">
                Volta
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="return_date"
                type="date"
                required
                {...form.register('return_date')}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="flight_company">
              Companhia aérea
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="flight_company"
              type="text"
              required
              {...form.register('flight_company')}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="departure_airport">
                Aeroporto de saída
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="departure_airport"
                type="text"
                required
                {...form.register('departure_airport')}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="destination_airport">
                Aeroporto de destino
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="destination_airport"
                type="text"
                required
                {...form.register('destination_airport')}
              />
            </div>
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
            <label className="font-medium dark:text-gray-300" htmlFor="flight_stopover">
              Voo com conexão?
            </label>
          </div>
          {showAirportStopover && (
            <div>
            <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="stopover_airport">
              Aeroporto de conexão
            </label>
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
        <div>
          <label className="block mb-1 font-medium dark:text-gray-300" htmlFor="image">
            Upload Image
          </label>
          <div className="relative w-full">
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="image"
              type="file"
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <UploadIcon className="size-4" />
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}