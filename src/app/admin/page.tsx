import { NewsletterTable } from "./_components/newsletter-table"
import { getClient, getNewsletter } from "../actions"
import { ClientTable } from "./_components/client-table"

export default async function Admin() {
  const newsletter = await getNewsletter()
  const client = await getClient()

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col items-start">
        <h1 className="font-semibold text-lg md:text-2xl">Painel administrativo - Flytop</h1>
        <p className="text-md md:text-lg">Informações sensíveis</p>
      </div>
      <div className="w-full">
        <h3 className="font-semibold text-sm mb-2 md:text-md">Clientes</h3>
        <ClientTable data={client}/>
      </div>
    </main>
  )
}