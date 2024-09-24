"use server"

import calculateElo from "@/lib/calculate-elo"
import { DEFAULT_ELO } from "@/lib/defaults"
import { prisma } from "@/prismaClient"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export default async function confirmGameRequest(id: string) {
  const { userId } = auth()

  const request = await prisma.gameRequest.findUnique({
    where: {
      id,
    },
    include: {
      Game: {
        include: {
          Scores: true,
        },
      },
    },
  })

  if (request?.requestedOpponentId !== userId) {
    throw new Error("Game request not found")
  }
  // make sure there are no earlier game requests.
  // these have to be accepted first so ELO scores are correct
  const earlierRequests = await prisma.gameRequest.findMany({
    where: {
      requestedOpponentId: userId,
      created: {
        lt: request.created,
      },
    },
  })

  if (earlierRequests.length > 0) {
    throw new Error(
      "You have earlier game requests you must accept / deny first.",
    )
  }

  if (process.env.NODE_ENV !== "development") {
    // grab the players' elo scores
    const myUser = await clerkClient.users.getUser(userId)
    const myMetadata = myUser.publicMetadata as { elo: number }

    const opponentUser = await clerkClient.users.getUser(
      request.requestedByUserId,
    )
    const opponentMetadata = opponentUser.publicMetadata as { elo: number }

    const myElo = myMetadata.elo || DEFAULT_ELO
    const opponentElo = opponentMetadata.elo || DEFAULT_ELO

    const myScore = request.Game.Scores.filter(
      (score) => score.scoringUserId === userId,
    ).length
    const opponentScore = request.Game.Scores.filter(
      (score) => score.scoringUserId === opponentUser.id,
    ).length

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
    await clerkClient.users.updateUser(opponentUser.id, {
      publicMetadata: { ...opponentMetadata, elo: p2NewElo },
    })
  }
  // if there are none, confirm this game request, calculate ELO scores and delete the request.
  await prisma.gameRequest.delete({
    where: {
      id,
    },
  })
  revalidatePath("/")
}
