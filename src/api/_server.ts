/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { toast } from 'react-toastify'
import { LOCAL_STORAGE_TOKEN_KEY } from '../utils/constants'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

interface IRequestConfig {
  showPromiseToast?: boolean
  showErrorToast?: boolean
  pendingPromiseMessage?: string
  successPromiseMessage?: string
}

const defaultRequestConfig: IRequestConfig = {
  showPromiseToast: true,
  showErrorToast: true,
  pendingPromiseMessage: 'Enviando',
  successPromiseMessage: 'Enviado',
}

export async function post(path: string, data: any, config?: IRequestConfig) {
  const finalConfig = { ...defaultRequestConfig, ...config }

  try {
    const response = axiosInstance.post(path, data)

    if (finalConfig.showPromiseToast) {
      await toast.promise(response, {
        pending: finalConfig.pendingPromiseMessage,
        success: finalConfig.successPromiseMessage,
      })
    }

    return (await response).data
  } catch (error) {
    if (axios.isAxiosError(error) && finalConfig.showErrorToast) {
      if (error.response) {
        toast.error(error.response.data.message || 'Erro desconhecido')
      } else {
        toast.error('Erro de conexão')
      }
    }
  }
}

export async function get(path: string, config?: IRequestConfig) {
  const finalConfig = { ...defaultRequestConfig, ...config }

  try {
    const response = axiosInstance.get(path)

    if (finalConfig.showPromiseToast) {
      await toast.promise(response, {
        pending: finalConfig.pendingPromiseMessage,
        success: finalConfig.successPromiseMessage,
      })
    }

    return (await response).data
  } catch (error) {
    if (axios.isAxiosError(error) && finalConfig.showErrorToast) {
      if (error.response) {
        toast.error(error.response.data.message || 'Erro desconhecido')
      } else {
        toast.error('Erro de conexão')
      }
    }
  }
}

export async function patch(path: string, data: any, config?: IRequestConfig) {
  const finalConfig = { ...defaultRequestConfig, ...config }

  try {
    const response = axiosInstance.patch(path, data)

    if (finalConfig.showPromiseToast) {
      await toast.promise(response, {
        pending: finalConfig.pendingPromiseMessage,
        success: finalConfig.successPromiseMessage,
      })
    }

    return (await response).data
  } catch (error) {
    if (axios.isAxiosError(error) && finalConfig.showErrorToast) {
      if (error.response) {
        toast.error(error.response.data.message || 'Erro desconhecido')
      } else {
        toast.error('Erro de conexão')
      }
    }
  }
}
