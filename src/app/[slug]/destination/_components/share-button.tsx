'use client'

import { toast } from '@/components/ui/use-toast'
import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  title: string
  url: string
}

const ShareButton = ({ title, url }: ShareButtonProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url
        })
      } catch (error) {
        console.error('Erro ao compartilhar', error)
      }
    } else {
      handleFallbackShare(url)
    }
  };

  const handleFallbackShare = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: 'Link copiado!',
        description: 'O link foi copiado para a área de transferência.'
      })

    } catch (error) {
      console.error('Erro ao copiar o link', error)
      toast({
        title: 'Erro',
        description: 'Não foi possível copiar o link.',
        variant: 'destructive'
      })
    }
  }

  return (
    <Share2 onClick={handleShare} className="size-8 bg-sky-50 rounded-lg border shadow-md p-1 hover:cursor-pointer hover:bg-sky-100 transition-all ease-in-out duration-200"/>
  )
}

export default ShareButton
