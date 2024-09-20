import { DEFAULT_ELO, DEFAULT_K_VALUE } from "./defaults"

interface CalculateEloParams {
  p1Elo: number
  p2Elo: number
  p1Score: number
  p2Score: number
}

export default function calculateElo({
  p1Elo,
  p2Elo,
  p1Score,
  p2Score,
}: CalculateEloParams) {
  const p1WinProp = 1 / (1 + 10 ** ((p2Elo - p1Elo) / DEFAULT_ELO))
  const p2WinProp = 1 / (1 + 10 ** ((p1Elo - p2Elo) / DEFAULT_ELO))

  const p1Actual = p1Score > p2Score ? 1 : 0
  const p2Actual = 1 - p1Actual // p2Actual = 1 if p1Actual = 0, and vice versa

  const p1NewElo = p1Elo + DEFAULT_K_VALUE * (p1Actual - p1WinProp)
  const p2NewElo = p2Elo + DEFAULT_K_VALUE * (p2Actual - p2WinProp)

  return { p1NewElo, p2NewElo }
}
