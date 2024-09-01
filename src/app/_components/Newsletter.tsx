'use client'

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

import { createNewsletter } from "../actions"

export default function Newsletter() {
  const route = useRouter()
  const form = useForm()

  const formSubmit = form.handleSubmit(async (data) => {
    try {
      await createNewsletter(data)
      toast({
        title: 'Success',
        description: 'You have been subscribed to our newsletter'
      })
    } catch (e) {
      console.log(e)
      toast({
        title: 'Error',
        description: 'An error occurred while subscribing to our newsletter'
      })
    }
  })

  return (
    <form onSubmit={formSubmit} className="flex gap-2">
      <Input type="email" placeholder="Enter your email" className="flex-1" {...form.register('email')} />
      <Button type="submit">Subscribe</Button>
    </form>
  )
}