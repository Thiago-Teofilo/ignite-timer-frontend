import styled from 'styled-components'

export const MeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }

  h1,
  h2 {
    text-align: center;
  }

  h2 {
    margin-top: 1rem;
  }

  a {
    cursor: pointer;
  }
`
