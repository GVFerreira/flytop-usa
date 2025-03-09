import Header from '../_components/Header'
import Footer from '../_components/Footer'

export const metadata = {
  title: "FlyTop - Terms of Service"
}

export default function TermsService() {
  return (
    <>
      <Header />
      <main className="container space-y-8 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-center mb-10">Terms of Service</h1>
          <p>Last Updated: November 13th, 2024</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">1. Agreement to Terms</h2>
          <p>These Terms of Service (“Terms”) govern your use of the website <a href="https://flytoptravels.com" className="underline">https://flytoptravels.com</a> (the “Site”) and the services provided by FlyTop Travels LLC. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please refrain from using our services.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">2. Our Services</h2>
          <p>FlyTop Travels LLC provides services related to the sale of airline tickets, primarily for business and premium cabin bookings. We facilitate the booking process and work with partners to secure competitive rates.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">3. User Responsibilities</h2>
          <p>By using our Site, you agree to:</p>
          <ul className="list-disc ml-6">
            <li>Provide accurate and current information.</li>
            <li>Use our Site and services for lawful purposes.</li>
            <li>Refrain from using our Site in a way that disrupts, overburdens, or damages our network or services.</li>
          </ul>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">4. Bookings and Payment</h2>
          <ul className="list-disc ml-6">
            <li><strong>Booking Confirmation:</strong> Upon successful booking, you will receive a confirmation email with ticket details. We cannot guarantee prices until payment is completed.</li>
            <li><strong>Cancellations and Refunds:</strong> Our cancellation and refund policy is subject to the specific terms of the airline ticket purchased. Refunds are not guaranteed and may depend on airline terms.</li>
          </ul>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">5. Limitation of Liability</h2>
          <p>FlyTop Travels LLC is not liable for any damages or losses arising from:</p>
          <ul className="list-disc ml-6">
            <li>Delays, cancellations, or disruptions caused by airlines.</li>
            <li>Failure to secure a booking due to inaccurate information provided by you.</li>
            <li>Circumstances beyond our control, including natural events or acts of third parties.</li>
          </ul>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">6. Modification of Terms</h2>
          <p>We may update these Terms at any time, and such changes will be effective upon posting to the Site. Continued use of our Site indicates your acceptance of the revised Terms.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">7. Governing Law</h2>
          <p>These Terms are governed by the laws of Florida, U.S. Any disputes will be resolved in the courts located in Miami, FL.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">8. Contact Us</h2>
          <p>For questions about these Terms, please contact us:</p>
          <p>Email: <a href="mailto:support@flytoptravels.com" className="underline">support@flytoptravels.com</a></p>
        </div>
      </main>
      <Footer />
    </>
  )
}