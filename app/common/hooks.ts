'use client'
import { useEffect, useRef, useState } from 'react'

export const useMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

export const useFocus = () => {
  const elementRef = useRef<HTMLInputElement>(null)
  return [elementRef, () => { elementRef.current && elementRef.current.focus() }] as const
}
