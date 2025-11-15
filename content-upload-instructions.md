# Content Upload Instructions

## Protected Content Directories Created

The following directories have been created on the server and are ready for content:

```
/var/www/beaconmomentum.com/public/
├── capital-suite/
├── solopreneur-launchpad/
├── rise-reclaim/
└── all-access/
```

## How to Upload Content

### Option 1: SCP (Secure Copy)

```bash
# Upload a single file
scp -r /path/to/file.pdf root@143.198.23.240:/var/www/beaconmomentum.com/public/capital-suite/

# Upload entire directory
scp -r /path/to/capital-suite-content/* root@143.198.23.240:/var/www/beaconmomentum.com/public/capital-suite/

# Examples for each product:
scp -r capital-suite-pdfs/* root@143.198.23.240:/var/www/beaconmomentum.com/public/capital-suite/
scp -r solopreneur-content/* root@143.198.23.240:/var/www/beaconmomentum.com/public/solopreneur-launchpad/
scp -r rise-reclaim-materials/* root@143.198.23.240:/var/www/beaconmomentum.com/public/rise-reclaim/
scp -r all-access-bonuses/* root@143.198.23.240:/var/www/beaconmomentum.com/public/all-access/
```

### Option 2: SFTP

```bash
sftp root@143.198.23.240
cd /var/www/beaconmomentum.com/public/capital-suite
put local-file.pdf
put -r local-directory/
```

### Option 3: FileZilla (GUI)

1. Host: `sftp://143.198.23.240`
2. Username: `root`
3. Password: `Beacon#Momentum@2025!Secure`
4. Port: `22`
5. Navigate to: `/var/www/beaconmomentum.com/public/`
6. Drag and drop files into the appropriate directories

## Content Organization Recommendations

### Capital Suite (`/capital-suite/`)

**Suggested structure:**
```
capital-suite/
├── index.html                    # Landing page for Capital Suite members
├── modules/
│   ├── module-1-defi-basics/
│   │   ├── lesson-1.pdf
│   │   ├── lesson-2.pdf
│   │   └── worksheet.pdf
│   ├── module-2-crypto-security/
│   └── module-3-investment-strategies/
├── resources/
│   ├── cheat-sheets/
│   ├── templates/
│   └── tools/
└── videos/
    └── video-links.html          # Vimeo private embeds
```

### Solopreneur Launchpad (`/solopreneur-launchpad/`)

**Suggested structure:**
```
solopreneur-launchpad/
├── index.html                    # Landing page
├── week-1-foundation/
├── week-2-business-model/
├── week-3-marketing/
├── week-4-systems/
├── templates/
│   ├── business-plan-template.pdf
│   ├── marketing-worksheet.pdf
│   └── financial-projections.xlsx
└── resources/
```

### Rise & Reclaim (`/rise-reclaim/`)

**Suggested structure:**
```
rise-reclaim/
├── index.html                    # Landing page
├── foundation/
│   ├── mindset-reset.pdf
│   ├── financial-assessment.pdf
│   └── goal-setting-workbook.pdf
├── essentials/
│   ├── debt-elimination-guide.pdf
│   ├── income-rebuilding.pdf
│   └── credit-repair-strategies.pdf
├── community/
│   └── forum-access.html
└── videos/
```

### All Access (`/all-access/`)

**Suggested structure:**
```
all-access/
├── index.html                    # Founding member welcome
├── bonuses/
│   ├── exclusive-training.pdf
│   ├── 1-on-1-call-scheduler.html
│   └── founding-member-perks.pdf
├── early-access/
│   └── beta-content/
└── community/
    └── founding-member-forum.html
```

## File Types Supported

- **PDFs**: Direct download or in-browser viewing
- **Videos**: Embed Vimeo private links (recommended) or upload MP4
- **Documents**: DOCX, XLSX, PPT (users will download)
- **HTML pages**: Custom landing pages for each section
- **Images**: JPG, PNG, WebP for visual content
- **Audio**: MP3 for audio lessons

## Vimeo Private Video Embedding

For videos, use Vimeo's privacy settings:

1. Upload video to Vimeo
2. Settings → Privacy → "Hide this video from Vimeo.com"
3. Enable domain-level privacy: "Only on beaconmomentum.com"
4. Get embed code
5. Create HTML file with embed:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Video Title</title>
    <script src="/dashboard-permissions.js"></script>
</head>
<body>
    <h1>Module 1: Introduction</h1>
    <div style="padding:56.25% 0 0 0;position:relative;">
        <iframe src="https://player.vimeo.com/video/YOUR_VIDEO_ID?h=PRIVACY_HASH" 
                style="position:absolute;top:0;left:0;width:100%;height:100%;" 
                frameborder="0" allow="autoplay; fullscreen" allowfullscreen>
        </iframe>
    </div>
    <script src="https://player.vimeo.com/api/player.js"></script>
</body>
</html>
```

## Creating Index Pages

Each directory should have an `index.html` that serves as the landing page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Capital Suite - Beacon Momentum</title>
    <link rel="stylesheet" href="/styles.css">
    <script src="/dashboard-permissions.js"></script>
</head>
<body>
    <header>
        <h1>Welcome to the Capital Suite</h1>
        <p>Your journey to financial sovereignty starts here.</p>
    </header>
    
    <main>
        <section class="modules">
            <h2>Training Modules</h2>
            <ul>
                <li><a href="/capital-suite/modules/module-1-defi-basics/">Module 1: DeFi Basics</a></li>
                <li><a href="/capital-suite/modules/module-2-crypto-security/">Module 2: Crypto Security</a></li>
                <li><a href="/capital-suite/modules/module-3-investment-strategies/">Module 3: Investment Strategies</a></li>
            </ul>
        </section>
        
        <section class="resources">
            <h2>Resources</h2>
            <ul>
                <li><a href="/capital-suite/resources/cheat-sheets/defi-glossary.pdf">DeFi Glossary</a></li>
                <li><a href="/capital-suite/resources/templates/wallet-setup-guide.pdf">Wallet Setup Guide</a></li>
            </ul>
        </section>
    </main>
    
    <footer>
        <a href="/member-dashboard.html">Back to Dashboard</a>
    </footer>
</body>
</html>
```

## Access Control

**The directories are already protected by the membership system!**

- Users must be logged in
- Users must have the appropriate membership level
- Access is automatically checked via the middleware

**No additional configuration needed** - just upload your content!

## Testing Access

After uploading content:

1. **Test as guest**: Try accessing `/capital-suite/` without login → Should redirect to login
2. **Test as member**: Login with Capital Suite membership → Should see content
3. **Test wrong level**: Login with Rise & Reclaim only → Should see "Upgrade Required"

## File Permissions

After uploading, ensure files are readable:

```bash
ssh root@143.198.23.240
cd /var/www/beaconmomentum.com/public
chmod -R 755 capital-suite solopreneur-launchpad rise-reclaim all-access
chmod -R 644 capital-suite/* solopreneur-launchpad/* rise-reclaim/* all-access/*
```

## Next Steps

1. **Organize your content locally** in matching directory structure
2. **Upload to server** using one of the methods above
3. **Create index.html pages** for each main directory
4. **Test access** with different membership levels
5. **Update member dashboard** to link to the new content areas

## Support

If you need help uploading or organizing content, just ask!
