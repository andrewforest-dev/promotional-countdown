
# Promotional Countdown

[![JavaScript Code Validation](https://github.com/andrewforest-dev/promotional-countdown/actions/workflows/javascript-validation.yml/badge.svg?branch=main)](https://github.com/andrewforest-dev/promotional-countdown/actions/workflows/javascript-validation.yml)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Unit Tests](https://img.shields.io/badge/Unit_Tests-14_Passed-brightgreen)
![Status](https://img.shields.io/badge/Status-Live_Demo-blue)

## Live Demo

[![View Live Demo](https://img.shields.io/badge/View_Live_Demo-D4AF37?style=for-the-badge&logo=googlechrome&logoColor=black)](https://andrewforest-dev.github.io/promotional-countdown/)

https://andrewforest-dev.github.io/promotional-countdown/

## Project Overview

A dynamic promotional countdown web application
built with HTML5, CSS3 and vanilla JavaScript.

The application automates recurring monthly
promotional campaigns through real-time countdowns,
date management and dynamic interface updates.

Inspired by a real e-commerce solution implemented
for Libre Arte Accesorios.

## Business Problem

Recurring promotions require manual updates to
commercial banners, promotional messages and dates.

This application automates the visual presentation
of monthly promotions and improves user experience.

## Features

- Real-time countdown timer.
- Automatic monthly promotion scheduling.
- Promotion activation on the 15th of every month.
- Automatic countdown reset.
- Colombia timezone support (America/Bogota).
- Dynamic promotional messages.
- Responsive interface.
- Reduced motion accessibility support.
- Automated unit testing.
- Continuous integration with GitHub Actions.
- Public deployment through GitHub Pages.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Node.js
- DOM Manipulation
- JavaScript Date API
- Internationalization API
- CSS Grid and Flexbox
- Git and GitHub
- GitHub Actions
- GitHub Pages

## Business Logic

| Period | Application Status |
|---|---|
| Days 1 - 14 | Countdown to current month promotion |
| Day 15 | Promotion active, countdown to expiration |
| Days 16 - 31 | Countdown to next month promotion |

The application uses Colombia's timezone (UTC-5)
for promotional scheduling.

## Project Structure

    promotional-countdown/
    ├── .github/
    │   └── workflows/
    │       └── javascript-validation.yml
    ├── tests/
    │   └── countdown.test.js
    ├── index.html
    ├── style.css
    ├── script.js
    └── README.md

## Local Installation

1. Clone or download the repository.
2. Open the project folder.
3. Open index.html in a modern web browser.

No external libraries or frontend dependencies
are required.

## Automated Testing

The project uses the native Node.js test runner.

Run the tests locally with:

    node --test tests/countdown.test.js

### Test Results

| Environment | Result |
|---|---|
| Node.js 22 | Passed |
| Node.js 24 | Passed |

14 unit tests cover:

- Timezone management.
- Promotion activation and expiration.
- Monthly scheduling.
- Year transitions.
- Countdown calculations.
- Negative value prevention.
- Number formatting.

## Continuous Integration

GitHub Actions automatically validates JavaScript
syntax and executes unit tests on supported
Node.js versions configured in the workflow.

## Development Status

- Core application implemented.
- Public demonstration deployed.
- Automated unit tests passed.
- Continuous integration configured.
- Desktop interface preview verified.
- Mobile and cross-browser testing pending.

This is a frontend demonstration. It does not
modify actual e-commerce product prices.

## Learning Objectives

- JavaScript programming logic.
- Date and timezone management.
- DOM manipulation.
- Responsive web development.
- Software testing.
- Continuous integration.
- Web application deployment.
- Technical documentation.

## Author

Andrés Devia | Andrew Forest

Web Developer | Software Development Student | UX/UI Designer

- Portfolio: https://andrewforest.com
- GitHub: https://github.com/andrewforest-dev
- Agency: https://nexxoagencia.com

