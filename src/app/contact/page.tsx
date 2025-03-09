import { Inbox, MapPinned } from "lucide-react"
import ContactForm from "./_components/ContactForm"
import Header from "../_components/Header"
import Footer from "../_components/Footer"

import NewsletterSection from "../_components/Newsletter-Section"

export const metadata = {
  title: "FlyTop - Contact"
}

export default function Contact() {
  return (
    <>
      <Header />
      <NewsletterSection />
      <main>
        <section style={{backgroundImage: "url(/contact-thumbnail.webp)"}} className="bg-cover bg-center bg-no-repeat py-16 px-3 border-b-2 border-b-primary md:py-32 md:px-0">
          <div className="text-white text-center md:w-328 md:px-72 md:mx-auto">
            <h1 className="text-7xl font-bold sm:text-h1">Contact</h1>
          </div>
        </section>
        <section className="py-16 px-3 md:px-0 md:flex md:flex-col md:gap-20">
          <div className="container md:mx-auto md:grid md:grid-cols-2 md:gap-20">
            <div>
              <h2 className="text-4xl font-bold mb-4 md:text-5xl">Send us a message</h2>
              <p className="text-lg text-gray-600">Do you have any questions or would you like to suggest any improvements to our services? Fill out the form on this page and we will get back to you as soon as possible.</p>
              <div className="my-8 space-y-8">
                <div className="flex flex-row items-center gap-x-4">
                  <Inbox className="size-9" />
                  <div>
                    <p className="text-lg font-bold mb-0">E-mail:</p>
                    <p className="text-gray-600">contact@flytoptravels.com</p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-x-4">
                  <MapPinned className="size-9" />
                  <div>
                    <p className="text-lg font-bold mb-0">Location:</p>
                    <p className="text-gray-600">Miami, Florida / USA</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-10 bg-secondary/75 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 md:text-3xl">Contact form</h2>
                <ContactForm/>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
