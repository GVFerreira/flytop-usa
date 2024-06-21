import Image from "next/image"
import Footer from "../_components/Footer"
import Header from "../_components/Header"

export default async function About() {
  return (
    <>
      <Header />
      <main style={{flex: "1 1 0"}}>
        <section className="md:mx-auto md:container md:grid md:grid-cols-2 md:space-x-8 py-16 bg-white">
          <div className="mb-10">
            <h1 className="text-5xl text-sky-950 text-center font-bold leading-[4rem] mb-6">
              Travel agency specializing<br/>
              in <span className="text-primary uppercase">business class</span>.
            </h1>
            <p className="text-center max-w-[500px] mx-auto mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi necessitatibus hic, vitae voluptatem quaerat exercitationem.</p>
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
              <h2 className="text-4xl text-sky-950 font-bold mb-6">What&apos;s  important to our company <span className="text-primary">?</span></h2>
              <p className="md:max-w-[50%] mr-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, ut autem aspernatur enim sit repellat cumque quibusdam soluta vero consequatur!</p>
            </div>
            <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
              <div>
                <Image src="" alt="" />
                <h3 className="text-2xl font-bold mb-2">Value one</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia magni ducimus laboriosam in ullam temporibus aperiam? Sunt blanditiis nam est enim quas dolorum iste, deleniti, fugiat necessitatibus, hic et eum.</p>
              </div>
              <div>
                <Image src="" alt="" />
                <h3 className="text-2xl font-bold mb-2">Value two</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia magni ducimus laboriosam in ullam temporibus aperiam? Sunt blanditiis nam est enim quas dolorum iste, deleniti, fugiat necessitatibus, hic et eum.</p>
              </div>
              <div>
                <Image src="" alt="" />
                <h3 className="text-2xl font-bold mb-2">Value three</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia magni ducimus laboriosam in ullam temporibus aperiam? Sunt blanditiis nam est enim quas dolorum iste, deleniti, fugiat necessitatibus, hic et eum.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-10 bg-[#FFFEEE]">
          <div className="container mb-10">
            <div className="mb-20">
              <h2 className="text-4xl text-sky-950 font-bold mb-6">Our team<span className="text-primary">.</span></h2>
              <p className="md:max-w-[50%] mr-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, ut autem aspernatur enim sit repellat cumque quibusdam soluta vero consequatur!</p>
            </div>
            <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
              <div className="text-center">
                <Image className="rounded-xl border-2 border-slate-950 shadow-lg mb-4" src="/team/vinicius.png" alt="" width={500} height={500} />
                <h3 className="text-2xl font-bold mb-2">Vinicius Stiborski</h3>
                <p className="font-bold mb-2">Founder</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia magni ducimus laboriosam in ullam temporibus aperiam? Sunt blanditiis nam est enim quas dolorum iste, deleniti, fugiat necessitatibus, hic et eum.</p>
              </div>
              <div className="text-center">
                <Image className="rounded-xl border-2 border-slate-950 shadow-lg mb-4" src="/team/bruno.jpg" alt="" width={500} height={500} />
                <h3 className="text-2xl font-bold mb-2">Bruno Stiborski</h3>
                <p className="font-bold mb-2">Founder</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia magni ducimus laboriosam in ullam temporibus aperiam? Sunt blanditiis nam est enim quas dolorum iste, deleniti, fugiat necessitatibus, hic et eum.</p>
              </div>
              <div className="text-center">
                <Image className="rounded-xl border-2 border-slate-950 shadow-lg mb-4" src="/team/rafael.jpg" alt="" width={500} height={500} />
                <h3 className="text-2xl font-bold mb-2">Rafael Balbinot</h3>
                <p className="font-bold mb-2">Founder</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia magni ducimus laboriosam in ullam temporibus aperiam? Sunt blanditiis nam est enim quas dolorum iste, deleniti, fugiat necessitatibus, hic et eum.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}