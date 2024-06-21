import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

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
        email: { label: "Email", type: "email", placeholder: "eu@flytop.com"  },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const usermail = credentials.email as string
          const userpassword = credentials.password as string

          const user = await prisma.user.findUnique({
            where: {
              email: usermail
            }
          })

          console.log(user)
          
          // If no error and we have user data, return it
          if (user) return user
  
          // Return null if user data could not be retrieved
          return null

        } catch (e) {
          console.log(e)
          return null
        }
      }
    })
  ],
  events: {

  }
})
