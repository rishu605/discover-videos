import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '../components/loading/Loading'
import { magic } from '../lib/magic-client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn()
      if(isLoggedIn) {
        router.push("/")
      } else {
        // router.push("/login")
        setIsLoading(false)
      }
    }
    handleLoggedIn()
  }, [])

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false)
    }
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)
    return () => {
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  }, [router])
  return isLoading ? <div><Loading/></div> : <Component {...pageProps} />
}

export default MyApp
