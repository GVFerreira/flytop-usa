import type { Metadata } from "next"

import { Roboto } from "next/font/google"
import Script from "next/script"

import { Toaster } from "@/components/ui/toaster"
import "./globals.css"


export const metadata: Metadata = {
  title: "FlyTop Travels",
  description: "FlyTop Travels has the best prices ever",
}

const roboto = Roboto({
  weight: ["100", "300","400", "500","700","900"],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

export default function RootLayout({children}: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html lang="en-US" className={`${roboto.variable}`}>
      <head>
        {/* Script do GTM na tag <head> */}
        <Script 
          id="gtm-snippet"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}')
            `
          }}
        />
      </head>
      <body className="text-sky-900 flex flex-col min-h-screen">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          >
          </iframe>
        </noscript>
        {children}
        <Toaster />
      </body>
      {/* <Script
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
      /> */}
    </html>
  )
}
