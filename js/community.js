/**
 * Community Spaces Page Logic
 * Handles displaying all community spaces
 */

document.addEventListener('DOMContentLoaded', async () => {
    await loadSpaces();
});

async function loadSpaces() {
    Components.showLoading('spaces-container', 'Loading community spaces...');

    try {
        const data = await API.getCommunitySpaces();
        const spaces = data.spaces || [];

        if (spaces.length === 0) {
            Components.showEmpty('spaces-container', 'No community spaces available yet', 'users');
            return;
        }

        renderSpaces(spaces);

    } catch (error) {
        console.error('Error loading spaces:', error);
        Components.showError('spaces-container', 'Failed to load community spaces. Please try again.');
    }
}

function renderSpaces(spaces) {
    const spaceCards = spaces.map(space => {
        const tierBadge = Components.getTierBadge(space.required_tier);
        const lastActivity = space.last_activity ? 
            `Last activity: ${Components.formatRelativeTime(space.last_activity)}` : 
            'No recent activity';
        
        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center">
                            <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                                <i class="fas fa-comments text-2xl text-orange-600"></i>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">${space.title}</h3>
                                ${tierBadge}
                            </div>
                        </div>
                    </div>
                    
                    <p class="text-gray-600 mb-4">${space.description || 'A space for community discussion and connection.'}</p>
                    
                    <!-- Stats -->
                    <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div class="flex items-center">
                            <i class="fas fa-file-alt mr-2"></i>
                            <span>${space.post_count || 0} post${space.post_count !== 1 ? 's' : ''}</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-clock mr-2"></i>
                            <span>${lastActivity}</span>
                        </div>
                    </div>

                    <!-- Action Button -->
                    <a href="/community-space.html?slug=${space.slug}" 
                       class="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                        <i class="fas fa-arrow-right mr-2"></i>Enter Space
                    </a>
                </div>
            </div>
        `;
    }).join('');

    const html = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${spaceCards}
        </div>
    `;

    Components.insertHTML('spaces-container', html);
}
