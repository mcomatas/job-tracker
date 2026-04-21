/*
  Warnings:

  - You are about to drop the `Application` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatusEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StatusEvent" DROP CONSTRAINT "StatusEvent_applicationId_fkey";

-- DropTable
DROP TABLE "Application";

-- DropTable
DROP TABLE "StatusEvent";

-- CreateTable
CREATE TABLE "Applications" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL,
    "location" TEXT NOT NULL,
    "appliedDate" TIMESTAMP(3) NOT NULL,
    "jobUrl" TEXT,
    "salaryRange" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusEvents" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "fromStatus" "ApplicationStatus",
    "toStatus" "ApplicationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StatusEvents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StatusEvents_applicationId_createdAt_idx" ON "StatusEvents"("applicationId", "createdAt");

-- AddForeignKey
ALTER TABLE "StatusEvents" ADD CONSTRAINT "StatusEvents_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
