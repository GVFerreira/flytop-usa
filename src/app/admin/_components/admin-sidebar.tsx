
import Link from 'next/link'
import Image from "next/image"

import { Home, PlaneLanding, Send, Tag, User, MessageCircleHeart } from 'lucide-react'

export async function AdminSidebar() {

  return (
    <div className="border-r bg-gray-100/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/admin">
            <Image
              src="/flytop-header.svg"
              alt="Fly Top"
              width={100}
              height={50}
              className="w-1/2"
            />
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg text-gray-500 px-3 py-2  transition-all hover:text-gray-900"
              href="/admin"
            >
              <Home className="size-4" />
              Início
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg text-gray-500 px-3 py-2  transition-all hover:text-gray-900"
              href="/admin/destino"
            >
              <PlaneLanding className="size-4" />
              Destinos
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg text-gray-500 px-3 py-2  transition-all hover:text-gray-900"
              href="/admin/companhia"
            >
              <Send className="size-4" />
              Companhias aéreas
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg text-gray-500 px-3 py-2  transition-all hover:text-gray-900"
              href="/admin/categoria"
            >
              <Tag className="size-4" />
              Categorias
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg text-gray-500 px-3 py-2  transition-all hover:text-gray-900"
              href="/admin/feedback"
            >
              <MessageCircleHeart className="size-4" />
              Feedbacks
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg text-gray-500 px-3 py-2  transition-all hover:text-gray-900"
              href="/admin/usuario"
            >
              <User className="size-4" />
              Usuários
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}