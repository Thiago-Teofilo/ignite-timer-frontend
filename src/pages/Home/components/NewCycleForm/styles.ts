import styled from 'styled-components'
import { BaseInput } from '../../../../styles/global'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
  -moz-appearance: textfield;
`
