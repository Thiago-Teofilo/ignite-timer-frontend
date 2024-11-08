import { useFormContext } from 'react-hook-form'
import { BaseButton, BaseInput } from '../../../../../styles/global'
import { FormContainer } from './styles'

export function RegisterForm() {
  const { register } = useFormContext()

  return (
    <FormContainer>
      <BaseInput placeholder="E-mail" {...register('email')} />
      <BaseInput placeholder="Nome" {...register('name')} />
      <BaseInput
        type="password"
        placeholder="Senha"
        {...register('password')}
      />
      <BaseInput
        type="password"
        placeholder="Confirmar senha"
        {...register('confirmPassword')}
      />
      <BaseButton type="submit">Cadastrar-se</BaseButton>
    </FormContainer>
  )
}
