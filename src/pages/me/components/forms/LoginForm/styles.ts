import styled from 'styled-components'

export const FormContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  margin-top: 5rem;

  input {
    width: 30rem;
    margin-bottom: 4rem;
  }
`
