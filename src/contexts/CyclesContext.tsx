import {
  createContext,
  ReactNode,
  useState,
  useReducer,
  useEffect,
  useContext,
} from 'react'
import { cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
  setCyclesAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'
import { Cycle } from '../api/cycle'
import { UserContext } from './UserContext'
import { getProfile } from '../api/user'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  setCycles: (cycles: Cycle[]) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

const CYCLES_STATE_STORAGE_KEY = '@ignite-timer:cycles-state-1.0.0'

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const { sessionToken, user, setLoggedUser } = useContext(UserContext)

  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      if (!user) {
        const storedStateAsJSON = localStorage.getItem(CYCLES_STATE_STORAGE_KEY)

        if (storedStateAsJSON) {
          return JSON.parse(storedStateAsJSON)
        }
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    if (sessionToken && !user) {
      getProfile().then((user) => {
        setLoggedUser({
          user,
          token: sessionToken,
        })
        setCycles(user.cycles ?? [])
      })
    }
  })

  useEffect(() => {
    if (!user && !sessionToken) {
      const stateJSON = JSON.stringify(cyclesState)

      localStorage.setItem(CYCLES_STATE_STORAGE_KEY, stateJSON)
    }
  }, [cyclesState, user])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  function setCycles(cycles: Cycle[]) {
    dispatch(setCyclesAction(cycles))
  }
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        setCycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
