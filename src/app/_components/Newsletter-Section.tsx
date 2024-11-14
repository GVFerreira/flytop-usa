'use client'

import { createNewsletter } from "../actions"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"


export default function NewsletterSection() {
  const [showNewsletter, setShowNewsletter] = useState<boolean>(false)

  useEffect(() => {
    // Se não estiver definido, configura "allowedToShow" como true
    if (localStorage.getItem('allowedToShow') === null) {
      localStorage.setItem('allowedToShow', "true")
    }

    const allowedToShow = localStorage.getItem('allowedToShow')
    if (allowedToShow === "true") {
      const timer = setTimeout(() => {
        setShowNewsletter(true)
      }, 15 * 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const form = useForm()

  const formSubmit = form.handleSubmit(async (data) => {
    try {
      await createNewsletter(data)
      setShowNewsletter(false)
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

  const handleDontShow = () => {
    setShowNewsletter(false)
    localStorage.setItem('allowedToShow', "false")
  }

  return (
    <Dialog open={showNewsletter} onOpenChange={() => setShowNewsletter(false)}>
      <DialogContent className="w-11/12 rounded-lg md:w-full">
        <DialogHeader>
          <DialogTitle>Don’t miss out on premium offers</DialogTitle>
          <DialogDescription>Unlock exclusive deals and insider tips for business class flights by joining our elite community. Stay ahead of the curve and elevate your travel experience with unparalleled comfort and style.</DialogDescription>
        </DialogHeader>
        <div className="bg-white p-6 rounded-lg shadow-md md:w-full">
          <form onSubmit={formSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow"
              required
              {...form.register('email')}
            />
            <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
              { form.formState.isSubmitting ? "Subscribing" : "Subscribe"}
            </Button>
          </form>
        </div>
          <Button variant="outline" onClick={handleDontShow} className="w-1/2 mx-auto capitalize">Don’t show me again</Button>
      </DialogContent>
    </Dialog>
  )
}