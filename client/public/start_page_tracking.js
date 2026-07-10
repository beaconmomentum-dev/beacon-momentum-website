// Conversion tracking for /start page
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            // Assuming standard GTM/GA4 dataLayer setup
            if (window.dataLayer) {
                window.dataLayer.push({
                    'event': 'form_submission',
                    'form_id': 'starter_pack_optin',
                    'form_name': 'Starter Pack Opt-In'
                });
            }
            // Add Facebook Pixel tracking if available
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', {
                    content_name: 'Starter Pack Opt-In'
                });
            }
        });
    }
});
