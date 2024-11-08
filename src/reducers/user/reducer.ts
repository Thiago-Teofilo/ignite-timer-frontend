import { User } from '../../api/user'
import { LOCAL_STORAGE_TOKEN_KEY } from '../../utils/constants'
import { ActionTypes } from './actions'
import { produce } from 'immer'

interface UserState {
  user: User | null
  sessionToken: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function userReducer(state: UserState, action: any) {
  switch (action.type) {
    case ActionTypes.SET_LOGGED_USER:
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.payload.token)

      return produce(state, (draft) => {
        draft.user = action.payload.user
        draft.sessionToken = action.payload.token
      })
    case ActionTypes.LOGOUT_USER: {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)

      return produce(state, (draft) => {
        draft.user = null
        draft.sessionToken = null
      })
    }
    default:
      return state
  }
}
