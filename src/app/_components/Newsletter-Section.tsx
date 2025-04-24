'use client'

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { createNewsletter } from "../actions"

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

// ✅ Schema de validação com zod
const newsletterSchema = z.object({
  email: z.string().email("Please, insert a valid email")
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export default function NewsletterSection() {
  const [showNewsletter, setShowNewsletter] = useState(false)

  useEffect(() => {
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema)
  })

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      await createNewsletter(data)
      setShowNewsletter(false)
      toast({
        title: 'Success',
        description: 'You have been subscribed to our newsletter'
      })
    } catch (e) {
      console.error(e)
      toast({
        title: 'Error',
        description: 'An error occurred while subscribing to our newsletter'
      })
    }
  }

  const handleDontShow = () => {
    setShowNewsletter(false)
    localStorage.setItem('allowedToShow', "false")
  }

  return (
    <Dialog open={showNewsletter} onOpenChange={() => setShowNewsletter(false)}>
      <DialogContent className="w-11/12 rounded-lg md:w-full">
        <DialogHeader>
          <DialogTitle>Don’t miss out on premium offers</DialogTitle>
          <DialogDescription>
            Unlock exclusive deals and insider tips for business class flights by joining our elite community. Stay ahead of the curve and elevate your travel experience with unparalleled comfort and style.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-white p-6 rounded-lg shadow-md md:w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing" : "Subscribe"}
            </Button>
          </form>
        </div>
        <Button
          variant="outline"
          onClick={handleDontShow}
          className="w-1/2 mx-auto capitalize"
        >
          Don’t show me again
        </Button>
      </DialogContent>
    </Dialog>
  )
}
