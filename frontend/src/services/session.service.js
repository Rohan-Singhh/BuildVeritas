class SessionService {
    constructor() {
        this.inactivityTimeout = 15 * 60 * 1000; // 15 minutes
        this.activityTimer = null;
        this.setupActivityListeners();
    }

    setupActivityListeners() {
        // List of events to track user activity
        const events = [
            'mousedown',
            'keydown',
            'scroll',
            'touchstart',
            'mousemove'
        ];

        // Add listeners for each event
        events.forEach(event => {
            document.addEventListener(event, () => this.resetActivityTimer());
        });
    }

    startSession() {
        this.resetActivityTimer();
        // Check if browser was closed and reopened
        this.checkBrowserSession();
    }

    resetActivityTimer() {
        if (this.activityTimer) {
            clearTimeout(this.activityTimer);
        }

        this.activityTimer = setTimeout(() => {
            this.handleInactivityTimeout();
        }, this.inactivityTimeout);

        // Update last activity timestamp
        localStorage.setItem('lastActivity', Date.now().toString());
    }

    checkBrowserSession() {
        const lastActivity = localStorage.getItem('lastActivity');
        if (lastActivity) {
            const inactiveTime = Date.now() - parseInt(lastActivity);
            if (inactiveTime > this.inactivityTimeout) {
                this.handleInactivityTimeout();
            }
        }
    }

    handleInactivityTimeout() {
        // Clear session
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('lastActivity');

        // Show notification
        this.showTimeoutNotification();

        // Redirect to login
        window.location.href = '/login';
    }

    showTimeoutNotification() {
        // Check if the browser supports notifications
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification('Session Timeout', {
                    body: 'You have been logged out due to inactivity.',
                    icon: '/logo.png' // Add your logo path
                });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification('Session Timeout', {
                            body: 'You have been logged out due to inactivity.',
                            icon: '/logo.png' // Add your logo path
                        });
                    }
                });
            }
        }

        // Also show an alert for browsers without notification support
        alert('You have been logged out due to inactivity. Please login again.');
    }

    clearSession() {
        if (this.activityTimer) {
            clearTimeout(this.activityTimer);
        }
        localStorage.removeItem('lastActivity');
    }
}

export default new SessionService();
