-- DropForeignKey
ALTER TABLE `destination_category` DROP FOREIGN KEY `destination_category_destinationId_fkey`;

-- AddForeignKey
ALTER TABLE `destination_category` ADD CONSTRAINT `destination_category_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `destinations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
