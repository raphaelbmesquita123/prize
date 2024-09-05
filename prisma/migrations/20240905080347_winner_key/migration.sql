/*
  Warnings:

  - You are about to drop the column `winner_key` on the `Raffles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Raffles" DROP COLUMN "winner_key",
ADD COLUMN     "winnerKey" TEXT;
