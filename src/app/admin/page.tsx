import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from "@/components/ui/table"
import Image from "next/image"

export default function Admin() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Painel administrativo - Flytop</h1>
      </div>
      <h2 className="font-semibold text-md md:text-lg">Acompanhe seus acessos</h2>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Inventory</TableHead>
              <TableHead>Vendor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src="/toronto-sunrise.jpg"
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">Glimmer Lamps</TableCell>
              <TableCell className="hidden md:table-cell">In Production</TableCell>
              <TableCell>500 in stock</TableCell>
              <TableCell className="hidden md:table-cell">Luminance Creations</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src="/toronto-sunrise.jpg"
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">Aqua Filters</TableCell>
              <TableCell className="hidden md:table-cell">Available for Order</TableCell>
              <TableCell>750 in stock</TableCell>
              <TableCell className="hidden md:table-cell">HydraClean Solutions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src="/toronto-sunrise.jpg"
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">Eco Planters</TableCell>
              <TableCell className="hidden md:table-cell">Backordered</TableCell>
              <TableCell>300 in stock</TableCell>
              <TableCell className="hidden md:table-cell">GreenGrowth Designers</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src="/toronto-sunrise.jpg"
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">Zest Juicers</TableCell>
              <TableCell className="hidden md:table-cell">Newly Launched</TableCell>
              <TableCell>1000 in stock</TableCell>
              <TableCell className="hidden md:table-cell">FreshTech Appliances</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src="/toronto-sunrise.jpg"
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">Flexi Wearables</TableCell>
              <TableCell className="hidden md:table-cell">Selling Fast</TableCell>
              <TableCell>200 in stock</TableCell>
              <TableCell className="hidden md:table-cell">Vitality Gear Co.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  )
}