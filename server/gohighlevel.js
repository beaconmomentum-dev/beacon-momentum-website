const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const membershipService = require('./membership');

const db = new sqlite3.Database(path.join(__dirname, '../database/beacon.db'));

/**
 * GoHighLevel Integration Service
 * Handles webhook events from GHL and syncs with Beacon database
 */

/**
 * Map GHL tags to membership levels
 */
const TAG_MEMBERSHIP_MAP = {
    'founding-member': {
        role: membershipService.ROLES.FOUNDING_MEMBER,
        membership_level: membershipService.MEMBERSHIP_LEVELS.ALL_ACCESS,
        plan_type: membershipService.PLAN_TYPES.LIFETIME
    },
    'capital-suite': {
        role: membershipService.ROLES.MEMBER,
        membership_level: membershipService.MEMBERSHIP_LEVELS.CAPITAL_SUITE,
        plan_type: membershipService.PLAN_TYPES.MONTHLY
    },
    'solopreneur-launchpad': {
        role: membershipService.ROLES.MEMBER,
        membership_level: membershipService.MEMBERSHIP_LEVELS.SOLOPRENEUR_LAUNCHPAD,
        plan_type: membershipService.PLAN_TYPES.MONTHLY
    },
    'rise-reclaim': {
        role: membershipService.ROLES.MEMBER,
        membership_level: membershipService.MEMBERSHIP_LEVELS.RISE_RECLAIM,
        plan_type: membershipService.PLAN_TYPES.MONTHLY
    },
    'all-access': {
        role: membershipService.ROLES.MEMBER,
        membership_level: membershipService.MEMBERSHIP_LEVELS.ALL_ACCESS,
        plan_type: membershipService.PLAN_TYPES.MONTHLY
    },
    'annual-member': {
        plan_type: membershipService.PLAN_TYPES.ANNUAL
    },
    'lifetime-member': {
        plan_type: membershipService.PLAN_TYPES.LIFETIME
    }
};

/**
 * Find user by email
 */
function findUserByEmail(email) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM users WHERE email = ?',
            [email.toLowerCase()],
            (err, row) => err ? reject(err) : resolve(row)
        );
    });
}

/**
 * Find user by GHL contact ID
 */
function findUserByGHLContactId(contactId) {
    return new Promise((resolve, reject) => {
        db.get(
            'SELECT * FROM users WHERE ghl_contact_id = ?',
            [contactId],
            (err, row) => err ? reject(err) : resolve(row)
        );
    });
}

/**
 * Create user from GHL contact
 */
function createUserFromGHLContact(contactData) {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO users (
                email, first_name, last_name, ghl_contact_id, 
                ghl_tags, is_verified, password_hash
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        
        // Generate a temporary password hash (user will need to reset)
        const tempPasswordHash = '$2b$10$TEMP_HASH_USER_MUST_RESET_PASSWORD';
        
        db.run(sql, [
            contactData.email.toLowerCase(),
            contactData.firstName || '',
            contactData.lastName || '',
            contactData.contactId,
            JSON.stringify(contactData.tags || []),
            1, // Auto-verify GHL contacts
            tempPasswordHash
        ], function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID });
        });
    });
}

/**
 * Update user's GHL data
 */
function updateUserGHLData(userId, ghlData) {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE users 
            SET ghl_contact_id = ?,
                ghl_tags = ?,
                first_name = COALESCE(?, first_name),
                last_name = COALESCE(?, last_name)
            WHERE id = ?
        `;
        
        db.run(sql, [
            ghlData.contactId,
            JSON.stringify(ghlData.tags || []),
            ghlData.firstName,
            ghlData.lastName,
            userId
        ], function(err) {
            err ? reject(err) : resolve({ changes: this.changes });
        });
    });
}

/**
 * Process GHL tags and assign membership
 */
async function processTagsAndAssignMembership(userId, tags) {
    if (!tags || tags.length === 0) {
        console.log('ℹ️ No tags to process');
        return;
    }
    
    console.log(`🏷️ Processing tags for user ${userId}:`, tags);
    
    let membershipData = {
        is_member: 0,
        membership_status: membershipService.MEMBERSHIP_STATUS.INACTIVE,
        role: membershipService.ROLES.GUEST,
        membership_level: membershipService.MEMBERSHIP_LEVELS.FREE,
        plan_type: membershipService.PLAN_TYPES.FREE
    };
    
    // Process each tag
    for (const tag of tags) {
        const tagLower = tag.toLowerCase().trim();
        const mapping = TAG_MEMBERSHIP_MAP[tagLower];
        
        if (mapping) {
            console.log(`✅ Tag matched: ${tagLower} →`, mapping);
            
            // Update membership data with highest level found
            if (mapping.role) {
                membershipData.role = mapping.role;
                membershipData.is_member = 1;
                membershipData.membership_status = membershipService.MEMBERSHIP_STATUS.ACTIVE;
            }
            if (mapping.membership_level) {
                membershipData.membership_level = mapping.membership_level;
            }
            if (mapping.plan_type) {
                membershipData.plan_type = mapping.plan_type;
            }
        }
    }
    
    // Set membership dates if active
    if (membershipData.is_member) {
        membershipData.membership_started_at = new Date().toISOString();
        
        // Set expiration based on plan type
        if (membershipData.plan_type === membershipService.PLAN_TYPES.MONTHLY) {
            const expiresAt = new Date();
            expiresAt.setMonth(expiresAt.getMonth() + 1);
            membershipData.membership_expires_at = expiresAt.toISOString();
        } else if (membershipData.plan_type === membershipService.PLAN_TYPES.ANNUAL) {
            const expiresAt = new Date();
            expiresAt.setFullYear(expiresAt.getFullYear() + 1);
            membershipData.membership_expires_at = expiresAt.toISOString();
        } else if (membershipData.plan_type === membershipService.PLAN_TYPES.LIFETIME) {
            membershipData.membership_expires_at = null;
        }
    }
    
    // Update user membership
    await membershipService.updateMembership(userId, membershipData);
    
    console.log(`✅ Membership assigned to user ${userId}:`, membershipData);
    
    return membershipData;
}

/**
 * Handle GHL form submission webhook
 */
async function handleFormSubmission(webhookData) {
    try {
        const { contact, form } = webhookData;
        
        if (!contact || !contact.email) {
            throw new Error('Invalid webhook data: missing contact email');
        }
        
        console.log(`📝 GHL form submission: ${form?.name || 'Unknown'} from ${contact.email}`);
        
        // Check if user exists
        let user = await findUserByEmail(contact.email);
        
        if (!user) {
            // Create new user
            console.log(`➕ Creating new user from GHL: ${contact.email}`);
            const result = await createUserFromGHLContact({
                email: contact.email,
                firstName: contact.firstName,
                lastName: contact.lastName,
                contactId: contact.id,
                tags: contact.tags
            });
            user = { id: result.id };
        } else {
            // Update existing user
            console.log(`🔄 Updating existing user: ${contact.email}`);
            await updateUserGHLData(user.id, {
                contactId: contact.id,
                firstName: contact.firstName,
                lastName: contact.lastName,
                tags: contact.tags
            });
        }
        
        // Process tags and assign membership
        if (contact.tags && contact.tags.length > 0) {
            await processTagsAndAssignMembership(user.id, contact.tags);
        }
        
        return {
            success: true,
            userId: user.id,
            message: 'Contact processed successfully'
        };
    } catch (err) {
        console.error('❌ GHL form submission error:', err);
        throw err;
    }
}

/**
 * Handle GHL tag added webhook
 */
async function handleTagAdded(webhookData) {
    try {
        const { contact, tag } = webhookData;
        
        if (!contact || !contact.email) {
            throw new Error('Invalid webhook data: missing contact email');
        }
        
        console.log(`🏷️ Tag added to ${contact.email}: ${tag}`);
        
        // Find user
        let user = await findUserByEmail(contact.email);
        
        if (!user) {
            console.log(`⚠️ User not found, creating from GHL: ${contact.email}`);
            const result = await createUserFromGHLContact({
                email: contact.email,
                firstName: contact.firstName,
                lastName: contact.lastName,
                contactId: contact.id,
                tags: contact.tags
            });
            user = { id: result.id };
        }
        
        // Update tags
        await updateUserGHLData(user.id, {
            contactId: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            tags: contact.tags
        });
        
        // Process tags and assign membership
        await processTagsAndAssignMembership(user.id, contact.tags);
        
        return {
            success: true,
            userId: user.id,
            message: 'Tag processed successfully'
        };
    } catch (err) {
        console.error('❌ GHL tag added error:', err);
        throw err;
    }
}

/**
 * Handle GHL contact updated webhook
 */
async function handleContactUpdated(webhookData) {
    try {
        const { contact } = webhookData;
        
        if (!contact || !contact.email) {
            throw new Error('Invalid webhook data: missing contact email');
        }
        
        console.log(`🔄 Contact updated: ${contact.email}`);
        
        // Find user
        let user = await findUserByEmail(contact.email);
        
        if (!user) {
            // Create if doesn't exist
            const result = await createUserFromGHLContact({
                email: contact.email,
                firstName: contact.firstName,
                lastName: contact.lastName,
                contactId: contact.id,
                tags: contact.tags
            });
            user = { id: result.id };
        } else {
            // Update existing
            await updateUserGHLData(user.id, {
                contactId: contact.id,
                firstName: contact.firstName,
                lastName: contact.lastName,
                tags: contact.tags
            });
        }
        
        // Process tags
        if (contact.tags && contact.tags.length > 0) {
            await processTagsAndAssignMembership(user.id, contact.tags);
        }
        
        return {
            success: true,
            userId: user.id,
            message: 'Contact updated successfully'
        };
    } catch (err) {
        console.error('❌ GHL contact updated error:', err);
        throw err;
    }
}

module.exports = {
    TAG_MEMBERSHIP_MAP,
    findUserByEmail,
    findUserByGHLContactId,
    createUserFromGHLContact,
    updateUserGHLData,
    processTagsAndAssignMembership,
    handleFormSubmission,
    handleTagAdded,
    handleContactUpdated
};
