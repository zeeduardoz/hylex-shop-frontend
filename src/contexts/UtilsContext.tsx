import { createContext, useEffect, useState } from 'react'

type UtilsCotextType = {
  useSidebarAdmin: boolean

  updateSidebarAdmin: () => void
}

export const UtilsContext = createContext({} as UtilsCotextType)

export const UtilsProvider: React.FC = ({ children }: any) => {
  const [useSidebarAdmin, setSidebarAdmin] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('@hylex/sidebar-admin')) {
      localStorage.setItem('@hylex/sidebar-admin', 'true')
      setSidebarAdmin(true)
    } else {
      if (localStorage.getItem('@hylex/sidebar-admin') === 'false') {
        setSidebarAdmin(false)
      } else {
        setSidebarAdmin(true)
      }
    }
  }, [useSidebarAdmin])

  function updateSidebarAdmin() {
    localStorage.setItem('@hylex/sidebar-admin', `${!useSidebarAdmin}`)
    setSidebarAdmin(!useSidebarAdmin)
  }

  return (
    <UtilsContext.Provider
      value={{
        useSidebarAdmin,
        updateSidebarAdmin
      }}
    >
      {children}
    </UtilsContext.Provider>
  )
}
