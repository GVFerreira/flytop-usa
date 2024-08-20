'use client'

import { useEffect } from "react"

const IntercomClientComponent = () => {
    useEffect(() => {
        if (typeof process.env.NEXT_PUBLIC_INTERCOM_APP_ID === 'string') {
            window.intercomSettings = {
                api_base: "https://api-iam.intercom.io",
                app_id: process.env.NEXT_PUBLIC_INTERCOM_APP_ID
            }
        } else {
            console.error("Intercom app ID is not set. Please check your environment variables.")
        }

        if (window.Intercom) {
            window.Intercom('reattach_activator')
            window.Intercom('update', window.intercomSettings)
        } else {
            const intercomScript = document.createElement('script')
            intercomScript.type = 'text/javascript'
            intercomScript.async = true
            intercomScript.src = `https://widget.intercom.io/widget/${process.env.NEXT_PUBLIC_INTERCOM_APP_ID}`
            intercomScript.onload = () => window.Intercom('update', window.intercomSettings)
            document.body.appendChild(intercomScript)
        }
    }, [])

    return null
}

export default IntercomClientComponent
