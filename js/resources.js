/**
 * Resources Page Logic
 * Handles resource library display and downloads
 */

document.addEventListener('DOMContentLoaded', async () => {
    await loadResources();
});

async function loadResources() {
    Components.showLoading('resources-container', 'Loading resources...');

    try {
        const data = await API.getResources();
        const resources = data.resources || [];

        if (resources.length === 0) {
            Components.showEmpty('resources-container', 'No resources available for your membership tier', 'book');
            return;
        }

        renderResources(resources);

    } catch (error) {
        console.error('Error loading resources:', error);
        Components.showError('resources-container', 'Failed to load resources. Please try again.');
    }
}

function renderResources(resources) {
    const resourceCards = resources.map(resource => {
        const tierBadge = Components.getTierBadge(resource.required_tier);
        
        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="h-48 bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center relative">
                    ${resource.thumbnail_url ? 
                        `<img src="${resource.thumbnail_url}" alt="${resource.title}" class="w-full h-full object-cover">` :
                        `<i class="fas fa-file-pdf text-6xl text-white opacity-50"></i>`
                    }
                    <div class="absolute top-4 right-4">
                        ${tierBadge}
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">${resource.title}</h3>
                    <p class="text-gray-600 mb-4">${resource.description || 'Downloadable resource to support your transformation.'}</p>
                    
                    <!-- Download Button -->
                    <a href="${resource.file_url}" 
                       target="_blank"
                       download
                       class="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                        <i class="fas fa-download mr-2"></i>Download PDF
                    </a>
                </div>
            </div>
        `;
    }).join('');

    const html = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${resourceCards}
        </div>
    `;

    Components.insertHTML('resources-container', html);
}
