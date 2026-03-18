import React, { useEffect } from 'react'
import { router } from './App.routes'
import { RouterProvider } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'

const App = () => {

  const auth = useAuth()

  useEffect(()=>{
    auth.handleGetMe()
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App