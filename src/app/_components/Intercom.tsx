'use client'

import { Intercom } from "@intercom/messenger-js-sdk"

export default function IntercomComp() {
  Intercom({
    region: "us",
    app_id: "pa11xf3p",
    user_id: "user.id", // IMPORTANT: Replace "user.id" with the variable you use to capture the user's ID
    name: "Gustavo Ferreira", // IMPORTANT: Replace "user.name" with the variable you use to capture the user's name
    email: "contato@gvfwebdesign.com.br", // IMPORTANT: Replace "user.email" with the variable you use to capture the user's email
    created_at: 1704067200, // IMPORTANT: Replace "user.createdAt" with the variable you use to capture the user's sign-up date in a Unix timestamp (in seconds) e.g. 1704067200
    hide_default_launcher: false
  })

  return null
}
