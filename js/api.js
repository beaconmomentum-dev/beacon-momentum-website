/**
 * Central API Client for Beacon Momentum
 * Handles all fetch requests to the backend API
 */

const API = {
    baseUrl: '/api',

    /**
     * Generic fetch wrapper with error handling
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include' // Include cookies for authentication
        };

        const config = { ...defaultOptions, ...options };

        try {
            const response = await fetch(url, config);

            // Handle redirects to login
            if (response.redirected && response.url.includes('/login.html')) {
                window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
                return null;
            }

            // Handle non-OK responses
            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Request failed' }));
                throw new Error(error.message || `HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    },

    // ===== COURSES =====
    async getCourses() {
        return this.request('/courses');
    },

    async getCourse(slug) {
        return this.request(`/courses/${slug}`);
    },

    async getLesson(lessonId) {
        return this.request(`/courses/lessons/${lessonId}`);
    },

    async getLessonsForModule(moduleId) {
        return this.request(`/courses/modules/${moduleId}/lessons`);
    },

    // ===== RESOURCES =====
    async getResources() {
        return this.request('/resources');
    },

    async getResource(resourceId) {
        return this.request(`/resources/${resourceId}`);
    },

    // ===== PROGRESS =====
    async getProgress() {
        return this.request('/progress');
    },

    async markLessonComplete(lessonId) {
        return this.request(`/progress/lessons/${lessonId}/complete`, {
            method: 'POST'
        });
    },

    async getLessonStatus(lessonId) {
        return this.request(`/progress/lessons/${lessonId}/status`);
    },

    async getCourseProgress(courseId) {
        return this.request(`/progress/courses/${courseId}`);
    },

    async getCompletedLessons() {
        return this.request('/progress/completed');
    },

    // ===== COMMUNITY =====
    async getCommunitySpaces() {
        return this.request('/community/spaces');
    },

    async getSpace(slug) {
        return this.request(`/community/spaces/${slug}`);
    },

    async getPostsInSpace(slug) {
        return this.request(`/community/spaces/${slug}/posts`);
    },

    async getPost(postId) {
        return this.request(`/community/posts/${postId}`);
    },

    async createPost(slug, postData) {
        return this.request(`/community/spaces/${slug}/posts`, {
            method: 'POST',
            body: JSON.stringify(postData)
        });
    },

    async addComment(postId, content, parentCommentId = null) {
        return this.request(`/community/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify({ content, parent_comment_id: parentCommentId })
        });
    },

    async deletePost(postId) {
        return this.request(`/community/posts/${postId}`, {
            method: 'DELETE'
        });
    },

    // ===== EVENTS =====
    async getUpcomingEvents() {
        return this.request('/events');
    },

    async getPastEvents() {
        return this.request('/events/past');
    },

    async getEvent(eventId) {
        return this.request(`/events/${eventId}`);
    },

    async registerForEvent(eventId) {
        return this.request(`/events/${eventId}/register`, {
            method: 'POST'
        });
    },

    async unregisterFromEvent(eventId) {
        return this.request(`/events/${eventId}/register`, {
            method: 'DELETE'
        });
    },

    async getMyEvents() {
        return this.request('/events/my/registrations');
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}
