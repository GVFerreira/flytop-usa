/*
  Warnings:

  - You are about to drop the column `amout` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `clients` DROP COLUMN `amout`,
    ADD COLUMN `amount` INTEGER NULL;
