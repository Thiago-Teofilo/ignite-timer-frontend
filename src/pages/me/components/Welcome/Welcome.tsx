import { useContext } from 'react'
import { UserContext } from '../../../../contexts/UserContext'
import {
  LogoutButton,
  StatCard,
  WelcomeContainer,
  StatsContainer,
} from './styles'
import { Check, HandPalm, Play, SignOut } from 'phosphor-react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { toPlural } from '../../../../utils/strings'
import {
  getFinishedDateDayAverage,
  getInterruptedDateDayAverage,
  getStartedDateDayAverage,
} from '../../../../utils/cycles'

export function Welcome() {
  const { user, logoutUser } = useContext(UserContext)
  const { cycles, setCycles } = useContext(CyclesContext)

  const totalCycles = cycles.length
  const totalInterruptedCycles = cycles.filter(
    (cycle) => cycle.interruptedDate,
  ).length

  const totalFinishedCycles = cycles.filter(
    (cycle) => cycle.finishedDate,
  ).length

  const startedDateDayAverage = getStartedDateDayAverage(cycles)
  const finishedDateDayAverage = getFinishedDateDayAverage(cycles)
  const interruptedDateDayAverage = getInterruptedDateDayAverage(cycles)

  function handleLogout() {
    setCycles([])
    logoutUser()
  }
  return (
    <WelcomeContainer>
      <header>
        <h1>Olá, {user!.name}</h1>
      </header>
      <StatsContainer>
        <StatCard>
          <Play size={24} />
          <span>
            Em média de {startedDateDayAverage}{' '}
            {toPlural('ciclos criados', 'ciclo criado', startedDateDayAverage)}{' '}
            por dia
          </span>
        </StatCard>
        <StatCard>
          <HandPalm size={24} />
          <span>
            Em média de {interruptedDateDayAverage}{' '}
            {toPlural(
              'ciclos interrompidos',
              'ciclo interrompido',
              totalInterruptedCycles,
            )}{' '}
            por dia
          </span>
        </StatCard>
        <StatCard>
          <Check size={24} />
          <span>
            Em média de {finishedDateDayAverage}{' '}
            {toPlural(
              'ciclos finalizados',
              'ciclo finalizado',
              finishedDateDayAverage,
            )}{' '}
            por dia
          </span>
        </StatCard>
        <StatCard>
          <Play size={24} />
          <span>Total de {totalCycles} ciclos</span>
        </StatCard>
        <StatCard>
          <HandPalm size={24} />
          <span>
            Total de {totalInterruptedCycles}{' '}
            {toPlural(
              'ciclos interrompidos',
              'ciclo interrompido',
              totalInterruptedCycles,
            )}
          </span>
        </StatCard>
        <StatCard>
          <Check size={24} />
          <span>
            Total de {totalFinishedCycles}{' '}
            {toPlural(
              'ciclos finalizados',
              'ciclo finalizado',
              totalFinishedCycles,
            )}
          </span>
        </StatCard>
      </StatsContainer>
      <LogoutButton onClick={handleLogout}>
        Logout
        <SignOut size={24} />
      </LogoutButton>
    </WelcomeContainer>
  )
}
