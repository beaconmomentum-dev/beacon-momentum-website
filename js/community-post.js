/**
 * Community Post Detail Page Logic
 * Handles displaying a post and its comments
 */

let currentPost = null;
let currentComments = [];

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        window.location.href = '/community.html';
        return;
    }

    await loadPost(postId);
    
    // Set up comment submission
    document.getElementById('submit-comment-btn').addEventListener('click', handleCommentSubmit);
});

async function loadPost(postId) {
    Components.showLoading('post-content', 'Loading post...');
    Components.showLoading('comments-container', 'Loading comments...');

    try {
        const data = await API.getPost(postId);
        currentPost = data.post;
        currentComments = data.comments || [];

        renderPost();
        renderComments();

    } catch (error) {
        console.error('Error loading post:', error);
        Components.showError('post-content', error.message || 'Failed to load post');
    }
}

function renderPost() {
    const timeAgo = Components.formatRelativeTime(currentPost.created_at);
    
    const html = `
        <div class="mb-4">
            <a href="/community.html" class="text-orange-600 hover:text-orange-700">
                <i class="fas fa-arrow-left mr-2"></i>Back to Community
            </a>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">${currentPost.title}</h1>
        <div class="flex items-center text-sm text-gray-500 mb-6">
            <div class="flex items-center mr-6">
                <i class="fas fa-user-circle text-xl mr-2"></i>
                <span>${currentPost.author_name || 'Anonymous'}</span>
            </div>
            <div class="flex items-center">
                <i class="fas fa-clock mr-2"></i>
                <span>${timeAgo}</span>
            </div>
        </div>
        <div class="prose max-w-none text-gray-700">
            ${formatPostContent(currentPost.content)}
        </div>
    `;
    
    Components.insertHTML('post-content', html);
}

function formatPostContent(content) {
    // Simple formatting - convert line breaks to paragraphs
    return content
        .split('\n\n')
        .map(para => `<p class="mb-4">${para.replace(/\n/g, '<br>')}</p>`)
        .join('');
}

function renderComments() {
    if (currentComments.length === 0) {
        Components.showEmpty('comments-container', 'No comments yet. Be the first to comment!');
        return;
    }

    const commentsHTML = currentComments.map(comment => {
        const timeAgo = Components.formatRelativeTime(comment.created_at);
        
        return `
            <div class="border-b border-gray-200 pb-6 mb-6 last:border-b-0">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <i class="fas fa-user text-orange-600"></i>
                        </div>
                    </div>
                    <div class="ml-4 flex-1">
                        <div class="flex items-center mb-2">
                            <span class="font-semibold text-gray-900">${comment.author_name || 'Anonymous'}</span>
                            <span class="mx-2 text-gray-400">•</span>
                            <span class="text-sm text-gray-500">${timeAgo}</span>
                        </div>
                        <p class="text-gray-700">${comment.content}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    Components.insertHTML('comments-container', commentsHTML);
}

async function handleCommentSubmit() {
    const input = document.getElementById('comment-input');
    const content = input.value.trim();

    if (!content) {
        alert('Please enter a comment');
        return;
    }

    const submitBtn = document.getElementById('submit-comment-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Posting...';

    try {
        await API.addComment(currentPost.id, content);
        
        // Clear input
        input.value = '';
        
        // Reload comments
        const data = await API.getPost(currentPost.id);
        currentComments = data.comments || [];
        renderComments();
        
        // Show success message
        showSuccessMessage('Comment posted successfully!');

    } catch (error) {
        console.error('Error posting comment:', error);
        alert('Failed to post comment. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Post Comment';
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
