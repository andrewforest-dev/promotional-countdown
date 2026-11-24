
/**
 * Promotional Countdown
 * Author: Andres Devia - Andrew Forest
 * Version: 1.0.0
 *
 * Monthly promotion scheduling and countdown logic.
 */

"use strict";

// Application configuration

const CONFIG = Object.freeze({
    promotionDay: 15,
    discount: 15,
    timezone: "America/Bogota",
    utcOffset: 5,
    updateInterval: 1000
});

/**
 * Get the current date in Colombia.
 */

function getColombiaDate(now = new Date()) {

    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: CONFIG.timezone,
        year: "numeric",
        month: "numeric",
        day: "numeric"
    });

    const parts = formatter.formatToParts(now);

    const values = {};

    parts.forEach(part => {
        if (part.type !== "literal") {
            values[part.type] = Number(part.value);
        }
    });

    return {
        year: values.year,
        month: values.month - 1,
        day: values.day
    };
}

/**
 * Create a date at midnight in Colombia.
 */

function createPromotionDate(year, month, day) {

    return new Date(
        Date.UTC(
            year,
            month,
            day,
            CONFIG.utcOffset,
            0,
            0
        )
    );
}

/**
 * Calculate the current promotion status
 * and determine the next target date.
 */

function getPromotionState(now = new Date()) {

    const { year, month, day } = getColombiaDate(now);

    const isActive = day === CONFIG.promotionDay;

    let targetDate;

    if (isActive) {

        // Countdown to the end of the promotion.

        targetDate = createPromotionDate(
            year,
            month,
            CONFIG.promotionDay + 1
        );

    } else if (day < CONFIG.promotionDay) {

        // Countdown to this month's promotion.

        targetDate = createPromotionDate(
            year,
            month,
            CONFIG.promotionDay
        );

    } else {

        // Countdown to next month's promotion.

        targetDate = createPromotionDate(
            year,
            month + 1,
            CONFIG.promotionDay
        );
    }

    return {
        isActive,
        targetDate
    };
}

/**
 * Convert milliseconds into countdown units.
 */

function calculateTimeRemaining(milliseconds) {

    const totalSeconds = Math.max(
        0,
        Math.floor(milliseconds / 1000)
    );

    return {
        days: Math.floor(totalSeconds / 86400),

        hours: Math.floor(
            (totalSeconds % 86400) / 3600
        ),

        minutes: Math.floor(
            (totalSeconds % 3600) / 60
        ),

        seconds: totalSeconds % 60
    };
}

/**
 * Format numbers using two digits.
 */

function formatNumber(number) {
    return String(number).padStart(2, "0");
}

/**
 * Update countdown values in the DOM.
 */

function updateCountdownDisplay(time) {

    document.getElementById("days").textContent =
        formatNumber(time.days);

    document.getElementById("hours").textContent =
        formatNumber(time.hours);

    document.getElementById("minutes").textContent =
        formatNumber(time.minutes);

    document.getElementById("seconds").textContent =
        formatNumber(time.seconds);
}

/**
 * Update promotional messages and visual states.
 */

function updatePromotionDisplay(isActive) {

    const card = document.querySelector(".promotion-card");

    const label =
        document.getElementById("promotion-label");

    const title =
        document.getElementById("promotion-title");

    const description =
        document.getElementById("promotion-description");

    const status =
        document.getElementById("promotion-status");

    card.classList.toggle("active", isActive);

    status.classList.toggle("active", isActive);

    if (isActive) {

        label.textContent = "PROMOTION IS LIVE";

        title.textContent = "Your moment is here.";

        description.textContent =
            "Enjoy our exclusive 15% discount today.";

        status.textContent =
            "15% OFF · PROMOTION ACTIVE";

    } else {

        label.textContent = "EXCLUSIVE MONTHLY OFFER";

        title.textContent = "Good things are coming.";

        description.textContent =
            "Enjoy 15% off on the 15th of every month.";

        status.textContent =
            "NEXT PROMOTION · 15% OFF";
    }
}

/**
 * Main countdown controller.
 */

let previousPromotionState = null;

function updateCountdown() {

    const now = new Date();

    const promotion = getPromotionState(now);

    const remaining =
        promotion.targetDate.getTime() - now.getTime();

    const time = calculateTimeRemaining(remaining);

    updateCountdownDisplay(time);

    // Update messages only when the state changes.

    if (previousPromotionState !== promotion.isActive) {

        updatePromotionDisplay(promotion.isActive);

        previousPromotionState = promotion.isActive;
    }
}

/**
 * Initialize the application.
 */

function initializeApp() {

    updateCountdown();

    setInterval(
        updateCountdown,
        CONFIG.updateInterval
    );
}

// Browser initialization.

if (typeof document !== "undefined") {

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializeApp
        );

    } else {

        initializeApp();
    }
}

// Export functions for automated Node.js testing.

if (
    typeof module !== "undefined" &&
    module.exports
) {

    module.exports = {
        CONFIG,
        getColombiaDate,
        createPromotionDate,
        getPromotionState,
        calculateTimeRemaining,
        formatNumber
    };
}
