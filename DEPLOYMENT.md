# Beacon Momentum Deployment Guide

## Automatic Deployment

This repository is configured for automatic deployment to production on every push to `main` branch.

### How It Works

1. **Push to main** - Any commit pushed to the `main` branch triggers deployment
2. **GitHub Actions** - Workflow runs automatically (`.github/workflows/deploy.yml`)
3. **Deploy to server** - Files are synced to production server
4. **Notification** - Success/failure notification sent

### Manual Deployment

To manually trigger deployment:

```bash
# Via GitHub UI
Go to Actions → Deploy to Production → Run workflow

# Via git push
git push origin main
```

### Deployment Checklist

Before pushing to production:

- [ ] Test changes locally
- [ ] Update version number (if applicable)
- [ ] Review git diff
- [ ] Commit with descriptive message
- [ ] Push to main branch
- [ ] Monitor GitHub Actions for success

### Rollback Procedure

If deployment fails or introduces issues:

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

### Server Configuration

Production server details (stored in GitHub Secrets):

- `SERVER_HOST` - Production server hostname
- `SERVER_USER` - SSH user for deployment
- `DEPLOY_KEY` - SSH private key for authentication

### Monitoring

- **GitHub Actions** - Check workflow status at github.com/beaconmomentum-dev/beacon-momentum-website/actions
- **Production site** - Monitor at https://beaconmomentum.com
- **Logs** - Check deployment logs in GitHub Actions output

### Support

For deployment issues, contact the development team.
