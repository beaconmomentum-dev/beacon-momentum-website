/**
 * Events Page Logic
 * Handles displaying upcoming and past events
 */

let currentTab = 'upcoming';

document.addEventListener('DOMContentLoaded', async () => {
    setupTabs();
    await loadEvents('upcoming');
});

function setupTabs() {
    document.getElementById('upcoming-tab').addEventListener('click', () => switchTab('upcoming'));
    document.getElementById('past-tab').addEventListener('click', () => switchTab('past'));
}

async function switchTab(tab) {
    if (tab === currentTab) return;
    
    currentTab = tab;
    
    // Update tab styles
    const upcomingTab = document.getElementById('upcoming-tab');
    const pastTab = document.getElementById('past-tab');
    
    if (tab === 'upcoming') {
        upcomingTab.className = 'tab-btn py-4 px-1 border-b-2 border-red-600 font-semibold text-red-600 whitespace-nowrap';
        pastTab.className = 'tab-btn py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap';
    } else {
        pastTab.className = 'tab-btn py-4 px-1 border-b-2 border-red-600 font-semibold text-red-600 whitespace-nowrap';
        upcomingTab.className = 'tab-btn py-4 px-1 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap';
    }
    
    await loadEvents(tab);
}

async function loadEvents(type) {
    Components.showLoading('events-container', `Loading ${type} events...`);

    try {
        const data = type === 'upcoming' ? 
            await API.getUpcomingEvents() : 
            await API.getPastEvents();
        
        const events = data.events || [];

        if (events.length === 0) {
            const message = type === 'upcoming' ? 
                'No upcoming events scheduled yet. Check back soon!' :
                'No past events to display.';
            Components.showEmpty('events-container', message, 'calendar-alt');
            return;
        }

        renderEvents(events, type);

    } catch (error) {
        console.error('Error loading events:', error);
        Components.showError('events-container', 'Failed to load events. Please try again.');
    }
}

function renderEvents(events, type) {
    const eventsHTML = events.map(event => {
        const tierBadge = Components.getTierBadge(event.required_tier);
        const eventDate = new Date(event.event_datetime);
        const formattedDate = eventDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const formattedTime = eventDate.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit' 
        });
        
        const isPast = type === 'past';
        const hasRecording = isPast && event.recording_url;
        
        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <h3 class="text-2xl font-bold text-gray-900 mb-2">${event.title}</h3>
                            ${tierBadge}
                        </div>
                        <div class="ml-4 flex-shrink-0">
                            <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                                <i class="fas fa-video text-2xl text-red-600"></i>
                            </div>
                        </div>
                    </div>
                    
                    <p class="text-gray-600 mb-4">${event.description || ''}</p>
                    
                    <!-- Event Details -->
                    <div class="space-y-2 mb-4">
                        <div class="flex items-center text-gray-700">
                            <i class="fas fa-calendar text-red-600 w-5 mr-3"></i>
                            <span>${formattedDate}</span>
                        </div>
                        <div class="flex items-center text-gray-700">
                            <i class="fas fa-clock text-red-600 w-5 mr-3"></i>
                            <span>${formattedTime} (${event.duration_minutes || 60} minutes)</span>
                        </div>
                    </div>

                    <!-- Action Button -->
                    ${isPast ? 
                        (hasRecording ? 
                            `<a href="${event.recording_url}" target="_blank" 
                                class="block w-full text-center bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                <i class="fas fa-play mr-2"></i>Watch Recording
                             </a>` :
                            `<div class="text-center text-gray-500 py-3">
                                <i class="fas fa-info-circle mr-2"></i>Recording not available
                             </div>`) :
                        `<a href="/event-detail.html?id=${event.id}" 
                            class="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                            <i class="fas fa-arrow-right mr-2"></i>View Details
                         </a>`
                    }
                </div>
            </div>
        `;
    }).join('');

    const html = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${eventsHTML}
        </div>
    `;

    Components.insertHTML('events-container', html);
}
