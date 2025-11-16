/**
 * Community Space Detail Page Logic
 * Handles displaying a single space and its posts
 */

let currentSpace = null;

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        window.location.href = '/community.html';
        return;
    }

    await loadSpace(slug);
    
    // Set up create post button
    document.getElementById('create-post-btn').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `/create-post.html?space=${slug}`;
    });
});

async function loadSpace(slug) {
    Components.showLoading('space-header', 'Loading space...');
    Components.showLoading('posts-container', 'Loading posts...');

    try {
        // Load space data
        const spaceData = await API.getSpace(slug);
        currentSpace = spaceData.space;

        // Load posts in this space
        const postsData = await API.getPostsInSpace(slug);
        const posts = postsData.posts || [];

        // Render
        renderSpaceHeader();
        renderPosts(posts);

    } catch (error) {
        console.error('Error loading space:', error);
        Components.showError('posts-container', error.message || 'Failed to load space');
    }
}

function renderSpaceHeader() {
    const tierBadge = Components.getTierBadge(currentSpace.required_tier);
    
    const html = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="flex items-center mb-4">
                <a href="/community.html" class="text-orange-100 hover:text-white mr-4">
                    <i class="fas fa-arrow-left"></i> Back to Community
                </a>
                ${tierBadge}
            </div>
            <h1 class="text-4xl font-bold mb-4">${currentSpace.title}</h1>
            <p class="text-xl text-orange-100">${currentSpace.description || ''}</p>
        </div>
    `;
    Components.insertHTML('space-header', html);
}

function renderPosts(posts) {
    if (posts.length === 0) {
        Components.showEmpty('posts-container', 'No posts yet. Be the first to start a discussion!');
        return;
    }

    const postsHTML = posts.map(post => {
        const timeAgo = Components.formatRelativeTime(post.created_at);
        const commentText = post.comment_count === 1 ? 'comment' : 'comments';
        
        return `
            <a href="/community-post.html?id=${post.id}" 
               class="block bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-200">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">${post.title}</h3>
                        <p class="text-gray-600 mb-4 line-clamp-2">${post.content.substring(0, 200)}${post.content.length > 200 ? '...' : ''}</p>
                        <div class="flex items-center text-sm text-gray-500">
                            <div class="flex items-center mr-6">
                                <i class="fas fa-user-circle mr-2"></i>
                                <span>${post.author_name || 'Anonymous'}</span>
                            </div>
                            <div class="flex items-center mr-6">
                                <i class="fas fa-clock mr-2"></i>
                                <span>${timeAgo}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-comments mr-2"></i>
                                <span>${post.comment_count || 0} ${commentText}</span>
                            </div>
                        </div>
                    </div>
                    <div class="ml-4">
                        <i class="fas fa-chevron-right text-gray-400"></i>
                    </div>
                </div>
            </a>
        `;
    }).join('');

    Components.insertHTML('posts-container', postsHTML);
}
