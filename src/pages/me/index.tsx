import { FormProvider, useForm } from 'react-hook-form'
import { LoginForm } from './components/forms/LoginForm'
import { MeContainer } from './styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { login, register } from '../../api/auth'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useState } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { Welcome } from './components/Welcome/Welcome'
import { RegisterForm } from './components/forms/RegisterForm'
import { toast } from 'react-toastify'

const loginFormValidationSchema = zod.object({
  email: zod.string().min(1, 'Insira seu e-mail'),
  password: zod.string().min(1, 'Insira sua senha'),
})

const registerFormValidationSchema = zod.object({
  email: zod.string().min(1, 'Insira seu e-mail'),
  name: zod.string().min(1, 'Insira seu nome'),
  password: zod.string().min(1, 'Insira sua senha'),
  confirmPassword: zod.string().min(1, 'Insira sua senha'),
})

type LoginFormData = zod.infer<typeof loginFormValidationSchema>

type RegisterFormData = zod.infer<typeof registerFormValidationSchema>

export function Me() {
  const { setCycles } = useContext(CyclesContext)
  const { user, setLoggedUser } = useContext(UserContext)

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormValidationSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  })

  const [isRegistering, setIsRegistering] = useState(false)

  function handleLogin(data: LoginFormData) {
    login(data).then((response) => {
      setLoggedUser({
        user: response.user,
        token: response.access_token,
      })
      setCycles(response.user.cycles ?? [])
    })
  }

  function handleRegister(data: RegisterFormData) {
    const { confirmPassword, ...registerData } = data
    if (confirmPassword === registerData.password) {
      register(registerData).then((response) => {
        setLoggedUser({
          user: response.user,
          token: response.access_token,
        })
        setCycles(response.user.cycles ?? [])
      })
    } else {
      toast.error('Senhas não coincidem')
    }
  }

  return (
    <MeContainer>
      {user ? (
        <Welcome />
      ) : (
        <div>
          <h1>Mantenha seu progresso salvo!</h1>
          {isRegistering ? (
            <div>
              <h2>Crie uma nova conta</h2>
              <form
                onSubmit={registerForm.handleSubmit(handleRegister)}
                action=""
              >
                <FormProvider {...registerForm}>
                  <RegisterForm />
                </FormProvider>
                <a onClick={() => setIsRegistering(!isRegistering)}>
                  Possui conta?
                </a>
              </form>
            </div>
          ) : (
            <div>
              <h2>Faça login em sua conta</h2>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} action="">
                <FormProvider {...loginForm}>
                  <LoginForm />
                </FormProvider>
                <a onClick={() => setIsRegistering(!isRegistering)}>
                  Não possui conta?
                </a>
              </form>
            </div>
          )}
        </div>
      )}
    </MeContainer>
  )
}
