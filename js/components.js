/**
 * Component Renderer Utility
 * Simple templating system for rendering HTML components
 */

const Components = {
    /**
     * Render a template string with data
     * @param {string} template - HTML template with {{variable}} placeholders
     * @param {object} data - Data object to inject into template
     * @returns {string} - Rendered HTML string
     */
    render(template, data) {
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] !== undefined ? data[key] : '';
        });
    },

    /**
     * Render multiple items using a template
     * @param {string} template - HTML template
     * @param {array} items - Array of data objects
     * @returns {string} - Combined HTML string
     */
    renderList(template, items) {
        return items.map(item => this.render(template, item)).join('');
    },

    /**
     * Insert rendered HTML into a container
     * @param {string} containerId - ID of container element
     * @param {string} html - HTML to insert
     * @param {boolean} append - Whether to append (true) or replace (false)
     */
    insertHTML(containerId, html, append = false) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container #${containerId} not found`);
            return;
        }

        if (append) {
            container.innerHTML += html;
        } else {
            container.innerHTML = html;
        }
    },

    /**
     * Show loading spinner in container
     */
    showLoading(containerId, message = 'Loading...') {
        const html = `
            <div class="flex items-center justify-center py-12">
                <div class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                    <p class="text-gray-600">${message}</p>
                </div>
            </div>
        `;
        this.insertHTML(containerId, html);
    },

    /**
     * Show error message in container
     */
    showError(containerId, message) {
        const html = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-red-800 font-semibold mb-2">Error</p>
                <p class="text-red-600">${message}</p>
            </div>
        `;
        this.insertHTML(containerId, html);
    },

    /**
     * Show empty state in container
     */
    showEmpty(containerId, message, icon = 'inbox') {
        const iconPaths = {
            inbox: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4',
            book: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
        };

        const html = `
            <div class="text-center py-12">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPaths[icon] || iconPaths.inbox}"></path>
                </svg>
                <p class="text-gray-600">${message}</p>
            </div>
        `;
        this.insertHTML(containerId, html);
    },

    /**
     * Format date for display
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    },

    /**
     * Format relative time (e.g., "2 hours ago")
     */
    formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 7) return this.formatDate(dateString);
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return 'Just now';
    },

    /**
     * Get tier badge HTML
     */
    getTierBadge(tier) {
        const badges = {
            core: '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Core</span>',
            community: '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Community</span>',
            founding_member: '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-gold-100 text-gold-800">Founding Member</span>',
            all_access: '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-gold-100 text-gold-800">All Access</span>'
        };
        return badges[tier] || badges.core;
    },

    /**
     * Get progress bar HTML
     */
    getProgressBar(percentage) {
        const color = percentage === 100 ? 'bg-green-600' : 'bg-teal-600';
        return `
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="${color} h-2 rounded-full transition-all duration-300" style="width: ${percentage}%"></div>
            </div>
        `;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Components;
}
