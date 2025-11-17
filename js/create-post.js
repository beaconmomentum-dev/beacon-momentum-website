/**
 * Create Post Page Logic
 * Handles creating new posts in a community space
 */

let spaceSlug = null;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    spaceSlug = urlParams.get('space');

    if (!spaceSlug) {
        window.location.href = '/community.html';
        return;
    }

    // Set up back link
    document.getElementById('back-link').href = `/community-space.html?slug=${spaceSlug}`;
    document.getElementById('cancel-btn').addEventListener('click', () => {
        window.location.href = `/community-space.html?slug=${spaceSlug}`;
    });

    // Set up form submission
    document.getElementById('post-form').addEventListener('submit', handlePostSubmit);
});

async function handlePostSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();

    if (!title || !content) {
        alert('Please fill in both title and content');
        return;
    }

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Publishing...';

    try {
        const result = await API.createPost(spaceSlug, title, content);
        
        // Show success message
        showSuccessMessage('Post created successfully!');
        
        // Redirect to the new post after a short delay
        setTimeout(() => {
            window.location.href = `/community-post.html?id=${result.postId}`;
        }, 1000);

    } catch (error) {
        console.error('Error creating post:', error);
        alert(error.message || 'Failed to create post. Please try again.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Publish Post';
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
