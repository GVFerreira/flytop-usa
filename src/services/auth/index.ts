import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../database'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  trustHost: true,
  pages: {
    signIn: '/auth',
    signOut: '/auth',
    error: '/auth',
    verifyRequest: '/auth'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "me@flytop.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const usermail = credentials?.email as string
          const userpassword = credentials?.password as string

          // Buscar o usuário pelo e-mail
          const user = await prisma.user.findUnique({
            where: { email: usermail }
          })

          if (!user) {
            // Se o usuário não for encontrado, retornar null
            return null
          }

          // Comparar a senha fornecida com a senha hashada no banco de dados
          const isPasswordValid = await bcrypt.compareSync(userpassword, user.password)

          if (!isPasswordValid) {
            // Se a senha não corresponder, retornar null
            return null
          }

          // Se a senha estiver correta, retornar os dados do usuário
          return user
        } catch (e) {
          console.error(e)
          return null
        }
      }
    })
  ],
  events: {
    // Eventos do NextAuth (opcional)
  }
})
