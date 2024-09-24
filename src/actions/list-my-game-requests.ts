"use server"

import { prisma } from "@/prismaClient"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { GameRequest } from "@prisma/client"

export interface GameRequestWithOpponent extends GameRequest {
  myScore: number
  opponentScore: number
  opponent: {
    id: string
    fullName: string
  }
}

export default async function listMyGameRequests(): Promise<
  GameRequestWithOpponent[]
> {
  const { userId } = auth()
  if (!userId) {
    throw new Error("Not authenticated")
  }
  const requests = await prisma.gameRequest.findMany({
    where: {
      requestedOpponentId: userId,
    },
    include: {
      Game: {
        include: {
          Scores: true,
        },
      },
    },
  })

  const users = await clerkClient.users.getUserList({
    userId: requests.map((request) => request.requestedByUserId).flat(),
  })

  return requests
    .map((request) => {
      const opponent = users.data.find(
        (user) => user.id === request.requestedByUserId,
      )
      if (!opponent) {
        return
      }

      const myScore = request.Game.Scores.filter(
        (score) => score.scoringUserId === userId,
      ).length
      const opponentScore = request.Game.Scores.filter(
        (score) => score.scoringUserId === opponent.id,
      ).length

      return {
        ...request,
        opponent: {
          id: opponent.id,
          fullName: opponent.fullName,
        },
        myScore,
        opponentScore,
      }
    })
    .filter(Boolean) as GameRequestWithOpponent[]
}
