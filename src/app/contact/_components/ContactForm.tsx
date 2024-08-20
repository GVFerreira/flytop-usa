'use client'

import { User, Mail, Send } from "lucide-react"
import { useForm } from "react-hook-form"

import { sendMail } from "@/lib/mail"

import { toast } from '@/components/ui/use-toast'

export default function ContactForm() {
  const { register, handleSubmit, reset, formState } = useForm()

  const handleSendMail = handleSubmit(async ({name, email, message}) => {
    try {
      await sendMail({name, email, message})
      toast({
        title: 'Success',
        description: 'Your message has sent successfully'
      })
      reset()
    } catch (e) {
      console.error(e)
      toast({
        title: 'Error',
        description: "Your message hasn't sent. Try again later."
      })
      reset()
    }
  })
  
  return (
    <form onSubmit={handleSendMail}>
      <div className="relative my-4">
        <input
          type="text"
          id="name"
          className="py-3 px-4 ps-11 block w-full border border-gray-500 shadow-sm rounded-md text-sm text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="Name"
          {...register('name')}
          required
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
          <User className="flex-shrink-0 size-5 text-gray-500"/>
        </div>
      </div>

      <div className="relative my-4">
        <input
          type="email"
          id="email"
          className="py-3 px-4 ps-11 block w-full border border-gray-500 shadow-sm rounded-md text-sm text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="Your best e-mail"
          {...register('email')}
          required
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
          <Mail className="flex-shrink-0 size-5 text-gray-500"/>
        </div>
      </div>

      <textarea
        id="message"
        rows={5}
        className="py-3 px-4 block w-full border border-gray-500 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
        placeholder="Type your message..."
        {...register('message')}
        required
      />

      <div className="relative my-4">
        <input
          type="submit"
          value={formState.isSubmitting ? "Sending..." : "Send message"}
          className="bg-orange-500 cursor-pointer py-3 px-4 ps-11 block shadow-sm rounded-md text-sm text-white bg-hub-blue disabled:opacity-50 disabled:pointer-events-none"
          disabled={formState.isSubmitting}
        />
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
          <Send className="flex-shrink-0 size-5 text-white"/>
        </div>
      </div>
    </form>
  )
}