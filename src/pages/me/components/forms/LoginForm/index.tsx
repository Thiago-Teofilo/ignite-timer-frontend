import { useFormContext } from 'react-hook-form'
import { BaseButton, BaseInput } from '../../../../../styles/global'
import { FormContainer } from './styles'

export function LoginForm() {
  const { register } = useFormContext()

  return (
    <FormContainer>
      <BaseInput placeholder="E-mail" {...register('email')} />
      <BaseInput
        type="password"
        placeholder="Senha"
        {...register('password')}
      />
      <BaseButton type="submit">Fazer Login</BaseButton>
    </FormContainer>
  )
}
