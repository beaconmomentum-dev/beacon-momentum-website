/**
 * Event Detail Page Logic
 * Handles displaying event details and registration
 */

let currentEvent = null;

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (!eventId) {
        window.location.href = '/events.html';
        return;
    }

    await loadEvent(eventId);
});

async function loadEvent(eventId) {
    Components.showLoading('event-container', 'Loading event details...');

    try {
        const data = await API.getEvent(eventId);
        currentEvent = data.event;
        renderEvent();

    } catch (error) {
        console.error('Error loading event:', error);
        Components.showError('event-container', error.message || 'Failed to load event');
    }
}

function renderEvent() {
    const tierBadge = Components.getTierBadge(currentEvent.required_tier);
    const eventDate = new Date(currentEvent.event_datetime);
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
    
    const isRegistered = currentEvent.is_registered;
    const hasMeetingLink = currentEvent.meeting_url;
    
    const html = `
        <div class="bg-white rounded-lg shadow-md p-8">
            <div class="mb-6">
                <a href="/events.html" class="text-red-600 hover:text-red-700">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Events
                </a>
            </div>

            <div class="flex items-start justify-between mb-6">
                <div class="flex-1">
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">${currentEvent.title}</h1>
                    ${tierBadge}
                </div>
                <div class="ml-6 flex-shrink-0">
                    <div class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                        <i class="fas fa-video text-3xl text-red-600"></i>
                    </div>
                </div>
            </div>

            <!-- Event Details -->
            <div class="bg-gray-50 rounded-lg p-6 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex items-center">
                        <i class="fas fa-calendar text-red-600 text-xl w-8 mr-3"></i>
                        <div>
                            <div class="text-sm text-gray-500">Date</div>
                            <div class="font-semibold text-gray-900">${formattedDate}</div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-clock text-red-600 text-xl w-8 mr-3"></i>
                        <div>
                            <div class="text-sm text-gray-500">Time</div>
                            <div class="font-semibold text-gray-900">${formattedTime}</div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-hourglass-half text-red-600 text-xl w-8 mr-3"></i>
                        <div>
                            <div class="text-sm text-gray-500">Duration</div>
                            <div class="font-semibold text-gray-900">${currentEvent.duration_minutes || 60} minutes</div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-users text-red-600 text-xl w-8 mr-3"></i>
                        <div>
                            <div class="text-sm text-gray-500">Access Level</div>
                            <div class="font-semibold text-gray-900">${formatTier(currentEvent.required_tier)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                <div class="prose max-w-none text-gray-700">
                    ${formatDescription(currentEvent.description)}
                </div>
            </div>

            <!-- Registration Section -->
            <div class="border-t pt-6">
                ${isRegistered ? `
                    <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                        <div class="flex items-center mb-3">
                            <i class="fas fa-check-circle text-green-600 text-2xl mr-3"></i>
                            <span class="text-lg font-semibold text-green-900">You're Registered!</span>
                        </div>
                        ${hasMeetingLink ? `
                            <a href="${currentEvent.meeting_url}" 
                               target="_blank"
                               class="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                                <i class="fas fa-video mr-2"></i>Join Meeting
                            </a>
                        ` : `
                            <p class="text-green-700">The meeting link will be available closer to the event date.</p>
                        `}
                    </div>
                ` : `
                    <button id="register-btn" 
                            class="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-12 rounded-lg transition-colors text-lg">
                        <i class="fas fa-calendar-check mr-2"></i>Register for This Event
                    </button>
                `}
            </div>
        </div>
    `;
    
    Components.insertHTML('event-container', html);
    
    // Set up registration button if not registered
    if (!isRegistered) {
        document.getElementById('register-btn').addEventListener('click', handleRegistration);
    }
}

function formatTier(tier) {
    const tierMap = {
        'core': 'Core Members',
        'community': 'Community Members',
        'founding_member': 'Founding Members',
        'all': 'All Members'
    };
    return tierMap[tier] || tier;
}

function formatDescription(description) {
    if (!description) return '<p>No description available.</p>';
    return description
        .split('\n\n')
        .map(para => `<p class="mb-4">${para.replace(/\n/g, '<br>')}</p>`)
        .join('');
}

async function handleRegistration() {
    const registerBtn = document.getElementById('register-btn');
    registerBtn.disabled = true;
    registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Registering...';

    try {
        await API.registerForEvent(currentEvent.id);
        
        // Show success message
        showSuccessMessage('Successfully registered for event!');
        
        // Reload event to show updated registration status
        setTimeout(async () => {
            await loadEvent(currentEvent.id);
        }, 1000);

    } catch (error) {
        console.error('Error registering for event:', error);
        alert(error.message || 'Failed to register. Please try again.');
        registerBtn.disabled = false;
        registerBtn.innerHTML = '<i class="fas fa-calendar-check mr-2"></i>Register for This Event';
    }
}

function showSuccessMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    messageEl.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
    document.body.appendChild(messageEl);

    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}
