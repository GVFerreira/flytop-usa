import Header from '../_components/Header'
import Footer from '../_components/Footer'

export const metadata = {
  title: "FlyTop - Privacy Policy"
}

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="container space-y-8 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-center mb-10">Privacy Policy</h1>
          <p>Last Updated: November 13th, 2024</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">1. Introduction</h2>
          <p>Welcome to FlyTop Travels LLC. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, share, and protect information about you when you use our services through <a href="https://flytoptravels.com" className="underline">https://flytoptravels.com</a> (the “Site”).</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">2. Information We Collect</h2>
          <p>We may collect information in various ways, including:</p>
          <ul className="list-disc ml-6">
            <li><strong>Personal Information:</strong> such as name, email address, phone number, billing details, and passport information (where necessary) for booking and verification purposes.</li>
            <li><strong>Usage Data:</strong> Information about your interactions with our Site, including IP address, browser type, and pages visited.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies to improve user experience and analyze Site traffic.</li>
          </ul>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc ml-6">
            <li>Facilitate the booking and purchasing process for airline tickets.</li>
            <li>Improve and personalize your experience on our Site.</li>
            <li>Communicate with you about your bookings, inquiries, or promotions.</li>
            <li>Ensure security and prevent fraud.</li>
          </ul>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">4. Sharing Your Information</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc ml-6">
            <li><strong>Service Providers:</strong> Third-party vendors who assist us with payment processing, customer support, and IT services.</li>
            <li><strong>Airline Partners:</strong> To confirm and fulfill your bookings.</li>
            <li><strong>Legal Compliance:</strong> When required by law, or to protect our rights and safety.</li>
          </ul>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">5. Your Choices</h2>
          <p>You can manage cookie preferences in your browser and opt out of certain promotional communications by following the unsubscribe instructions provided in our emails.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">6. Security</h2>
          <p>We implement robust security measures to safeguard your data. However, no internet-based service is 100% secure, and we cannot guarantee absolute security.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">7. Changes to This Privacy Policy</h2>
          <p>We may update this policy periodically. Changes will be posted on this page with the revised date.</p>
        </div>
        <hr />
        <div>
          <h2 className="text-4xl font-bold mb-4">8. Contact Us</h2>
          <p>If you have questions about our Privacy Policy, please contact us at:</p>
          <p>Email: <a href="mailto:support@flytoptravels.com" className="underline">support@flytoptravels.com</a></p>
        </div>
      </main>
      <Footer />
    </>
  )
}