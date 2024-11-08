import { post } from './_server'
import { User } from './user'

interface ILoginResponse {
  access_token: string
  user: User
}

interface IRegisterResponse {
  access_token: string
  user: User
}

export async function login(payload: { email: string; password: string }) {
  return (await post('auth/authenticate', payload, {
    showPromiseToast: false,
  })) as ILoginResponse
}

export async function register(payload: {
  name: string
  email: string
  password: string
}) {
  return (await post('auth/register', payload, {
    showPromiseToast: false,
  })) as IRegisterResponse
}
