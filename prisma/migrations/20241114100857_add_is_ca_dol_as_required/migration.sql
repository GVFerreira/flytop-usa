/*
  Warnings:

  - Made the column `is_ca_dol` on table `destinations` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `destinations` MODIFY `is_ca_dol` BOOLEAN NOT NULL;
