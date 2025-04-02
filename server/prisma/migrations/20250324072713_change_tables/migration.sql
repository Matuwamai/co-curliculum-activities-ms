/*
  Warnings:

  - You are about to drop the `member_activities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `members` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `member_activities` DROP FOREIGN KEY `member_activities_activityId_fkey`;

-- DropForeignKey
ALTER TABLE `member_activities` DROP FOREIGN KEY `member_activities_memberId_fkey`;

-- AlterTable
ALTER TABLE `staffs` ADD COLUMN `role` ENUM('ADMIN', 'TRAINER', 'STUDENT') NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE `member_activities`;

-- DropTable
DROP TABLE `members`;

-- CreateTable
CREATE TABLE `user_activities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `activityId` INTEGER NOT NULL,

    UNIQUE INDEX `user_activities_memberId_activityId_key`(`memberId`, `activityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_activities` ADD CONSTRAINT `user_activities_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `staffs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_activities` ADD CONSTRAINT `user_activities_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `activities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
