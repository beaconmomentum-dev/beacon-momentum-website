CREATE TABLE `community_build_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`city` varchar(128) NOT NULL,
	`state` varchar(64) NOT NULL,
	`cycle` varchar(32) NOT NULL DEFAULT '2026-2027',
	`ip_address` varchar(45),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `community_build_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `watch_payment_notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`stripeEventId` varchar(128) NOT NULL,
	`billingMode` varchar(16) NOT NULL,
	`eventType` varchar(96) NOT NULL,
	`email` varchar(320),
	`firstName` varchar(128),
	`stripeCustomerId` varchar(64),
	`stripeSubscriptionId` varchar(64),
	`notificationStatus` varchar(32) NOT NULL,
	`payload` json NOT NULL,
	`deliveryStatus` varchar(32) NOT NULL DEFAULT 'pending',
	`attemptCount` int NOT NULL DEFAULT 0,
	`nextAttemptAt` timestamp,
	`deliveredAt` timestamp,
	`lastError` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `watch_payment_notifications_id` PRIMARY KEY(`id`),
	CONSTRAINT `watch_payment_notifications_stripeEventId_unique` UNIQUE(`stripeEventId`)
);
--> statement-breakpoint
ALTER TABLE `watch_members` MODIFY COLUMN `tier` varchar(32);--> statement-breakpoint
ALTER TABLE `watch_members` MODIFY COLUMN `track` varchar(32);--> statement-breakpoint
ALTER TABLE `watch_members` MODIFY COLUMN `intakeAnswers` json;--> statement-breakpoint
ALTER TABLE `watch_members` ADD `stripeCustomerId` varchar(64);--> statement-breakpoint
ALTER TABLE `watch_members` ADD `stripeSubscriptionId` varchar(64);--> statement-breakpoint
ALTER TABLE `watch_members` ADD `billingMode` varchar(16) DEFAULT 'live' NOT NULL;--> statement-breakpoint
ALTER TABLE `watch_members` ADD `enrollmentStatus` varchar(32) DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `watch_members` ADD `paidAt` timestamp;--> statement-breakpoint
ALTER TABLE `watch_members` ADD `renewsAt` timestamp;--> statement-breakpoint
ALTER TABLE `watch_members` ADD CONSTRAINT `watch_members_stripeSubscriptionId_unique` UNIQUE(`stripeSubscriptionId`);