# SendGrid API Setup Instructions

## Quick Setup (2 Minutes)

### Step 1: SSH into Your Server
```bash
ssh root@143.198.23.240
```

### Step 2: Create the Config File
```bash
cd /var/www/beaconmomentum.com/api
nano config.php
```

### Step 3: Paste This Content
```php
<?php
define('SENDGRID_API_KEY', 'YOUR_ACTUAL_SENDGRID_API_KEY_HERE');
?>
```

**Replace `YOUR_ACTUAL_SENDGRID_API_KEY_HERE` with your real SendGrid API key**

### Step 4: Save and Exit
- Press `Ctrl + X`
- Press `Y` to confirm
- Press `Enter` to save

### Step 5: Set Proper Permissions
```bash
chmod 600 config.php
chown www-data:www-data config.php
```

## Done!

Your SendGrid integration is now active. The API key is:
- ✅ Stored securely on the server
- ✅ Never committed to GitHub
- ✅ Only readable by the web server

## Testing

Visit your homepage and try downloading a free PDF guide. You should:
1. See the download form
2. Enter your name and email
3. Receive the PDF download
4. See your contact added to SendGrid

## Troubleshooting

If downloads don't work:
1. Check that `config.php` exists in `/var/www/beaconmomentum.com/api/`
2. Verify your SendGrid API key is correct
3. Check PHP error logs: `tail -f /var/log/nginx/error.log`
