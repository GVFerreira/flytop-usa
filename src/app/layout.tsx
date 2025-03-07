import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "FlyTop Travels",
  description: "FlyTop description",
}

const roboto = Roboto({
  weight: ["100", "300","400", "500","700","900"],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${roboto.variable}`}>
      <GoogleTagManager gtmId="GTM-5Z3KSBV5" />
      <body className="text-sky-900 flex flex-col min-h-screen">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5Z3KSBV5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          >
          </iframe>
        </noscript>
        {children}
        <Toaster />
      </body>
      <Script
        strategy="afterInteractive"
        id="intercom-settings"
        dangerouslySetInnerHTML={{
          __html: `
            window.intercomSettings = {
                api_base: "https://api-iam.intercom.io",
                app_id: "pa11xf3p", // Ensure this matches your actual Intercom app ID.
            };
          `
        }}
      />
      <Script
        strategy="afterInteractive"
        id="intercom-other"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/pa11xf3p';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
          `
        }}
      />
    </html>
  )
}
