import { AuthForm } from "./_components/auth-form"

export const metadata = {
  title: "FlyTop - Login"
}

export default function Auth() {
  return (
    <main className="h-screen flex items-center">
      <AuthForm />
    </main>
  )
}