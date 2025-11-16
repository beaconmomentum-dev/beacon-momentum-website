/**
 * Dashboard Permissions and Gatekeeping Logic
 * Handles role-based visibility and access control on the member dashboard
 */

// Fetch user permissions on page load
async function loadUserPermissions() {
    try {
        const response = await fetch('/api/membership/permissions', {
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
            applyPermissions(data.permissions);
            return data.permissions;
        } else {
            console.error('Failed to load permissions');
            return null;
        }
    } catch (err) {
        console.error('Error loading permissions:', err);
        return null;
    }
}

// Apply permissions to dashboard UI
function applyPermissions(permissions) {
    console.log('🔐 Applying permissions:', permissions);
    
    // Show/hide Capital Suite access
    const capitalSuiteSection = document.getElementById('capital-suite-section');
    if (capitalSuiteSection) {
        if (permissions.canAccessCapitalSuite) {
            capitalSuiteSection.style.display = 'block';
            capitalSuiteSection.classList.remove('locked');
        } else {
            capitalSuiteSection.style.display = 'block';
            capitalSuiteSection.classList.add('locked');
            addUpgradePrompt(capitalSuiteSection, 'Capital Suite');
        }
    }
    
    // Show/hide Solopreneur Launchpad access
    const solopreneurSection = document.getElementById('solopreneur-section');
    if (solopreneurSection) {
        if (permissions.canAccessSolopreneurLaunchpad) {
            solopreneurSection.style.display = 'block';
            solopreneurSection.classList.remove('locked');
        } else {
            solopreneurSection.style.display = 'block';
            solopreneurSection.classList.add('locked');
            addUpgradePrompt(solopreneurSection, 'Solopreneur Launchpad');
        }
    }
    
    // Show/hide Rise & Reclaim access
    const riseReclaimSection = document.getElementById('rise-reclaim-section');
    if (riseReclaimSection) {
        if (permissions.canAccessRiseReclaim) {
            riseReclaimSection.style.display = 'block';
            riseReclaimSection.classList.remove('locked');
        } else {
            riseReclaimSection.style.display = 'block';
            riseReclaimSection.classList.add('locked');
            addUpgradePrompt(riseReclaimSection, 'Rise & Reclaim');
        }
    }
    
    // Digital Grandpa is always accessible
    const digitalGrandpaSection = document.getElementById('digital-grandpa-section');
    if (digitalGrandpaSection) {
        digitalGrandpaSection.style.display = 'block';
        digitalGrandpaSection.classList.remove('locked');
    }
    
    // Show founding member badge
    if (permissions.isFoundingMember) {
        showFoundingMemberBadge();
    }
    
    // Update membership level display
    updateMembershipDisplay(permissions);
}

// Add upgrade prompt to locked sections
function addUpgradePrompt(section, productName) {
    // Check if prompt already exists
    if (section.querySelector('.upgrade-prompt')) {
        return;
    }
    
    const prompt = document.createElement('div');
    prompt.className = 'upgrade-prompt';
    prompt.innerHTML = `
        <div class="locked-overlay">
            <div class="lock-icon">🔒</div>
            <h3>Unlock ${productName}</h3>
            <p>Upgrade your membership to access this content</p>
            <a href="/upgrade.html" class="upgrade-button">Upgrade Now</a>
        </div>
    `;
    
    // Make section semi-transparent
    section.style.opacity = '0.6';
    section.style.position = 'relative';
    
    // Add overlay
    section.appendChild(prompt);
    
    // Disable all links in the section
    const links = section.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/upgrade.html';
        });
    });
}

// Show founding member badge
function showFoundingMemberBadge() {
    const badge = document.createElement('div');
    badge.className = 'founding-member-badge';
    badge.innerHTML = '⭐ Founding Member';
    badge.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        color: #000;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: bold;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
        z-index: 1000;
    `;
    
    document.body.appendChild(badge);
}

// Update membership level display
function updateMembershipDisplay(permissions) {
    const membershipDisplay = document.getElementById('membership-level-display');
    if (membershipDisplay) {
        const levelNames = {
            'free': 'Free Member',
            'capital_suite': 'Capital Suite Member',
            'solopreneur_launchpad': 'Solopreneur Member',
            'rise_reclaim': 'Rise & Reclaim Member',
            'all_access': 'All Access Member'
        };
        
        const levelName = levelNames[permissions.membershipLevel] || 'Member';
        membershipDisplay.textContent = levelName;
    }
}

// Check access before navigating to protected content
function checkAccessBeforeNavigate(requiredPermission, targetUrl) {
    return async function(e) {
        e.preventDefault();
        
        const permissions = await loadUserPermissions();
        
        if (!permissions) {
            window.location.href = '/login.html';
            return;
        }
        
        if (permissions[requiredPermission]) {
            window.location.href = targetUrl;
        } else {
            window.location.href = '/upgrade.html';
        }
    };
}

// Initialize dashboard permissions on page load
document.addEventListener('DOMContentLoaded', async () => {
    console.log('📊 Loading dashboard permissions...');
    
    const permissions = await loadUserPermissions();
    
    if (!permissions) {
        console.error('Failed to load permissions, redirecting to login');
        window.location.href = '/login.html';
        return;
    }
    
    console.log('✅ Permissions loaded successfully');
    
    // Attach click handlers to protected links
    const capitalSuiteLinks = document.querySelectorAll('[data-requires="canAccessCapitalSuite"]');
    capitalSuiteLinks.forEach(link => {
        link.addEventListener('click', checkAccessBeforeNavigate('canAccessCapitalSuite', link.href));
    });
    
    const solopreneurLinks = document.querySelectorAll('[data-requires="canAccessSolopreneurLaunchpad"]');
    solopreneurLinks.forEach(link => {
        link.addEventListener('click', checkAccessBeforeNavigate('canAccessSolopreneurLaunchpad', link.href));
    });
    
    const riseReclaimLinks = document.querySelectorAll('[data-requires="canAccessRiseReclaim"]');
    riseReclaimLinks.forEach(link => {
        link.addEventListener('click', checkAccessBeforeNavigate('canAccessRiseReclaim', link.href));
    });
});

// CSS for locked sections
const style = document.createElement('style');
style.textContent = `
    .locked {
        pointer-events: none;
    }
    
    .upgrade-prompt {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(2px);
        border-radius: 8px;
        pointer-events: all;
    }
    
    .locked-overlay {
        text-align: center;
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        max-width: 300px;
    }
    
    .lock-icon {
        font-size: 48px;
        margin-bottom: 16px;
    }
    
    .locked-overlay h3 {
        margin: 0 0 12px 0;
        color: #333;
        font-size: 20px;
    }
    
    .locked-overlay p {
        margin: 0 0 20px 0;
        color: #666;
        font-size: 14px;
    }
    
    .upgrade-button {
        display: inline-block;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        transition: transform 0.2s;
    }
    
    .upgrade-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
`;
document.head.appendChild(style);
