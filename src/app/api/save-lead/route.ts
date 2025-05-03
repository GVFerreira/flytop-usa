import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/services/database'
import nodemailer from 'nodemailer'
import transporter from '@/lib/nodemailer'

interface CustomMailOptions extends nodemailer.SendMailOptions {
  template?: string
  context?: { [key: string]: any }
}

export async function POST(req: NextRequest) {
  const { name, telephone, email, destinationSlug } = await req.json()

  if (!destinationSlug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }

  const destination = await prisma.destination.findUnique({
    where: { slug: destinationSlug },
    select: {
      id: true,
      name: true,
      departureCity: true
    }
  })

  if(!destination) {
    return NextResponse.json({ error: 'Destination not found' }, { status: 404 })
  }

  const lead = await prisma.leads.create({
    data: {
      name,
      telephone,
      email,
      interestedDestination: destination.id
    }
  })

  const mailOptions: CustomMailOptions = {
    from: 'FlyTop Travels <contact@flytoptravels.com>',
    to: email,
    bcc: "contact@flytoptravels.com",
    subject: `FLYTOP TRAVELS - Flight from ${destination.departureCity.toUpperCase()} to ${destination.name.toUpperCase()}`,
    template: "lead",
    context: {
      name,
      telephone,
      email
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

  return NextResponse.json({lead, destination}, { status: 201 })
}
