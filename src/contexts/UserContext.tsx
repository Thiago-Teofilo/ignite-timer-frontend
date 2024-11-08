import { createContext, ReactNode, useReducer } from 'react'
import { User } from '../api/user'
import { userReducer } from '../reducers/user/reducer'
import { LOCAL_STORAGE_TOKEN_KEY } from '../utils/constants'
import { logoutUserAction, setLoggedUserAction } from '../reducers/user/actions'

interface ISetLoggedUserPayload {
  user: User
  token: string
}

interface UserContextType {
  user: User | null
  sessionToken: string | null
  setLoggedUser: (payload: ISetLoggedUserPayload) => void
  logoutUser: () => void
}

export const UserContext = createContext({} as UserContextType)

interface UserContextProviderProps {
  children: ReactNode
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [userState, dispatch] = useReducer(
    userReducer,
    {
      user: null,
      sessionToken: null,
    },
    (initialState) => {
      const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)

      if (storedToken) {
        return {
          user: null,
          sessionToken: storedToken,
        }
      }

      return initialState
    },
  )

  const { user, sessionToken } = userState

  function setLoggedUser(payload: ISetLoggedUserPayload) {
    dispatch(setLoggedUserAction(payload))
  }

  function logoutUser() {
    dispatch(logoutUserAction())
  }

  return (
    <UserContext.Provider
      value={{
        user,
        sessionToken,
        setLoggedUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
