import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export function Theme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (theme === 'null') setTheme('dark')
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <a
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="cursor-pointer filter text-3xl hover:opacity-75 px-10 text-yellow-200 delay-100 transition"
    >
      {theme === 'light' ? (
        <FaSun />
      ) : theme === 'null' ? (
        <FaSun />
      ) : (
        <FaMoon />
      )}
    </a>
  )
}
