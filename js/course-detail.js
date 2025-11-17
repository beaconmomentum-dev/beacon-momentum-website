/**
 * Course Detail Page Logic
 * Handles displaying course modules and lessons
 */

let currentCourse = null;
let courseProgress = null;

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        window.location.href = '/courses.html';
        return;
    }

    await loadCourse(slug);
});

async function loadCourse(slug) {
    Components.showLoading('course-header', 'Loading course...');
    Components.showLoading('modules-container', 'Loading modules...');

    try {
        // Load course data
        const courseData = await API.getCourse(slug);
        currentCourse = courseData.course;

        // Load progress
        const progressData = await API.getCourseProgress(currentCourse.id);
        courseProgress = progressData;

        // Render course
        renderCourseHeader();
        renderProgress();
        await renderModules();

    } catch (error) {
        console.error('Error loading course:', error);
        Components.showError('modules-container', error.message || 'Failed to load course');
    }
}

function renderCourseHeader() {
    const html = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="flex items-center mb-4">
                <a href="/courses.html" class="text-teal-100 hover:text-white mr-4">
                    <i class="fas fa-arrow-left"></i> Back to Courses
                </a>
                ${Components.getTierBadge(currentCourse.required_tier)}
            </div>
            <h1 class="text-4xl font-bold mb-4">${currentCourse.title}</h1>
            <p class="text-xl text-teal-100">${currentCourse.description || ''}</p>
        </div>
    `;
    Components.insertHTML('course-header', html);
}

function renderProgress() {
    const percentage = courseProgress.completion_percentage || 0;
    const progressBar = Components.getProgressBar(percentage);
    
    const html = `
        <div class="text-center mb-4">
            <div class="text-4xl font-bold text-teal-600 mb-2">${percentage}%</div>
            <div class="text-sm text-gray-600">Complete</div>
        </div>
        ${progressBar}
        <div class="mt-4 text-sm text-gray-600 text-center">
            ${courseProgress.completed_lessons || 0} of ${courseProgress.total_lessons || 0} lessons completed
        </div>
    `;
    Components.insertHTML('progress-display', html);
}

async function renderModules() {
    if (!currentCourse.modules || currentCourse.modules.length === 0) {
        Components.showEmpty('modules-container', 'No modules available yet');
        return;
    }

    // Parse modules if they're a string
    let modules = currentCourse.modules;
    if (typeof modules === 'string') {
        modules = JSON.parse(modules);
    }

    // Filter out null modules
    modules = modules.filter(m => m && m.id);

    if (modules.length === 0) {
        Components.showEmpty('modules-container', 'No modules available yet');
        return;
    }

    // Load lessons for each module
    const modulesWithLessons = await Promise.all(
        modules.map(async (module) => {
            try {
                const lessonsData = await API.getLessonsForModule(module.id);
                return {
                    ...module,
                    lessons: lessonsData.lessons || []
                };
            } catch (error) {
                console.error(`Error loading lessons for module ${module.id}:`, error);
                return {
                    ...module,
                    lessons: []
                };
            }
        })
    );

    // Render modules
    const modulesHTML = modulesWithLessons.map((module, index) => {
        const lessonsHTML = module.lessons.map((lesson, lessonIndex) => {
            const lessonNumber = lessonIndex + 1;
            return `
                <a href="/lesson-view.html?id=${lesson.id}" 
                   class="flex items-center justify-between p-4 hover:bg-gray-50 border-b last:border-b-0 transition-colors">
                    <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-semibold mr-3">
                            ${lessonNumber}
                        </div>
                        <div>
                            <div class="font-medium text-gray-900">${lesson.title}</div>
                            <div class="text-sm text-gray-500">
                                <i class="fas fa-${getContentIcon(lesson.content_type)} mr-1"></i>
                                ${lesson.content_type}
                            </div>
                        </div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-400"></i>
                </a>
            `;
        }).join('');

        return `
            <div class="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                <div class="bg-teal-600 text-white p-4">
                    <h3 class="text-xl font-bold">Module ${index + 1}: ${module.title}</h3>
                    <p class="text-teal-100 text-sm mt-1">${module.lessons.length} lesson${module.lessons.length !== 1 ? 's' : ''}</p>
                </div>
                <div>
                    ${lessonsHTML || '<div class="p-4 text-gray-500 text-center">No lessons available</div>'}
                </div>
            </div>
        `;
    }).join('');

    Components.insertHTML('modules-container', modulesHTML);
}

function getContentIcon(contentType) {
    const icons = {
        'video': 'play-circle',
        'text': 'file-alt',
        'pdf': 'file-pdf'
    };
    return icons[contentType] || 'file';
}
