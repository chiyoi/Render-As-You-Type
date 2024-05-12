import { Hachi_Maru_Pop, Noto_Sans_Mono } from 'next/font/google'

export const HachiMaruPop = Hachi_Maru_Pop({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export const NotoSansMono = Noto_Sans_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-noto-sans-mono',
})
