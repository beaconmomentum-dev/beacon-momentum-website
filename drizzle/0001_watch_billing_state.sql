ALTER TABLE `watch_members`
  MODIFY COLUMN `tier` varchar(32),
  MODIFY COLUMN `track` varchar(32),
  MODIFY COLUMN `intakeAnswers` json;
--> statement-breakpoint
ALTER TABLE `watch_members`
  ADD COLUMN `stripeCustomerId` varchar(64),
  ADD COLUMN `stripeSubscriptionId` varchar(64),
  ADD COLUMN `enrollmentStatus` varchar(32) NOT NULL DEFAULT 'pending',
  ADD COLUMN `paidAt` timestamp NULL,
  ADD COLUMN `renewsAt` timestamp NULL;
--> statement-breakpoint
ALTER TABLE `watch_members`
  ADD CONSTRAINT `watch_members_stripe_subscription_id_unique` UNIQUE (`stripeSubscriptionId`);
--> statement-breakpoint
CREATE INDEX `watch_members_email_idx` ON `watch_members` (`email`);
