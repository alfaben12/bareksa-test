-- CreateEnum
CREATE TYPE "NewsStatus" AS ENUM ('draft', 'deleted', 'publish');

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "topicId" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "body" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tags" TEXT[],
    "status" "NewsStatus" NOT NULL DEFAULT E'draft',

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topic_id_key" ON "Topic"("id");

-- CreateIndex
CREATE UNIQUE INDEX "News_id_key" ON "News"("id");

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
