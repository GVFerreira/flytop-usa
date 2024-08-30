/*
  Warnings:

  - Added the required column `imageSlide` to the `destinations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `destinations` ADD COLUMN `imageSlide` VARCHAR(191) NOT NULL;
