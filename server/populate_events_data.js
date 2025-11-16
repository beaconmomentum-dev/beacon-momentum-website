const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'beacon.db');
const db = new sqlite3.Database(dbPath);

console.log('📅 Creating sample events data...\n');

// Sample events data
const events = [
    {
        title: 'Monthly Community Call: Rising Together',
        description: `Join us for our monthly community gathering where we connect, share, and support each other on our transformation journeys.

This month's focus: Building resilience through community connection

What to expect:
- Opening circle and check-ins
- Guided discussion on the month's theme
- Breakout rooms for deeper connection
- Q&A and community announcements
- Closing reflection

All members are welcome. Come as you are, share what feels right, and connect with others who understand the journey.

Meeting link will be provided upon registration.`,
        event_datetime: getDateString(7, 19, 0), // 7 days from now at 7pm
        duration_minutes: 90,
        meeting_url: 'https://zoom.us/j/example123456',
        required_tier: 'core'
    },
    {
        title: 'Workshop: Designing Your Next Chapter',
        description: `A hands-on workshop to help you clarify your vision and create an actionable plan for your next chapter.

Led by the Beacon Momentum team, this interactive session will guide you through:

- Identifying what you truly want (beyond what you think you should want)
- Releasing limiting beliefs and old stories
- Creating a vision that excites and energizes you
- Breaking your vision down into manageable steps
- Building accountability and support systems

You'll leave with:
✓ A clear vision for your next chapter
✓ An actionable 90-day plan
✓ Tools and frameworks you can use again and again
✓ Connection with others on similar journeys

Please complete the Next Chapter Guide before attending (available in Resources).

Space is limited to ensure quality interaction. Register early!`,
        event_datetime: getDateString(14, 14, 0), // 14 days from now at 2pm
        duration_minutes: 120,
        meeting_url: 'https://zoom.us/j/example789012',
        required_tier: 'community'
    },
    {
        title: 'Founding Members Strategy Session',
        description: `An exclusive gathering for Founding Members to shape the future of Beacon Momentum.

Agenda:
- Community roadmap and upcoming features
- Founding Member benefits and perks
- Collaborative opportunities
- Your input on community direction
- Networking and connection time

This is your opportunity to influence what we build next and connect with other Founding Members who are committed to this community's success.

Your voice matters. Let's build this together.`,
        event_datetime: getDateString(10, 18, 0), // 10 days from now at 6pm
        duration_minutes: 75,
        meeting_url: 'https://zoom.us/j/example345678',
        required_tier: 'founding_member'
    },
    {
        title: 'Past Event: Phoenix Moments Sharing Circle',
        description: `A sacred space to share Phoenix Moment stories and witness each other's journeys.

This was a powerful gathering where members shared their transformation stories, offered support, and celebrated each other's courage.

Recording available for all members.`,
        event_datetime: getDateString(-7, 19, 0), // 7 days ago
        duration_minutes: 90,
        recording_url: 'https://example.com/recordings/phoenix-moments-circle',
        required_tier: 'core'
    },
    {
        title: 'Past Event: Building Micro-Routines Workshop',
        description: `A practical workshop on creating sustainable micro-routines that support your transformation.

We explored:
- The science of habit formation
- How to start ridiculously small
- Stacking habits for maximum impact
- Overcoming resistance and self-sabotage
- Celebrating small wins

Recording includes the full workshop plus Q&A session.`,
        event_datetime: getDateString(-14, 14, 0), // 14 days ago
        duration_minutes: 60,
        recording_url: 'https://example.com/recordings/micro-routines-workshop',
        required_tier: 'core'
    }
];

function getDateString(daysOffset, hour, minute) {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    date.setHours(hour, minute, 0, 0);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

// Insert events
let eventsCreated = 0;

db.serialize(() => {
    events.forEach((event, index) => {
        db.run(`
            INSERT INTO events (title, description, event_datetime, duration_minutes, meeting_url, recording_url, required_tier, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `, [
            event.title,
            event.description,
            event.event_datetime,
            event.duration_minutes,
            event.meeting_url || null,
            event.recording_url || null,
            event.required_tier
        ], function(err) {
            if (err) {
                console.error(`❌ Error creating event "${event.title}":`, err.message);
                return;
            }

            eventsCreated++;
            const eventType = event.recording_url ? 'Past' : 'Upcoming';
            console.log(`✅ Created ${eventType} event: "${event.title}" (ID: ${this.lastID})`);

            if (eventsCreated === events.length) {
                console.log('\n🎉 Sample events data created successfully!');
                console.log(`\nSummary:`);
                console.log(`- ${events.filter(e => !e.recording_url).length} upcoming events created`);
                console.log(`- ${events.filter(e => e.recording_url).length} past events created`);
                console.log(`\nAccess events at: https://beaconmomentum.com/events.html`);
                db.close();
            }
        });
    });
});
