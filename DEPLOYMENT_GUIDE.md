# Beacon Momentum Website - GitHub Deployment Guide

**Last Updated:** October 31, 2025  
**Repository:** https://github.com/beaconmomentum-dev/beacon-momentum-website  
**Live Site:** https://beaconmomentum.com  
**App Platform Dashboard:** https://cloud.digitalocean.com/apps/5c8e109b-5db4-4557-8f9e-f6bb2f7dc11c

---

## Overview

The Beacon Momentum website is now deployed using **GitHub + DigitalOcean App Platform** integration, providing automated deployments, version control, change history, and one-click rollback capabilities.

### Key Benefits

**Version Control** - Every change is tracked with detailed commit messages, timestamps, and author information. You can see exactly what changed, when, and why.

**Automated Deployments** - When code is pushed to the GitHub repository (main branch), DigitalOcean automatically detects the change, pulls the latest code, and deploys it to the live site within 1-2 minutes.

**One-Click Rollback** - If a deployment introduces issues, you can instantly roll back to any previous version through the DigitalOcean dashboard.

**AI Assistant Integration** - AI assistants (like Manus) can make updates to the website by committing changes to the GitHub repository, which is safer and more traceable than direct SSH access.

**Collaboration Ready** - Multiple people can work on the website simultaneously through GitHub permissions without sharing SSH credentials.

**Disaster Recovery** - Your entire website is backed up in GitHub. If the DigitalOcean infrastructure fails, you can redeploy to a new server in minutes.

---

## Repository Structure

```
beacon-momentum-website/
├── index.html                      # Enhanced homepage
├── labs.html                       # Beacon Labs page
├── digital-grandpa.html           # Digital Grandpa division page
├── rise-reclaim.html              # Rise & Reclaim landing page
├── images/                        # All image assets
│   ├── bob-burr-professional-photo.jpeg
│   ├── digital-grandpa-icon.png
│   ├── rise-reclaim-icon.png
│   ├── beacon-labs-icon.png
│   ├── favicon.png
│   └── [13 brand logo files]
├── README.md                      # Project documentation
├── CHANGELOG.md                   # Version history
├── DEPLOYMENT_GUIDE.md           # This file
└── .gitignore                    # Git ignore rules
```

---

## How Automated Deployment Works

### The Workflow

1. **Make Changes** - Edit HTML files, add images, or update content
2. **Commit to GitHub** - Commit changes with descriptive message
3. **Push to Main Branch** - Push commits to the `main` branch
4. **Automatic Deployment** - DigitalOcean detects the commit and deploys automatically
5. **Verification** - Changes appear on the live site within 1-2 minutes

### Behind the Scenes

When you push to GitHub, DigitalOcean App Platform:
- Detects the new commit via GitHub webhook
- Pulls the latest code from the repository
- Builds the static site (no build step needed for pure HTML)
- Deploys to the production environment
- Updates the live site at beaconmomentum.com
- Sends deployment notifications (if configured)

---

## Making Updates to the Website

### Method 1: Direct GitHub Web Interface (Easiest)

For small text changes or single-file updates:

1. Go to https://github.com/beaconmomentum-dev/beacon-momentum-website
2. Navigate to the file you want to edit (e.g., `index.html`)
3. Click the pencil icon (Edit this file)
4. Make your changes
5. Scroll down to "Commit changes"
6. Add a descriptive commit message (e.g., "Update contact email address")
7. Click "Commit changes"
8. Wait 1-2 minutes for automatic deployment

### Method 2: AI Assistant (Recommended for Complex Changes)

Ask an AI assistant (like Manus) to make updates:

**Example Request:**
> "Update the Beacon Momentum homepage to change the Rise & Reclaim description to emphasize our new skills training program"

The AI will:
- Clone the repository
- Make the requested changes
- Commit with descriptive message
- Push to GitHub
- Verify deployment

### Method 3: Local Development (For Advanced Users)

If you're comfortable with Git and command line:

```bash
# Clone the repository
git clone https://github.com/beaconmomentum-dev/beacon-momentum-website.git
cd beacon-momentum-website

# Make your changes
# Edit files using your preferred editor

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Describe your changes here"

# Push to GitHub (triggers automatic deployment)
git push origin main

# Wait 1-2 minutes for deployment
```

---

## Rollback Procedure

If a deployment causes issues, you can instantly roll back:

### Via DigitalOcean Dashboard

1. Go to https://cloud.digitalocean.com/apps/5c8e109b-5db4-4557-8f9e-f6bb2f7dc11c
2. Click on the "Deployments" tab
3. Find the last working deployment in the history
4. Click the three dots (...) next to that deployment
5. Select "Redeploy"
6. Confirm the redeployment
7. Wait 1-2 minutes for rollback to complete

### Via GitHub (Alternative)

1. Go to https://github.com/beaconmomentum-dev/beacon-momentum-website/commits/main
2. Find the last working commit
3. Click on the commit hash
4. Click "Browse files" button
5. Click "Code" → "Download ZIP"
6. Extract and upload files via GitHub web interface

---

## Monitoring Deployments

### Check Deployment Status

**Via DigitalOcean Dashboard:**
- Visit https://cloud.digitalocean.com/apps/5c8e109b-5db4-4557-8f9e-f6bb2f7dc11c
- View current deployment status
- See deployment history
- Check build logs if needed

**Via Live Site:**
- Visit https://beaconmomentum.com
- Verify changes are visible
- Test functionality

### Deployment Timeline

- **Commit Detected:** Immediate (GitHub webhook)
- **Build Start:** Within 10 seconds
- **Build Complete:** 30-60 seconds (static site)
- **Deployment Complete:** 1-2 minutes total
- **Live Site Updated:** Immediate after deployment

---

## Common Tasks

### Adding a New Page

1. Create new HTML file (e.g., `new-page.html`)
2. Follow existing page structure and design
3. Add navigation links in other pages
4. Commit and push to GitHub
5. Deployment happens automatically

### Updating Images

1. Add new images to `images/` directory
2. Update HTML to reference new images
3. Commit and push to GitHub
4. Images deploy automatically with HTML

### Changing Content

1. Edit the relevant HTML file
2. Update text, links, or structure
3. Commit with descriptive message
4. Push to GitHub
5. Verify changes on live site

### Updating Bob's Photo

1. Replace `images/bob-burr-professional-photo.jpeg`
2. Commit and push to GitHub
3. Photo updates automatically

---

## Best Practices

### Commit Messages

Write clear, descriptive commit messages:

**Good Examples:**
- "Update Rise & Reclaim joining instructions to include new intake form"
- "Add testimonials section to homepage"
- "Fix broken link in Beacon Labs CTA button"
- "Replace Digital Grandpa icon with updated version"

**Bad Examples:**
- "Update"
- "Fix stuff"
- "Changes"

### Testing Before Deployment

For major changes:
1. Create a `staging` branch
2. Make changes in staging branch
3. Test thoroughly
4. Merge to `main` when ready
5. Automatic deployment to production

### Backup Strategy

GitHub serves as your primary backup, but you can also:
- Download repository ZIP periodically
- Keep local clone on your computer
- Use DigitalOcean's built-in backup features

---

## Troubleshooting

### Deployment Failed

**Check Build Logs:**
1. Go to App Platform dashboard
2. Click on failed deployment
3. View build logs for errors
4. Fix errors and push again

**Common Issues:**
- Invalid HTML syntax
- Missing image files
- Broken file references

### Changes Not Appearing

**Wait 2-3 Minutes:**
- Deployments take 1-2 minutes
- Clear browser cache (Ctrl+F5)
- Check in incognito mode

**Verify Deployment:**
- Check DigitalOcean dashboard
- Confirm deployment completed successfully
- Check GitHub commit history

### Need to Revert Quickly

**Emergency Rollback:**
1. Go to DigitalOcean dashboard
2. Find last working deployment
3. Click "Redeploy"
4. Site reverts in 1-2 minutes

---

## Access Information

### GitHub Repository
- **URL:** https://github.com/beaconmomentum-dev/beacon-momentum-website
- **Account:** beaconmomentum-dev
- **Visibility:** Public

### DigitalOcean App Platform
- **App ID:** 5c8e109b-5db4-4557-8f9e-f6bb2f7dc11c
- **Dashboard:** https://cloud.digitalocean.com/apps/5c8e109b-5db4-4557-8f9e-f6bb2f7dc11c
- **Region:** NYC (New York)
- **Type:** Static Site

### Live URLs
- **Primary:** https://beaconmomentum.com
- **WWW:** https://www.beaconmomentum.com
- **Default Ingress:** https://beacon-momentum-website-nn7k6.ondigitalocean.app

---

## Future Enhancements

### Planned Features

**Automatic Testing** - Set up automated tests to catch errors before deployment

**Staging Environment** - Create separate staging URL for testing changes

**Custom Domain SSL** - Ensure SSL certificate is properly configured for beaconmomentum.com

**Performance Monitoring** - Set up monitoring for page load times and uptime

**Deployment Notifications** - Configure email/Slack notifications for deployments

### Potential Improvements

**CI/CD Pipeline** - Add GitHub Actions for automated testing and deployment

**Image Optimization** - Automatically compress images during deployment

**Multi-Environment Setup** - Separate development, staging, and production environments

**Automated Backups** - Schedule regular backups beyond Git version control

---

## Support & Contact

### For Website Updates
- **AI Assistant:** Ask Manus or similar AI to make changes via GitHub
- **Direct Edit:** Use GitHub web interface for simple changes
- **Technical Help:** Contact DigitalOcean support for infrastructure issues

### For Emergency Issues
1. Check DigitalOcean status page: https://status.digitalocean.com
2. Review deployment logs in App Platform dashboard
3. Roll back to last working version if needed
4. Contact support if infrastructure issue

---

## Deployment History

### v3.1.1 - October 31, 2025
- Added all image assets (Bob's photo, division icons, brand logos)
- Updated HTML to reference images from images/ directory
- Configured GitHub integration with DigitalOcean App Platform
- Tested automated deployment pipeline
- Verified all images displaying correctly on live site

### v3.1.0 - October 31, 2025
- Enhanced homepage with professional custom icons
- Added Bob Burr's photo with verified veteran badge
- Implemented v3.1 brand compliance
- Created step-by-step joining instructions
- Added functional modal CTAs
- Deployed impact metrics section

---

## Conclusion

The GitHub + DigitalOcean App Platform integration provides a professional, reliable, and scalable deployment workflow for the Beacon Momentum website. This setup enables:

- **Rapid Updates** - Changes deploy in minutes
- **Safe Experimentation** - Easy rollback if needed
- **Team Collaboration** - Multiple contributors via GitHub
- **AI Integration** - Automated updates via AI assistants
- **Professional Standards** - Industry-standard version control and deployment

The website is now positioned for sustainable growth and ongoing enhancement while maintaining professional reliability and transparency.

---

**Lighting the Way Forward** 🔥

