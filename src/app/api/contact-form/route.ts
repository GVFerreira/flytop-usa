import { NextResponse, NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import transporter from '@/lib/nodemailer'

interface CustomMailOptions extends nodemailer.SendMailOptions {
  template?: string
  context?: { [key: string]: any }
}

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  const mailOptions: CustomMailOptions = {
    from: 'FlyTop Travels <contact@flytoptravels.com>',
    to: "contact@flytoptravels.com",
    subject: `FLYTOP TRAVELS - Contact form`,
    template: "contact",
    context: {
      name,
      email,
      message
    }
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log({
      to: email,
      message: `Email sent successfully! Template: LEAD`,
      date: new Date().toLocaleString()
    })
  } catch (error) {
    console.log(error)
    console.log({
      to: email,
      message: `Error sending email! Template: LEAD`,
      date: new Date().toLocaleString()
    })
  }

  return NextResponse.json({ status: 201 })
}
