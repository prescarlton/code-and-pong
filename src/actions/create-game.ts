"use server"

import calculateElo from "@/lib/calculate-elo"
import { prisma } from "@/prismaClient"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

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

  // grab the players' elo scores
  const myUser = await clerkClient.users.getUser(userId)
  const myMetadata = myUser.publicMetadata as { elo: number }

  const opponentUser = await clerkClient.users.getUser(opponentId)
  const opponentMetadata = opponentUser.publicMetadata as { elo: number }

  const myElo = myMetadata.elo || 400
  const opponentElo = opponentMetadata.elo || 400

  // calculate the new elo scores
  const { p1NewElo, p2NewElo } = calculateElo({
    p1Elo: myElo,
    p2Elo: opponentElo,
    p1Score: myScore,
    p2Score: opponentScore,
  })

  // update the elo scores
  await clerkClient.users.updateUser(userId, {
    publicMetadata: { ...myMetadata, elo: p1NewElo },
  })
  await clerkClient.users.updateUser(opponentId, {
    publicMetadata: { ...opponentMetadata, elo: p2NewElo },
  })

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
  revalidatePath("/")
  // find out who da winner is
  return game
}
