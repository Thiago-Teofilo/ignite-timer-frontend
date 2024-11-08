import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContainer } from './style'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'

export function DefaultLayout() {
  const { user, sessionToken } = useContext(UserContext)

  useEffect(() => {
    if (!user && !sessionToken) {
      toast('Você pode login para manter salvo seus registros')
    }
  })

  return (
    <LayoutContainer>
      <Header />
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </LayoutContainer>
  )
}
