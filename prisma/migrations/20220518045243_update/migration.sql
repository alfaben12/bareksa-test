/*
  Warnings:

  - You are about to drop the column `name` on the `Topic` table. All the data in the column will be lost.
  - Added the required column `title` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "name",
ADD COLUMN     "title" VARCHAR(100) NOT NULL;
