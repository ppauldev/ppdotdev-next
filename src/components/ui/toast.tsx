'use client'

import { useEffect, useState } from 'react'

export function Toast({ message, duration = 2000 }: { message: string, duration?: number }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!show) return null

  return (
    <div className="fixed bottom-4 right-4 bg-zinc-700 text-zinc-100 px-4 py-2 rounded-md shadow-lg text-sm">
      {message}
    </div>
  )
} 