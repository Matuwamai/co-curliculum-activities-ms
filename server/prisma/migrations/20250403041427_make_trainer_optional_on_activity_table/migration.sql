-- DropForeignKey
ALTER TABLE `activities` DROP FOREIGN KEY `activities_trainerId_fkey`;

-- DropIndex
DROP INDEX `activities_trainerId_key` ON `activities`;

-- AlterTable
ALTER TABLE `activities` MODIFY `trainerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_trainerId_fkey` FOREIGN KEY (`trainerId`) REFERENCES `trainers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
