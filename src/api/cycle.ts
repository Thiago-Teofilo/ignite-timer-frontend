import { patch, post } from './_server'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function createCycle(payload: {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}) {
  return post('cycles', payload, {
    showPromiseToast: false,
    showErrorToast: false,
  })
}

export function interruptCycle(payload: {
  cycleId: string
  interruptedDate: Date
}) {
  return patch('cycles/interrupt', payload, {
    showPromiseToast: false,
    showErrorToast: false,
  })
}

export function finishCycle(payload: { cycleId: string; finishedDate: Date }) {
  return patch('cycles/finish', payload, {
    showPromiseToast: false,
    showErrorToast: false,
  })
}
