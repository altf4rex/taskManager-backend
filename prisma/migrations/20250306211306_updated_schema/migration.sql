-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('DAY', 'WEEK', 'MONTH');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'DAY';
