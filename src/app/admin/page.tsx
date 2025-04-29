import { NewsletterTable } from "./_components/newsletter-table"
import { getClient, getLeads, getNewsletter } from "../actions"
import { ClientTable } from "./_components/client-table"
import { LeadsTable } from "./_components/leads-table"

export default async function Admin() {
  const newsletter = await getNewsletter()
  const client = await getClient()
  const leads = await getLeads()

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col items-start">
        <h1 className="font-semibold text-lg md:text-2xl">Painel administrativo - Flytop</h1>
        <p className="text-md md:text-lg">Informações sensíveis</p>
      </div>
      <div className="grid grid-cols-1 gap-20">
        <div className="w-full">
          <h3 className="font-semibold text-sm mb-2 md:text-md">Leads</h3>
          <LeadsTable data={leads}/>
        </div>
        <div className="w-full">
          <h3 className="font-semibold text-sm mb-2 md:text-md">Newsletter</h3>
          <NewsletterTable data={newsletter}/>
        </div>
        <div className="w-full">
          <h3 className="font-semibold text-sm mb-2 md:text-md">Clientes</h3>
          <ClientTable data={client}/>
        </div>
      </div>
    </main>
  )
}