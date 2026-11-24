
"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");

const {
    getColombiaDate,
    createPromotionDate,
    getPromotionState,
    calculateTimeRemaining,
    formatNumber
} = require("../script.js");

// Test Colombia timezone.

test("Correct Colombia date before midnight", () => {
    const date = new Date("2026-11-15T04:59:59Z");

    assert.deepEqual(getColombiaDate(date), {
        year: 2026,
        month: 10,
        day: 14
    });
});

// Test promotion activation.

test("Promotion is inactive before day 15", () => {
    const state = getPromotionState(
        new Date("2026-11-14T12:00:00Z")
    );

    assert.equal(state.isActive, false);
});

test("Promotion activates at midnight in Colombia", () => {
    const state = getPromotionState(
        new Date("2026-11-15T05:00:00Z")
    );

    assert.equal(state.isActive, true);
});

test("Promotion remains active until end of day", () => {
    const state = getPromotionState(
        new Date("2026-11-16T04:59:59Z")
    );

    assert.equal(state.isActive, true);
});

test("Promotion ends on day 16", () => {
    const state = getPromotionState(
        new Date("2026-11-16T05:00:00Z")
    );

    assert.equal(state.isActive, false);
});

// Test monthly scheduling.

test("Countdown targets current month before day 15", () => {
    const state = getPromotionState(
        new Date("2026-11-10T12:00:00Z")
    );

    assert.equal(
        state.targetDate.toISOString(),
        "2026-11-15T05:00:00.000Z"
    );
});

test("Active promotion targets day 16", () => {
    const state = getPromotionState(
        new Date("2026-11-15T12:00:00Z")
    );

    assert.equal(
        state.targetDate.toISOString(),
        "2026-11-16T05:00:00.000Z"
    );
});

test("Countdown resets to next month", () => {
    const state = getPromotionState(
        new Date("2026-11-20T12:00:00Z")
    );

    assert.equal(
        state.targetDate.toISOString(),
        "2026-12-15T05:00:00.000Z"
    );
});

test("Countdown handles year transition", () => {
    const state = getPromotionState(
        new Date("2026-12-31T12:00:00Z")
    );

    assert.equal(
        state.targetDate.toISOString(),
        "2027-01-15T05:00:00.000Z"
    );
});

// Test date creation.

test("Promotion date uses Colombia UTC offset", () => {
    const date = createPromotionDate(2026, 10, 15);

    assert.equal(
        date.toISOString(),
        "2026-11-15T05:00:00.000Z"
    );
});

// Test countdown calculations.

test("Convert milliseconds to countdown units", () => {
    assert.deepEqual(
        calculateTimeRemaining(90061000),
        {
            days: 1,
            hours: 1,
            minutes: 1,
            seconds: 1
        }
    );
});

test("Prevent negative countdown values", () => {
    assert.deepEqual(
        calculateTimeRemaining(-1000),
        {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    );
});

test("Format single digit numbers", () => {
    assert.equal(formatNumber(5), "05");
});

test("Preserve two digit numbers", () => {
    assert.equal(formatNumber(15), "15");
});
