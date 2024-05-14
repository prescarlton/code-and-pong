"use server"

import { prisma } from "@/prismaClient"
import { auth } from "@clerk/nextjs/server"

interface CreateGameParams {
  opponentId: string
  myScore: number
  opponentScore: number
}

export default async function createGame({
  opponentId,
  myScore,
  opponentScore,
}: CreateGameParams) {
  const { userId } = auth()
  if (!userId) throw new Error("Unauthorized")

  // create the game
  const game = await prisma.game.create({
    data: {
      players: [userId, opponentId],
      winners: myScore > opponentScore ? [userId] : [opponentId],
    },
  })
  // create all my scores
  await prisma.gameScore.createMany({
    data: [
      ...Array.from({ length: myScore }).map((_) => ({
        scoringUserId: userId,
        scoredAgainstUserId: opponentId,
        gameId: game.id,
      })),
    ],
  })
  // create all the opponent's scores
  await prisma.gameScore.createMany({
    data: [
      ...Array.from({ length: opponentScore }).map((_) => ({
        scoringUserId: opponentId,
        scoredAgainstUserId: userId,
        gameId: game.id,
      })),
    ],
  })
  // find out who da winner is
  return game
}
