/**
 * Lesson View Page Logic
 * Handles displaying lesson content and tracking completion
 */

let currentLesson = null;
let isCompleted = false;

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('id');

    if (!lessonId) {
        window.location.href = '/courses.html';
        return;
    }

    await loadLesson(lessonId);
});

async function loadLesson(lessonId) {
    Components.showLoading('lesson-content', 'Loading lesson...');

    try {
        // Load lesson data
        const lessonData = await API.getLesson(lessonId);
        currentLesson = lessonData.lesson;

        // Check completion status
        const statusData = await API.getLessonStatus(lessonId);
        isCompleted = statusData.isCompleted || false;

        // Render lesson
        renderLessonHeader();
        renderLessonContent();
        renderLessonActions();

    } catch (error) {
        console.error('Error loading lesson:', error);
        Components.showError('lesson-content', error.message || 'Failed to load lesson');
    }
}

function renderLessonHeader() {
    const html = `
        <div class="flex items-center justify-between">
            <div>
                <div class="text-sm text-gray-500 mb-2">
                    <i class="fas fa-${getContentIcon(currentLesson.content_type)} mr-1"></i>
                    ${currentLesson.content_type.toUpperCase()}
                </div>
                <h1 class="text-3xl font-bold text-gray-900">${currentLesson.title}</h1>
            </div>
            ${isCompleted ? 
                '<div class="flex items-center text-green-600"><i class="fas fa-check-circle text-2xl mr-2"></i><span class="font-semibold">Completed</span></div>' : 
                ''
            }
        </div>
    `;
    Components.insertHTML('lesson-header', html);
}

function renderLessonContent() {
    let contentHTML = '';

    switch (currentLesson.content_type) {
        case 'video':
            contentHTML = renderVideoContent();
            break;
        case 'pdf':
            contentHTML = renderPDFContent();
            break;
        case 'text':
        default:
            contentHTML = renderTextContent();
            break;
    }

    Components.insertHTML('lesson-content', contentHTML);
}

function renderVideoContent() {
    if (!currentLesson.content_url) {
        return '<p class="text-gray-500">Video content coming soon...</p>';
    }

    return `
        <div class="aspect-w-16 aspect-h-9 mb-6">
            <video controls class="w-full rounded-lg">
                <source src="${currentLesson.content_url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        ${currentLesson.content_body ? `<div class="prose max-w-none">${formatTextContent(currentLesson.content_body)}</div>` : ''}
    `;
}

function renderPDFContent() {
    if (!currentLesson.content_url) {
        return '<p class="text-gray-500">PDF content coming soon...</p>';
    }

    return `
        <div class="mb-6">
            <a href="${currentLesson.content_url}" target="_blank" 
               class="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                <i class="fas fa-file-pdf mr-2"></i>
                Open PDF in New Tab
            </a>
        </div>
        <div class="border rounded-lg overflow-hidden" style="height: 800px;">
            <iframe src="${currentLesson.content_url}" class="w-full h-full" frameborder="0"></iframe>
        </div>
    `;
}

function renderTextContent() {
    if (!currentLesson.content_body) {
        return '<p class="text-gray-500">Content coming soon...</p>';
    }

    return `<div class="prose max-w-none">${formatTextContent(currentLesson.content_body)}</div>`;
}

function formatTextContent(text) {
    // Simple markdown-like formatting
    return text
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^(.+)$/, '<p>$1</p>');
}

function renderLessonActions() {
    const completeButton = isCompleted ? 
        `<button class="bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg cursor-not-allowed" disabled>
            <i class="fas fa-check mr-2"></i>Completed
        </button>` :
        `<button onclick="markComplete()" class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            <i class="fas fa-check mr-2"></i>Mark as Complete
        </button>`;

    const html = `
        <a href="/courses.html" class="text-gray-700 hover:text-teal-600 font-semibold">
            <i class="fas fa-arrow-left mr-2"></i>Back to Courses
        </a>
        ${completeButton}
    `;

    Components.insertHTML('lesson-actions', html);
}

async function markComplete() {
    try {
        await API.markLessonComplete(currentLesson.id);
        isCompleted = true;
        
        // Update UI
        renderLessonHeader();
        renderLessonActions();

        // Show success message
        showSuccessMessage();

    } catch (error) {
        console.error('Error marking lesson complete:', error);
        alert('Failed to mark lesson as complete. Please try again.');
    }
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    message.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Lesson marked as complete!';
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);
}

function getContentIcon(contentType) {
    const icons = {
        'video': 'play-circle',
        'text': 'file-alt',
        'pdf': 'file-pdf'
    };
    return icons[contentType] || 'file';
}
