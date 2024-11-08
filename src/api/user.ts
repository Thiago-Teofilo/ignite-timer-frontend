import { get } from './_server'
import { Cycle } from './cycle'

export interface User {
  id: string
  name: string
  email: string
  cycles?: Cycle[]
}

export async function getProfile(): Promise<User> {
  return (await get('auth/profile', {
    showPromiseToast: false,
    showErrorToast: false,
  })) as User
}
