"use server"

import { prisma } from "@/prismaClient"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export default async function denyGameRequest(id: string) {
  const { userId } = auth()

  const request = await prisma.gameRequest.findUnique({
    where: {
      id,
    },
  })

  if (request?.requestedOpponentId !== userId) {
    throw new Error("Game request not found")
  }

  // delete the game and game request
  await prisma.game.delete({
    where: {
      id: request.gameId,
    },
  })
  revalidatePath("/")
}
