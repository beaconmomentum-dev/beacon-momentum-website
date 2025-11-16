const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'beacon.db');
const db = new sqlite3.Database(dbPath);

console.log('📚 Creating sample course data...\n');

// First, delete any existing sample course
db.serialize(() => {
    db.run("DELETE FROM user_progress WHERE lesson_id IN (SELECT id FROM lessons WHERE module_id IN (SELECT id FROM modules WHERE course_id IN (SELECT id FROM courses WHERE slug = 'rise-reclaim-foundations')))");
    db.run("DELETE FROM lessons WHERE module_id IN (SELECT id FROM modules WHERE course_id IN (SELECT id FROM courses WHERE slug = 'rise-reclaim-foundations'))");
    db.run("DELETE FROM modules WHERE course_id IN (SELECT id FROM courses WHERE slug = 'rise-reclaim-foundations')");
    db.run("DELETE FROM courses WHERE slug = 'rise-reclaim-foundations'", (err) => {
        if (err && !err.message.includes('no such table')) {
            console.log('Note: Cleaned up existing data');
        }
        insertCourseData();
    });
});

function insertCourseData() {
// Sample course data
const courseData = {
    title: 'Rise & Reclaim Foundations',
    slug: 'rise-reclaim-foundations',
    description: 'Transform your life through this comprehensive program designed to help you rise from your ashes and reclaim your future. Learn practical strategies for personal transformation, building resilience, and creating meaningful change.',
    required_tier: 'core',
    modules: [
        {
            title: 'Understanding Your Phoenix Moment',
            order_index: 1,
            lessons: [
                {
                    title: 'Welcome to Rise & Reclaim',
                    content_type: 'text',
                    order_index: 1,
                    content_body: `<h2>Welcome to Your Transformation Journey</h2>

<p>Every phoenix must pass through fire before it can rise. Your hardest moment—the one that brought you to your knees—wasn't meant to destroy you. It was the fire that burns away what no longer serves you, preparing you for transformation.</p>

<h3>What is a Phoenix Moment?</h3>

<p>A Phoenix Moment is that pivotal point in your life when everything falls apart. It's the moment of crisis, loss, or profound challenge that forces you to confront who you are and who you want to become. These moments are painful, but they're also powerful catalysts for change.</p>

<h3>Common Phoenix Moments Include:</h3>

<ul>
<li>Loss of a job or career setback</li>
<li>End of a significant relationship</li>
<li>Health crisis or diagnosis</li>
<li>Financial hardship or bankruptcy</li>
<li>Loss of a loved one</li>
<li>Identity crisis or life transition</li>
</ul>

<h3>The Three Phases of Transformation</h3>

<p><strong>1. The Fire:</strong> The crisis or challenge that breaks down your old self. This is where you are now or have recently been.</p>

<p><strong>2. The Ashes:</strong> The period of reflection, grief, and letting go. This is where you process what happened and release what no longer serves you.</p>

<p><strong>3. The Rising:</strong> The emergence of your new self—stronger, wiser, and more aligned with your true purpose.</p>

<h3>Your Journey Ahead</h3>

<p>In this course, you'll learn to navigate each phase of your transformation. You'll discover practical tools, strategies, and mindsets that will help you not just survive your Phoenix Moment, but use it as a springboard to create the life you truly want.</p>

<p>Remember: You are not broken. You are transforming.</p>`
                },
                {
                    title: 'Identifying Your Phoenix Moment',
                    content_type: 'text',
                    order_index: 2,
                    content_body: `<h2>Recognizing Your Catalyst for Change</h2>

<p>Before you can rise, you must understand what brought you to this moment. This lesson will help you identify and name your Phoenix Moment so you can begin to work with it rather than against it.</p>

<h3>Reflection Exercise</h3>

<p>Take a moment to consider these questions:</p>

<ul>
<li>What event or series of events led you here?</li>
<li>What did this experience take from you?</li>
<li>What emotions are you experiencing right now?</li>
<li>What beliefs about yourself or the world have been challenged?</li>
</ul>

<h3>The Gift in the Fire</h3>

<p>While it may not feel like it now, your Phoenix Moment carries a gift. It's showing you:</p>

<ul>
<li>What truly matters to you</li>
<li>What you're capable of enduring</li>
<li>What needs to change in your life</li>
<li>Who you really are beneath the surface</li>
</ul>

<h3>Moving Forward</h3>

<p>Naming your Phoenix Moment is the first step in reclaiming your power. By acknowledging what happened and how it affected you, you begin the process of transformation.</p>

<p>In the next lesson, we'll explore how to process the emotions that come with your Phoenix Moment and begin building the foundation for your rise.</p>`
                },
                {
                    title: 'The Phoenix Moments Workbook',
                    content_type: 'pdf',
                    order_index: 3,
                    content_url: '/content/resources/phoenix-moments-workbook.pdf',
                    content_body: 'Download and complete the Phoenix Moments Workbook to deepen your understanding of your transformation journey.'
                }
            ]
        },
        {
            title: 'Building Your Foundation',
            order_index: 2,
            lessons: [
                {
                    title: 'Creating Stability in Chaos',
                    content_type: 'text',
                    order_index: 1,
                    content_body: `<h2>Finding Ground When Everything Shifts</h2>

<p>When you're in the midst of transformation, stability can feel impossible. But creating small pockets of consistency and routine is essential for your recovery and growth.</p>

<h3>The Importance of Micro-Routines</h3>

<p>You don't need to overhaul your entire life right now. Instead, focus on creating small, manageable routines that give you a sense of control and normalcy.</p>

<h3>Essential Stability Practices</h3>

<p><strong>1. Morning Anchor:</strong> Start each day with one consistent action—making your bed, drinking water, or taking three deep breaths.</p>

<p><strong>2. Evening Ritual:</strong> End your day with a simple practice that signals rest—journaling, reading, or gratitude reflection.</p>

<p><strong>3. Physical Movement:</strong> Move your body daily, even if it's just a 10-minute walk. Physical movement helps process emotional pain.</p>

<p><strong>4. Nourishment:</strong> Eat regular meals. When everything feels out of control, feeding yourself is an act of self-care.</p>

<p><strong>5. Connection:</strong> Reach out to at least one person each day, even if it's just a text message.</p>

<h3>The Little Things Matter</h3>

<p>These small practices might seem insignificant, but they're the building blocks of your new foundation. Each time you follow through on a micro-routine, you're proving to yourself that you can be trusted, that you can show up, that you can rebuild.</p>

<h3>Action Step</h3>

<p>Choose one micro-routine to implement this week. Just one. Master it before adding more.</p>`
                },
                {
                    title: 'The Power of Little Things',
                    content_type: 'pdf',
                    order_index: 2,
                    content_url: '/content/resources/little-things-guide.pdf',
                    content_body: 'Download the Little Things Guide for a comprehensive list of micro-routines and stability practices.'
                }
            ]
        },
        {
            title: 'Designing Your Next Chapter',
            order_index: 3,
            lessons: [
                {
                    title: 'Vision Without Pressure',
                    content_type: 'text',
                    order_index: 1,
                    content_body: `<h2>Creating a Future That Excites You</h2>

<p>You've processed your Phoenix Moment and built a stable foundation. Now it's time to look forward—but without the pressure of having it all figured out.</p>

<h3>Permission to Explore</h3>

<p>Your next chapter doesn't need to be perfect or permanent. It just needs to be yours. Give yourself permission to:</p>

<ul>
<li>Try things that interest you</li>
<li>Change your mind</li>
<li>Take small steps instead of giant leaps</li>
<li>Prioritize joy and curiosity over productivity</li>
</ul>

<h3>The Next Chapter Framework</h3>

<p><strong>1. What do I want to feel?</strong> Start with emotions, not achievements. Do you want to feel peaceful? Creative? Connected? Purposeful?</p>

<p><strong>2. What lights me up?</strong> What activities, topics, or experiences make you lose track of time?</p>

<p><strong>3. What do I want less of?</strong> What drains your energy or no longer aligns with who you're becoming?</p>

<p><strong>4. What do I want more of?</strong> What brings you joy, meaning, or fulfillment?</p>

<p><strong>5. What's one small step?</strong> What's the smallest action you can take toward the life you want?</p>

<h3>Your Vision is a Living Document</h3>

<p>Your next chapter will evolve as you do. That's not only okay—it's expected. The goal isn't to create a rigid plan, but to establish a direction that feels aligned with who you're becoming.</p>

<h3>Reflection Exercise</h3>

<p>Complete the Next Chapter Guide (available in the resources section) to begin designing your future with intention and compassion.</p>`
                },
                {
                    title: 'Next Chapter Planning Guide',
                    content_type: 'pdf',
                    order_index: 2,
                    content_url: '/content/resources/next-chapter-guide.pdf',
                    content_body: 'Download the Next Chapter Guide to map out your vision for the future.'
                },
                {
                    title: 'Course Completion & Next Steps',
                    content_type: 'text',
                    order_index: 3,
                    content_body: `<h2>Congratulations on Completing Rise & Reclaim Foundations!</h2>

<p>You've done the hard work of facing your Phoenix Moment, building stability, and designing your next chapter. This is just the beginning of your transformation journey.</p>

<h3>What You've Accomplished</h3>

<ul>
<li>✓ Identified and named your Phoenix Moment</li>
<li>✓ Created stability practices to support your recovery</li>
<li>✓ Designed a vision for your next chapter</li>
<li>✓ Built a foundation for lasting change</li>
</ul>

<h3>Continue Your Journey</h3>

<p>This course is part of the larger Rise & Reclaim community. Here's how to continue:</p>

<p><strong>Join the Community:</strong> Connect with others on their transformation journey in the Rise & Reclaim community forum.</p>

<p><strong>Attend Live Calls:</strong> Join our monthly community calls for support, accountability, and deeper learning.</p>

<p><strong>Access Resources:</strong> Download additional guides and workbooks from the resource library.</p>

<p><strong>Upgrade Your Membership:</strong> Unlock advanced courses and exclusive content with a Community or Founding Member tier.</p>

<h3>Remember</h3>

<p>Transformation is not linear. There will be setbacks, doubts, and difficult days. But you now have the tools and community to support you through it all.</p>

<p>You are not broken. You are transforming.</p>

<p>Welcome to your next chapter. 🔥</p>`
                }
            ]
        }
    ]
};

// Insert course
db.run(`
    INSERT INTO courses (title, slug, description, required_tier, created_at)
    VALUES (?, ?, ?, ?, datetime('now'))
`, [courseData.title, courseData.slug, courseData.description, courseData.required_tier], function(err) {
    if (err) {
        console.error('❌ Error creating course:', err.message);
        db.close();
        return;
    }

    const courseId = this.lastID;
    console.log(`✅ Created course: "${courseData.title}" (ID: ${courseId})`);

    // Insert modules and lessons
    let moduleCount = 0;
    let lessonCount = 0;

    courseData.modules.forEach((moduleData, moduleIndex) => {
        db.run(`
            INSERT INTO modules (course_id, title, module_order, created_at)
            VALUES (?, ?, ?, datetime('now'))
        `, [courseId, moduleData.title, moduleData.order_index], function(err) {
            if (err) {
                console.error(`❌ Error creating module "${moduleData.title}":`, err.message);
                return;
            }

            const moduleId = this.lastID;
            moduleCount++;
            console.log(`  ✅ Created module ${moduleIndex + 1}: "${moduleData.title}" (ID: ${moduleId})`);

            // Insert lessons for this module
            moduleData.lessons.forEach((lessonData, lessonIndex) => {
                db.run(`
                    INSERT INTO lessons (module_id, title, content_type, content_body, content_url, lesson_order, order_index, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
                `, [
                    moduleId,
                    lessonData.title,
                    lessonData.content_type,
                    lessonData.content_body,
                    lessonData.content_url || null,
                    lessonData.order_index,
                    lessonData.order_index
                ], function(err) {
                    if (err) {
                        console.error(`    ❌ Error creating lesson "${lessonData.title}":`, err.message);
                        return;
                    }

                    lessonCount++;
                    console.log(`    ✅ Created lesson ${lessonIndex + 1}: "${lessonData.title}" (ID: ${this.lastID})`);

                    // Check if we're done
                    if (moduleCount === courseData.modules.length && 
                        lessonCount === courseData.modules.reduce((sum, m) => sum + m.lessons.length, 0)) {
                        console.log('\n🎉 Sample course data created successfully!');
                        console.log(`\nSummary:`);
                        console.log(`- 1 course created`);
                        console.log(`- ${moduleCount} modules created`);
                        console.log(`- ${lessonCount} lessons created`);
                        console.log(`\nAccess the course at: https://beaconmomentum.com/courses.html`);
                        db.close();
                    }
                });
            });
        });
    });
});
}

// Don't auto-execute if required as module
if (require.main === module) {
    // Script is being run directly
}
