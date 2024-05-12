'use client'
import { useEffect, useRef, useState } from 'react'
import { useQuery as useReactQuery } from '@tanstack/react-query'
import { StatusError } from 'itty-router'

export const useMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

export const useFocus = () => {
  const elementRef = useRef<HTMLInputElement>(null)
  return [elementRef, () => { elementRef.current && elementRef.current.focus() }] as const
}

export const useQueryText = (endpoint: string): [
  string, 'success',
] | [
  Error, 'error'
] | [
  null, 'loading',
] => {
  const { data, error, isSuccess, isError } = useReactQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const response = await fetch(endpoint)
      if (!response.ok) throw new StatusError(response.status, await response.text())
      return response.text()
    },
  })
  if (isError) return [error, 'error']
  if (!isSuccess) return [null, 'loading']
  return [data, 'success']
}

export const useDelayedState = <Value>(initial: Value, delay: number) => {
  const [buffer, setBuffer] = useState(initial)
  const [state, setState] = useState(initial)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const setter = (value: Value) => {
    setBuffer(value)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState(value), delay)
  }
  return [buffer, state, setter] as const
}
