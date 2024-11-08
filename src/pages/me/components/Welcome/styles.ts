import styled from 'styled-components'
import { BaseButton } from '../../../../styles/global'

export const WelcomeContainer = styled.main`
  width: 40rem;

  @media (max-width: 768px) {
    width: 20rem;

    h1 {
      margin-top: 5rem;
    }
  }
`

export const StatsContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
  margin: auto;
  margin-top: 5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme['gray-600']};
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  text-align: center;

  svg {
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme['green-300']};
  }

  span {
    font-weight: bold;
    font-size: 0.9rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const LogoutButton = styled(BaseButton)`
  background: ${(props) => props.theme['red-500']};

  margin: auto;
  margin-top: 5rem;
  width: 10rem;

  &:hover {
    background: ${(props) => props.theme['red-700']} !important;
  }
`
