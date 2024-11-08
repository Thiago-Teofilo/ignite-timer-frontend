import { Cycle } from '../api/cycle'

export function getStartedDateDayAverage(cycles: Cycle[]): number {
  const countPerDay: { [key: string]: number } = {}

  for (const cycle of cycles) {
    // Extrair dia, mês e ano do startDate
    const day = new Date(cycle.startDate).toISOString().split('T')[0]
    countPerDay[day] = (countPerDay[day] || 0) + 1
  }

  const totalDays = Object.keys(countPerDay).length
  const totalCycles = Object.values(countPerDay).reduce(
    (acc, count) => acc + count,
    0,
  )

  return totalDays > 0 ? totalCycles / totalDays : 0
}

export function getFinishedDateDayAverage(cycles: Cycle[]): number {
  const countPerDay: { [key: string]: number } = {}

  for (const cycle of cycles) {
    if (cycle.finishedDate) {
      const day = new Date(cycle.finishedDate).toISOString().split('T')[0]
      countPerDay[day] = (countPerDay[day] || 0) + 1
    }
  }

  const totalDays = Object.keys(countPerDay).length
  const totalCycles = Object.values(countPerDay).reduce(
    (acc, count) => acc + count,
    0,
  )

  return totalDays > 0 ? totalCycles / totalDays : 0
}

export function getInterruptedDateDayAverage(cycles: Cycle[]): number {
  const countPerDay: { [key: string]: number } = {}

  for (const cycle of cycles) {
    if (cycle.interruptedDate) {
      const day = new Date(cycle.interruptedDate).toISOString().split('T')[0]
      countPerDay[day] = (countPerDay[day] || 0) + 1
    }
  }

  const totalDays = Object.keys(countPerDay).length
  const totalCycles = Object.values(countPerDay).reduce(
    (acc, count) => acc + count,
    0,
  )

  return totalDays > 0 ? totalCycles / totalDays : 0
}
