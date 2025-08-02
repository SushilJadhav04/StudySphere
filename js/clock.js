/**
 * Digital Clock Component for ApparelTime Website
 * Displays time in multiple time zones with real-time updates
 */

class DigitalClock {
    constructor() {
        this.clocks = {
            local: document.getElementById('local-clock'),
            utc: document.getElementById('utc-clock'),
            est: document.getElementById('est-clock')
        };
        
        this.init();
    }

    /**
     * Initialize the clock functionality
     */
    init() {
        // Update clocks immediately
        this.updateAllClocks();
        
        // Set up interval to update every second
        setInterval(() => {
            this.updateAllClocks();
        }, 1000);
        
        console.log('Digital Clock initialized successfully');
    }

    /**
     * Update all clock displays
     */
    updateAllClocks() {
        const now = new Date();
        
        // Update Local time
        this.updateClock(this.clocks.local, now, 'local');
        
        // Update UTC time
        this.updateClock(this.clocks.utc, now, 'utc');
        
        // Update EST time (UTC-5, considering daylight saving)
        this.updateClock(this.clocks.est, now, 'est');
    }

    /**
     * Update individual clock display
     * @param {HTMLElement} clockElement - The clock DOM element
     * @param {Date} baseTime - The base time to convert
     * @param {string} timezone - The timezone identifier
     */
    updateClock(clockElement, baseTime, timezone) {
        if (!clockElement) {
            console.warn(`Clock element for ${timezone} not found`);
            return;
        }

        const timeElement = clockElement.querySelector('.time');
        const timezoneElement = clockElement.querySelector('.timezone');
        
        if (!timeElement) {
            console.warn(`Time element for ${timezone} not found`);
            return;
        }

        let displayTime;
        let timezoneLabel;

        switch (timezone) {
            case 'local':
                displayTime = baseTime;
                timezoneLabel = this.getLocalTimezoneLabel();
                break;
                
            case 'utc':
                displayTime = new Date(baseTime.getTime() + (baseTime.getTimezoneOffset() * 60000));
                timezoneLabel = 'UTC';
                break;
                
            case 'est':
                // EST is UTC-5, but we need to account for daylight saving time
                const utcTime = new Date(baseTime.getTime() + (baseTime.getTimezoneOffset() * 60000));
                const estOffset = this.isDaylightSavingTime(baseTime) ? -4 : -5; // EDT vs EST
                displayTime = new Date(utcTime.getTime() + (estOffset * 60 * 60 * 1000));
                timezoneLabel = this.isDaylightSavingTime(baseTime) ? 'EDT' : 'EST';
                break;
                
            default:
                displayTime = baseTime;
                timezoneLabel = 'LOCAL';
        }

        // Format time in 24-hour format
        const formattedTime = this.formatTime24Hour(displayTime);
        
        // Update DOM elements
        timeElement.textContent = formattedTime;
        if (timezoneElement) {
            timezoneElement.textContent = timezoneLabel;
        }
    }

    /**
     * Format time in 24-hour format (HH:MM:SS)
     * @param {Date} date - The date object to format
     * @returns {string} - Formatted time string
     */
    formatTime24Hour(date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${hours}:${minutes}:${seconds}`;
    }

    /**
     * Get local timezone label
     * @returns {string} - Local timezone abbreviation
     */
    getLocalTimezoneLabel() {
        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const shortName = new Date().toLocaleTimeString('en-US', {
                timeZoneName: 'short'
            }).split(' ').pop();
            
            return shortName || 'LOCAL';
        } catch (error) {
            console.warn('Could not determine local timezone:', error);
            return 'LOCAL';
        }
    }

    /**
     * Check if the given date is in daylight saving time for EST/EDT
     * @param {Date} date - The date to check
     * @returns {boolean} - True if in daylight saving time
     */
    isDaylightSavingTime(date) {
        // Daylight saving time in US: Second Sunday in March to First Sunday in November
        const year = date.getFullYear();
        
        // Second Sunday in March
        const march = new Date(year, 2, 1); // March 1st
        const firstSundayMarch = new Date(year, 2, 1 + (7 - march.getDay()) % 7);
        const secondSundayMarch = new Date(firstSundayMarch.getTime() + (7 * 24 * 60 * 60 * 1000));
        
        // First Sunday in November
        const november = new Date(year, 10, 1); // November 1st
        const firstSundayNovember = new Date(year, 10, 1 + (7 - november.getDay()) % 7);
        
        return date >= secondSundayMarch && date < firstSundayNovember;
    }

    /**
     * Get timezone information for debugging
     * @returns {Object} - Timezone information
     */
    getTimezoneInfo() {
        const now = new Date();
        return {
            local: {
                time: this.formatTime24Hour(now),
                timezone: this.getLocalTimezoneLabel(),
                offset: now.getTimezoneOffset()
            },
            utc: {
                time: this.formatTime24Hour(new Date(now.getTime() + (now.getTimezoneOffset() * 60000))),
                timezone: 'UTC',
                offset: 0
            },
            est: {
                time: this.formatTime24Hour(new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + ((this.isDaylightSavingTime(now) ? -4 : -5) * 60 * 60 * 1000))),
                timezone: this.isDaylightSavingTime(now) ? 'EDT' : 'EST',
                offset: this.isDaylightSavingTime(now) ? -4 : -5
            }
        };
    }
}

/**
 * Initialize the clock when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize digital clock
    const clock = new DigitalClock();
    
    // Make clock instance available globally for debugging
    window.digitalClock = clock;
    
    // Add smooth loading animation
    const clockCards = document.querySelectorAll('.clock-card');
    clockCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    console.log('ApparelTime Digital Clock System ready!');
    console.log('Available commands: window.digitalClock.getTimezoneInfo()');
});

/**
 * Handle page visibility changes to optimize performance
 */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden - clock continues running in background');
    } else {
        console.log('Page visible - clock active');
    }
});

/**
 * Export for potential module usage
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DigitalClock;
}