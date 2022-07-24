import { useRef, useEffect, useState } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'

const useAuthentication = () => {
  const mounted = useRef(true)
  const [isLogged, setIsLogged] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  useEffect(() => {

    if(mounted) {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setIsLogged(true)
            }
            setCheckingStatus(false)
        })
    }

    return () => {
        mounted.current = false
    }

  }, [mounted])
  return { isLogged, checkingStatus }
}

export default useAuthentication