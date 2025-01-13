-- CreateEnum
CREATE TYPE "Interval" AS ENUM ('HOURLY', 'DAILY', 'WEEKLY');

-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "interval" "Interval" NOT NULL DEFAULT 'HOURLY',
    "weekday" "Weekday"[],
    "sendTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_message" (
    "id" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "image" BYTEA NOT NULL,
    "interval" "Interval" NOT NULL DEFAULT 'HOURLY',
    "weekday" "Weekday"[],
    "sendTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "photo_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "group_groupId_key" ON "group"("groupId");
