import Image from "next/image"
import Footer from "../_components/Footer"
import Header from "../_components/Header"

import NewsletterSection from "../_components/Newsletter-Section"
import { Globe } from "lucide-react"

export default async function About() {
  return (
    <>
      <Header />
      <NewsletterSection />
      <main style={{flex: "1 1 0"}}>
        <section className="md:mx-auto md:container md:grid md:grid-cols-2 md:space-x-8 py-16 bg-white">
          <div className="mb-10">
            <h1 className="text-5xl text-sky-950 text-center font-bold leading-[4rem] mb-6">
              Travel agency specialized<br/>
              in <span className="text-primary uppercase">business class</span>.
            </h1>
          </div>
          <Image
          className="w-full md:mx-auto md:rounded-xl md:border-2 border-y-2 border-slate-900"
            src="/business-class.jpg"
            alt="Airplane photo"
            width={390}
            height={350}
          />
        </section>
        <section className="py-10 bg-sky-50">
          <div className="container mb-10">
            <div className="mb-20">
              <h2 className="text-4xl text-sky-950 font-bold mb-6">What&apos;s  important to our company<span className="text-primary">?</span></h2>
              <p className="md:max-w-[50%] mr-auto">At our travel agency, we prioritize offering premium travel experiences at the most competitive prices. We specialize in finding the best deals on business and premium class flights, ensuring that our clients enjoy both comfort and affordability on their journeys, whether domestic or international. Our team is committed to delivering personalized service, understanding each traveler’s unique needs, and providing exceptional value for every trip.</p>
            </div>
            <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
              <div>
                <h3 className="text-2xl font-bold mb-2">Customer-Centric Service</h3>
                <p>We are dedicated to putting our clients first, understanding their needs, and delivering tailored travel solutions.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Affordability with Excellence</h3>
                <p>We strive to offer premium services at the best prices without compromising on the quality of the travel experience.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Global Expertise</h3>
                <p>With a wealth of experience in both domestic and international travel, we ensure seamless journeys to any destination across the globe.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-10 bg-[#FFFEEE]">
          <div className="container mb-10">
            <div className="mb-20">
              <h2 className="text-4xl text-sky-950 font-bold mb-6">Our team<span className="text-primary">.</span></h2>
              <div className="flex flex-col-reverse md:flex-row md gap-10 md:gap-20">
                <p className="text-lg mr-auto">Our team is made up of seasoned travel professionals with extensive experience in the premium and business class airline industry. With firsthand knowledge of top airlines, routes, and global destinations, our experts are equipped to find the best travel deals for our clients. We bring a deep understanding of the complexities of air travel, ensuring seamless coordination and attention to detail. Our team’s passion for travel, combined with their expertise, makes us the ideal partner for securing affordable and luxurious flight experiences.</p>
                <Image className="rounded-xl border-2 border-slate-950 shadow-lg w-full" src="/team/team-flytop.webp" alt="Team FlyTop" width={500} height={500} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
              <div className="text-center">
                <Image className="rounded-xl border-2 border-slate-950 shadow-lg mb-4" src="/team/vinicius.png" alt="VINÍCIUS STIBORSKI" width={500} height={500} />
                <h3 className="text-2xl font-bold mb-2">VINÍCIUS STIBORSKI</h3>
                <p className="font-bold mb-2">Founder</p>
                <p>I am passionate about traveling. In the past 10 years, I have visited 53 countries and taken over 100 business class flights. I created FlyTop to help more people travel in comfort and at incredible prices!</p>
              </div>
              <div className="text-center">
                <Image className="rounded-xl border-2 border-slate-950 shadow-lg mb-4" src="/team/bruno.jpg" alt="BRUNO STIBORSKI" width={500} height={500} />
                <h3 className="text-2xl font-bold mb-2">BRUNO STIBORSKI</h3>
                <p className="font-bold mb-2">Founder</p>
                <p>I transformed my experience of traveling to 60 different countries, with more than 90 business class flights, into what is now FlyTop. I want the FlyTop community to have access to the best flights in the world at the best prices.</p>
              </div>
              <div className="text-center">
                <Image className="rounded-xl border-2 border-slate-950 shadow-lg mb-4" src="/team/rafael.jpg" alt="RAFAEL BALBINOT" width={500} height={500} />
                <h3 className="text-2xl font-bold mb-2">RAFAEL BALBINOT</h3>
                <p className="font-bold mb-2">Founder</p>
                <p>I have extensive experience leading major companies, and through FlyTop, I am helping to build the largest company selling premium cabin tickets in the United States and Canada.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}