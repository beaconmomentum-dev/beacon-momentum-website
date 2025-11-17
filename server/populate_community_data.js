const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'beacon.db');
const db = new sqlite3.Database(dbPath);

console.log('🏘️  Creating sample community data...\n');

// Get or create a default user
db.get("SELECT id FROM users LIMIT 1", [], (err, user) => {
    if (err) {
        console.error('❌ Error querying users:', err.message);
        db.close();
        return;
    }

    let userId;
    
    if (!user) {
        // Create a default user for testing
        db.run(`INSERT INTO users (email, name, membership_tier, created_at) VALUES ('demo@beaconmomentum.com', 'Demo User', 'founding_member', datetime('now'))`, function(err) {
            if (err) {
                console.error('❌ Error creating user:', err.message);
                db.close();
                return;
            }
            userId = this.lastID;
            console.log(`✅ Created demo user (ID: ${userId})\n`);
            createCommunityData(userId);
        });
    } else {
        userId = user.id;
        console.log(`✅ Using existing user ID: ${userId}\n`);
        createCommunityData(userId);
    }
});

function createCommunityData(userId) {

    // Sample community data
    const spaces = [
        {
            title: 'General Discussion',
            slug: 'general-discussion',
            description: 'A welcoming space for all members to connect, share experiences, and support each other on their transformation journey.',
            required_tier: 'core'
        },
        {
            title: 'Phoenix Moments',
            slug: 'phoenix-moments',
            description: 'Share your Phoenix Moment story and hear from others who have risen from their ashes. This is a safe space for vulnerability and growth.',
            required_tier: 'core'
        },
        {
            title: 'Founding Members Lounge',
            slug: 'founding-members-lounge',
            description: 'An exclusive space for Founding Members to connect, collaborate, and shape the future of the Beacon Momentum community.',
            required_tier: 'founding_member'
        }
    ];

    const postsBySpace = {
        'general-discussion': [
            {
                title: 'Welcome to the Community!',
                content: 'Hello everyone! I\'m so excited to be part of this community. I\'ve been working through the Rise & Reclaim Foundations course and it\'s already making such a difference in my life.\n\nI\'m curious - what brought each of you here? What are you hoping to gain from this community?\n\nLooking forward to connecting with all of you!'
            },
            {
                title: 'How do you practice self-compassion?',
                content: 'I\'m struggling with being kind to myself during this transformation process. I keep beating myself up for not being "further along" or for having setbacks.\n\nHow do you all practice self-compassion? What helps you be gentle with yourself when things get hard?'
            },
            {
                title: 'Celebrating small wins',
                content: 'Today I made my bed, drank water first thing, and took a 10-minute walk. These might seem like tiny things, but a month ago I couldn\'t even get out of bed most days.\n\nThe Little Things Guide has been a game-changer for me. What small wins are you celebrating today?'
            },
            {
                title: 'Resources that have helped you?',
                content: 'Beyond the Beacon Momentum materials, what other books, podcasts, or resources have been helpful on your journey?\n\nI\'m looking for recommendations on trauma healing, building resilience, and creating sustainable change.'
            },
            {
                title: 'Accountability partners?',
                content: 'Would anyone be interested in being accountability partners? I\'m working through the Next Chapter Guide and would love to check in with someone weekly to share progress and support each other.\n\nLet me know if you\'re interested!'
            }
        ],
        'phoenix-moments': [
            {
                title: 'My Phoenix Moment: Losing Everything',
                content: 'Two years ago, I lost my job, my relationship ended, and I had to move back in with my parents at 35. I felt like a complete failure.\n\nBut looking back now, that rock bottom moment was exactly what I needed. It forced me to confront who I really was and what I actually wanted from life.\n\nI\'m still rebuilding, but I\'m building something authentic this time. Something that\'s actually mine.\n\nIf you\'re in the fire right now, know that it won\'t last forever. And what comes after might surprise you.'
            },
            {
                title: 'The day I chose myself',
                content: 'My Phoenix Moment wasn\'t dramatic. It was quiet.\n\nIt was the day I finally said "no" to someone who had been taking advantage of me for years. It was terrifying. I thought they\'d hate me. I thought I\'d lose them.\n\nBut what I actually lost was the version of myself who believed I had to sacrifice my own wellbeing to be loved.\n\nThat was three months ago. I\'m still learning what it means to choose myself, but I\'m getting better at it every day.'
            },
            {
                title: 'Rising from health crisis',
                content: 'Last year I was diagnosed with a chronic illness that changed everything. I couldn\'t work, couldn\'t do the things I loved, couldn\'t be the person I thought I was.\n\nThe grief was overwhelming. I mourned the life I thought I\'d have, the person I thought I\'d be.\n\nBut slowly, I\'m discovering a new way of being. One that\'s gentler, more present, more connected to what actually matters.\n\nMy Phoenix Moment taught me that sometimes losing everything means gaining yourself.'
            },
            {
                title: 'Financial rock bottom',
                content: 'I filed for bankruptcy six months ago. It was humiliating and terrifying.\n\nBut it also freed me from years of shame and denial. I finally had to face my relationship with money, my spending patterns, my fear of scarcity.\n\nNow I\'m rebuilding from zero, but this time with awareness and intention. I\'m learning that financial recovery is as much about healing your relationship with yourself as it is about the numbers.\n\nAnyone else been through financial crisis? How did you rebuild?'
            },
            {
                title: 'The Phoenix Moment I didn\'t see coming',
                content: 'I thought my Phoenix Moment would be obvious - a big dramatic event that changed everything.\n\nBut mine was subtle. It was a series of small realizations, tiny shifts in perspective, moments of clarity that built on each other.\n\nOne day I woke up and realized I was different. I was thinking differently, feeling differently, showing up differently.\n\nThe transformation happened so gradually I almost missed it.\n\nHas anyone else experienced this kind of quiet, gradual Phoenix Moment?'
            }
        ],
        'founding-members-lounge': [
            {
                title: 'What features would you like to see?',
                content: 'As Founding Members, we have a unique opportunity to shape the future of this community.\n\nWhat features, resources, or programs would you like to see added to Beacon Momentum?\n\nI\'ll start: I\'d love to see a mentorship program where Founding Members can support newer members on their journey.'
            },
            {
                title: 'Monthly Founding Member Call - Topics?',
                content: 'Our first Founding Member call is coming up! What topics would you like to discuss?\n\nSome ideas:\n- Deep dive into specific transformation challenges\n- Guest speakers on related topics\n- Collaborative projects we could work on together\n- Building the community culture\n\nWhat sounds most valuable to you?'
            },
            {
                title: 'Introducing myself',
                content: 'Hi everyone! I\'m so honored to be a Founding Member.\n\nA bit about me: I\'m a 42-year-old entrepreneur who went through a major life transition last year. Lost my business, ended a long-term relationship, and had to completely rebuild.\n\nI found Beacon Momentum at exactly the right time. The Rise & Reclaim philosophy resonates deeply with where I am in my journey.\n\nI\'m excited to connect with all of you and build something meaningful together.\n\nWho else wants to introduce themselves?'
            },
            {
                title: 'Collaboration opportunity',
                content: 'I\'m working on a project related to transformation and resilience, and I\'m looking for collaborators.\n\nWould any Founding Members be interested in co-creating content, hosting workshops, or developing resources for the community?\n\nI believe we have so much collective wisdom and experience to share. Let\'s use it to help others on their journey.'
            },
            {
                title: 'Thank you for building this with us',
                content: 'I just want to say how grateful I am to be part of this founding group.\n\nThere\'s something special about being here at the beginning, helping to shape what this community becomes.\n\nThank you to everyone who\'s contributing, sharing, and showing up. We\'re building something important here.\n\nHere\'s to rising together. 🔥'
            }
        ]
    };

    // Insert spaces and posts
    let spacesCreated = 0;
    let postsCreated = 0;
    let commentsCreated = 0;

    spaces.forEach((space, spaceIndex) => {
        db.run(`
            INSERT INTO community_spaces (title, slug, description, required_tier, created_at)
            VALUES (?, ?, ?, ?, datetime('now'))
        `, [space.title, space.slug, space.description, space.required_tier], function(err) {
            if (err) {
                console.error(`❌ Error creating space "${space.title}":`, err.message);
                return;
            }

            const spaceId = this.lastID;
            spacesCreated++;
            console.log(`✅ Created space: "${space.title}" (ID: ${spaceId})`);

            // Insert posts for this space
            const posts = postsBySpace[space.slug] || [];
            posts.forEach((post, postIndex) => {
                db.run(`
                    INSERT INTO community_posts (user_id, title, content, category, created_at)
                    VALUES (?, ?, ?, ?, datetime('now', '-' || ? || ' days'))
                `, [userId, post.title, post.content, space.slug, postIndex * 2], function(err) {
                    if (err) {
                        console.error(`  ❌ Error creating post "${post.title}":`, err.message);
                        return;
                    }

                    const postId = this.lastID;
                    postsCreated++;
                    console.log(`  ✅ Created post: "${post.title}" (ID: ${postId})`);

                    // Add 1-3 comments to each post
                    const commentCount = Math.floor(Math.random() * 3) + 1;
                    const comments = [
                        'Thank you for sharing this. Your story really resonates with me.',
                        'I\'m going through something similar right now. This gives me hope.',
                        'This is so powerful. Thank you for being vulnerable and sharing your journey.',
                        'I needed to read this today. Thank you.',
                        'Your courage in sharing this is inspiring. Wishing you continued strength.',
                        'This really speaks to where I am right now. Thank you for putting it into words.'
                    ];

                    for (let i = 0; i < commentCount; i++) {
                        const commentContent = comments[Math.floor(Math.random() * comments.length)];
                        db.run(`
                            INSERT INTO community_comments (post_id, user_id, content, created_at)
                            VALUES (?, ?, ?, datetime('now', '-' || ? || ' hours'))
                        `, [postId, userId, commentContent, i * 6], function(err) {
                            if (err) {
                                console.error(`    ❌ Error creating comment:`, err.message);
                                return;
                            }
                            commentsCreated++;
                            console.log(`    ✅ Added comment to post ${postId}`);

                            // Check if we're done
                            if (spacesCreated === spaces.length && 
                                postsCreated === Object.values(postsBySpace).flat().length &&
                                commentsCreated >= postsCreated) {
                                console.log('\n🎉 Sample community data created successfully!');
                                console.log(`\nSummary:`);
                                console.log(`- ${spacesCreated} community spaces created`);
                                console.log(`- ${postsCreated} posts created`);
                                console.log(`- ${commentsCreated} comments created`);
                                db.close();
                            }
                        });
                    }
                });
            });
        });
    });
}
