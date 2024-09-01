import { NewsletterTable } from "./_components/newsletter-table"
import { getNewsletter } from "../actions"

export default async function Admin() {
  const newsletter = await getNewsletter()

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col items-start">
        <h1 className="font-semibold text-lg md:text-2xl">Painel administrativo - Flytop</h1>
        <p className="text-md md:text-lg">Informações sensíveis</p>
      </div>
      <div className="grid grid-cols-2 gap-12">
        <div>
          <h3 className="font-semibold text-sm mb-2 md:text-md">Newsletter</h3>
          <NewsletterTable data={newsletter}/>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-2 md:text-md">Clientes</h3>
          <NewsletterTable data={newsletter}/>
        </div>
      </div>
    </main>
  )
}