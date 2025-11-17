/**
 * Courses Page Logic
 * Handles course listing and display
 */

document.addEventListener('DOMContentLoaded', async () => {
    await loadCourses();
});

async function loadCourses() {
    const container = document.getElementById('courses-container');
    Components.showLoading('courses-container', 'Loading your courses...');

    try {
        const data = await API.getCourses();
        const courses = data.courses || [];

        if (courses.length === 0) {
            Components.showEmpty('courses-container', 'No courses available yet', 'book');
            return;
        }

        // Get user progress for all courses
        const progressData = await API.getProgress();
        const progressMap = {};
        
        if (progressData && progressData.progress) {
            progressData.progress.forEach(p => {
                progressMap[p.course_id] = p.completion_percentage || 0;
            });
        }

        // Render courses
        renderCourses(courses, progressMap);

    } catch (error) {
        console.error('Error loading courses:', error);
        Components.showError('courses-container', 'Failed to load courses. Please try again.');
    }
}

function renderCourses(courses, progressMap) {
    const courseCards = courses.map(course => {
        const progress = progressMap[course.id] || 0;
        const progressBar = Components.getProgressBar(progress);
        const tierBadge = Components.getTierBadge(course.required_tier);
        
        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div class="h-48 bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                    ${course.thumbnail_url ? 
                        `<img src="${course.thumbnail_url}" alt="${course.title}" class="w-full h-full object-cover">` :
                        `<i class="fas fa-book-open text-6xl text-white opacity-50"></i>`
                    }
                </div>
                <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-xl font-bold text-gray-900">${course.title}</h3>
                        ${tierBadge}
                    </div>
                    <p class="text-gray-600 mb-4">${course.description || 'Transform your life with this comprehensive program.'}</p>
                    
                    <!-- Progress -->
                    <div class="mb-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm text-gray-600">Progress</span>
                            <span class="text-sm font-semibold text-teal-600">${progress}%</span>
                        </div>
                        ${progressBar}
                    </div>

                    <!-- Action Button -->
                    <a href="/course-detail.html?slug=${course.slug}" 
                       class="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                        ${progress > 0 ? 'Continue Learning' : 'Start Course'}
                    </a>
                </div>
            </div>
        `;
    }).join('');

    const html = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${courseCards}
        </div>
    `;

    Components.insertHTML('courses-container', html);
}
