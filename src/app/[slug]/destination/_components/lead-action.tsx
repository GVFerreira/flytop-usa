"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"

// Regex para validar telefone US
const usPhoneRegex = /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  telephone: z.string().regex(usPhoneRegex, {
    message: "Please enter a valid US phone number.",
  })
})

export function LeadAction() {
  const URL = usePathname().split("/")
  const slug = URL[1]

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      telephone: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const request = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({...data, destinationSlug: slug})
      })

      const res = request.status
      const message = `Hello, my name is ${data.name}. I am interested in an offer`

      if(res === 201) {
        toast({
          title: `✅ Thank you ${data.name}!`,
          description: (
            <div>
              <p>Your information has been received. Our team will be in touch with you shortly.</p>
              <br />
              <Button variant="link" className="underline hover:no-underline">
                <a href={`sms:+14165264491?body=${message}`}>Click here to send us a message directly</a>
              </Button>
            </div>
          ),
          duration: 12 * 1000
        })
      } else {
        toast({
          title: `❌ An error occurred`,
          description: "Sorry! Try again later.",
          variant: "destructive"
        })
      }

      form.reset()
    } catch (e) {
      console.error(e)
      toast({
        title: `❌ An error occurred`,
        description: "Sorry! Try again later.",
        variant: "destructive"
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
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

        <Button type="submit" variant="cta" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting" : "Submit"}
        </Button>
      </form>
    </Form>
  )
}
