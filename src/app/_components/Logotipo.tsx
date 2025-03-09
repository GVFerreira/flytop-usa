import Image from "next/image"

export default function Logotipo() {
  return(
    <a className="flex items-center justify-center hover:scale-105 transition-all ease-in" href="/">
      <Image
        src="/flytop-header.svg"
        alt="Fly Top"
        width={100}
        height={50}
      />
    </a>
  )
}