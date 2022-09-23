/*
  Warnings:

  - You are about to drop the column `userId` on the `Drink` table. All the data in the column will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Drink" DROP CONSTRAINT "Drink_userId_fkey";

-- AlterTable
ALTER TABLE "Drink" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
