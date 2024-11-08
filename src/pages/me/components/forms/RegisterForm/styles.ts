import styled from 'styled-components'

export const FormContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
  margin-top: 5rem;

  input {
    margin-bottom: 4rem;
  }

  input,
  button {
    width: 30rem;
    grid-column: span 2;
  }

  input[type='password'] {
    width: calc(15rem - 0.5rem);
    grid-column: span 1;
  }
`
