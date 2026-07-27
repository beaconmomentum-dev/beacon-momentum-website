--> statement-breakpoint
ALTER TABLE `watch_members`
  ADD COLUMN `billingMode` varchar(16) NOT NULL DEFAULT 'live';
--> statement-breakpoint
CREATE INDEX `watch_members_billing_mode_idx` ON `watch_members` (`billingMode`);
