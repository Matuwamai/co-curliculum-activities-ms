-- AlterTable
ALTER TABLE `announcements` ADD COLUMN `urgent` ENUM('TRUE', 'FALSE') NOT NULL DEFAULT 'FALSE';
