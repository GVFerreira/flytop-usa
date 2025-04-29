"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Regex para validar telefone US
const usPhoneRegex = /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  telephone: z.string().regex(usPhoneRegex, {
    message: "Please enter a valid US phone number.",
  }),
  email: z.string().email({
    message: 'Please enter a valid email'
  })
})

export default function BuyNowDrawer() {
  const [open, setOpen] = useState(false)

  const URL = usePathname().split("/")
  const slug = URL[1]

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      telephone: "",
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const request = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({...data, destinationSlug: slug})
      })

      const status = request.status
      const message = `Hello, my name is ${data.name}. I am interested in an offer`

      if(status === 201) {
        toast(`✅ Thank you ${data.name}!`, {
          description: (
            <>
              <p>Your information has been received. Our team will be in touch with you shortly.</p>
              <br />
              <Button variant="link" className="underline hover:no-underline mx-auto">
                <a href={`sms:+14165264491?body=${message}`}>Send us a message directly</a>
              </Button>
            </>
          ),
          duration: 12 * 1000
        })

        setOpen(false)
      } else {
        toast(`❌ An error occurred`, {
          description: "Sorry! Try again later.",
        })
      }

      form.reset()
    } catch (e) {
      console.error(e)
      toast(`❌ An error occurred`, {
        description: "Sorry! Try again later.",
      })
    }
  }

  // Função para formatar automaticamente
  function formatPhoneNumber(value: string) {
    const onlyNums = value.replace(/\D/g, "")
    if (onlyNums.length <= 3) return onlyNums
    if (onlyNums.length <= 6) return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3)}`
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="cta" className="buy-button w-1/2 mt-6">
          BUY NOW
        </Button>
      </DialogTrigger>
      <DialogContent className="container max-w-2xl py-4">
        <DialogHeader>
          <DialogTitle>Please provide your information</DialogTitle>
          <DialogDescription>
            To proceed with your purchase, kindly provide your full name and phone number. Our team will contact you
            shortly to complete the booking process.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        inputMode="numeric"
                        placeholder="(123) 456-7890"
                        value={field.value}
                        onChange={(e) => {
                          const formatted = formatPhoneNumber(e.target.value)
                          field.onChange(formatted)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="john@doe.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="cta" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
