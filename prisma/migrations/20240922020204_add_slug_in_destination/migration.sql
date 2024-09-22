/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `destinations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `destinations` ADD COLUMN `slug` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `destinations_slug_key` ON `destinations`(`slug`);
