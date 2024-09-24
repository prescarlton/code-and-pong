-- DropForeignKey
ALTER TABLE "game_scores" DROP CONSTRAINT "game_scores_game_id_fkey";

-- CreateTable
CREATE TABLE "game_requests" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "requested_by_user_id" TEXT NOT NULL,
    "requested_opponent_id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_requests_game_id_key" ON "game_requests"("game_id");

-- AddForeignKey
ALTER TABLE "game_scores" ADD CONSTRAINT "game_scores_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_requests" ADD CONSTRAINT "game_requests_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
