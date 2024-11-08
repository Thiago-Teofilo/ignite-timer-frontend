import {
  createCycle,
  Cycle,
  finishCycle,
  interruptCycle,
} from '../../api/cycle'
import { ActionTypes } from './actions'
import { produce } from 'immer'

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      createCycle({
        ...action.payload.newCycle,
      })

      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      const interruptedDate = new Date()

      interruptCycle({
        cycleId: state.activeCycleId!,
        interruptedDate,
      })

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = interruptedDate
      })
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      const finishedDate = new Date()

      finishCycle({
        cycleId: state.activeCycleId!,
        finishedDate,
      })

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = finishedDate
      })
    }
    case ActionTypes.SET_CYCLES: {
      // Coleta o ciclo que não foi finalizado nem interrompido para ser o activeCycle
      const activeCycle: Cycle = action.payload.cycles.find(
        (cycle: Cycle) => !cycle.interruptedDate && !cycle.finishedDate,
      )

      return produce(state, (draft) => {
        draft.activeCycleId = activeCycle?.id ?? null
        draft.cycles = action.payload.cycles
      })
    }
    default:
      return state
  }
}
