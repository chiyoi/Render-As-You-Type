import { useEffect } from 'react'
import { Text } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

export default ({ href, delay }: {
  href: string,
  delay?: number,
}) => {
  const router = useRouter()
  useEffect(() => {
    const timeout = setTimeout(() => router.push(href), delay)
    return () => clearTimeout(timeout)
  })
  return (
    <Text>Redirecting to "{href}"{delay !== undefined ? `in ${delay / 1000}s` : ''}.</Text>
  )
}
