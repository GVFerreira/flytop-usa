import { Button } from "@/components/ui/button"
import Link from "next/link"
import Companies from "./_components/companies"

export default function Destino() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Companhias Aéreas</h1>
        <Button className="ml-auto" size="sm">
          <Link href="/admin/companhia/add">
            Adicionar companhia
          </Link>
        </Button>
      </div>
      <div className="border shadow-sm rounded-lg">
        <Companies />
      </div>
    </main>
  )
}